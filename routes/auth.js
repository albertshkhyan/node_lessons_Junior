const { Router } = require("express");
const User = require('../model/user');
const session = require("express-session");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");//for connect SendGrid API
const keys = require("../keys");

const regMail = require("../emails/registration");
const resetMail = require("../emails/resetMail");
const crypto = require("crypto");

const { validationResult } = require("express-validator");
const { registerValidator, loginValidator } = require("../utils/validators");
// console.log('registerValidator', registerValidator);//validator.js functions


/*
nodemailer {
    createTransport: [Function],
    createTestAccount: [Function],
    getTestMessageUrl: [Function]
  }
  sendgrid [Function]
*/

//create transporter object, for can use sendMail
const transporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: keys.SENDGRID_KEY }
}));//transport argument - as argument pass email delivery service which will have options (object config)
// console.log('transporter', transporter);//return Mail {..., sendMail}


const router = Router();

const bcrypt = require("bcryptjs");
// console.log('bcrypt', bcrypt);


router.get("/login", (req, res) => {
    res.render("auth/login", {
        isLogin: true,//use this key in navbasr.hbs -> this varible transfer on main.hbs
        title: "Login",
        loginError: req.flash('loginError'),
        registerError: req.flash("registerError")
    });
});

//NOTE - 
router.post("/login", loginValidator, async (req, res) => {
    try {
        const errorResult = validationResult(req);//extract error object  from req object
        // console.log(' errorResult.array()',  errorResult.array());
        if (!errorResult.isEmpty()) {
            req.flash("loginError", errorResult.array());
            return res.redirect('login#login');
        }
        // if (candidate) {
        //compare passwords
        // const areSame = await bcrypt.compare(password, candidate.password);//compare enetered password to db password
        // console.log('areSame', areSame);
        // if (areSame) {

        const candidate = await User.findOne({ email: req.body.email });
        // console.log('candidate -----------------------------------', candidate);
        req.session.isAuthenticated = true;
        req.session.user = candidate;
        req.session.save((err) => {//save session in database
            if (err) throw err;
            res.redirect('/');
        });
        // }
        // else {
        //     req.flash("loginError", "Incorrect password");
        //     res.redirect('login#login');
        // }
        // }
    } catch (err) {
        console.log('err', err);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        //remove session collectin in db
        if (err) { throw err };
        res.redirect('login');//if we add / - undersatnd as root
    })
});

// 
router.post("/register", registerValidator, async (req, res) => {
    const errors = validationResult(req);
    // console.log('errors', errors);//Result { formatter: [Function: formatter], errors: [] }
    if (!errors.isEmpty()) {//if have  error
        req.flash('registerError', errors.array());
        return res
            .status(422)
            .redirect("/auth/login#register");
    }

    try {
        const { email, name, password } = req.body;
        //"salt round" - controls how long it takes to compute a single BCrypt hash. Default hash round is 10. -> $2a$10$6dppmOUfbTt1sJeBdsRo5.d0RG2iR/zDQHiEDdeuKozIVXO.Wy0w.
        const hash = await bcrypt.hash(password, 10);//Asynchronously generates a hash for the given string.

        //# now for first we validate input field, then  if not  have  error continue, find  email in validator

        const user = new User({
            name,
            email,
            password: hash,
            cart: { items: [] }
        });
        await user.save();
        res.redirect('login#login');
        await transporter.sendMail(regMail(email))//sendMail(mailOptions)

    } catch (err) {
        console.log('err', err);

    }
});

router.get("/reset", (req, res) => {
    res.render("auth/reset", {
        title: "Forget your password ?",
        error: req.flash("error")
    });
});

router.post("/reset", (req, res) => {
    //#generate token for more protection (custom token)
    crypto.randomBytes(32, async (err, buf) => {
        try {
            const { email } = req.body;
            if (err) {
                res.redirect('/auth/reset');
                return req.flash('error', 'Sory we can\'t generate token, try letter.')
            }
            const token = buf.toString('hex');

            //#find user which want to reset password, and give token
            const candidate = await User.findOne({ email: email });

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000//for example this token willn't valid after on hour -> Date.now() * 60 * 60 * 1000;
                await candidate.save();
                res.redirect('/auth/login');
                await transporter.sendMail(resetMail(email, token));//give token for more protect route, in background mode send mail
            }
            else {
                req.flash("error", "Sorry no such user");
                res.redirect("/auth/reset");
            }

        }
        catch (err) {
            console.log('err', err);
        }
    });
});

router.get("/password/:token", async (req, res) => {
    // For first we must check actouly we have tokne or not 
    // console.log('GET - /password/:token');
    const { token } = req.params;
    if (!token) {
        res.redirect("/auth/login");
    }
    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExp: { $gt: Date.now() }//value of resetTokenExp must be gretter then  Date.now

        });
        // console.log('get("/password/:token" --------- user', user);
        // console.log('user', user);
        if (user) {
            res.render('auth/password', {
                title: "Recover access",
                userID: user._id.toString(),
                token: user.resetToken,
                error: req.flash('error')
            });
        }
        else {
            //if token is expire , we redirect on login page
            // res.redirect('/auth/reset');//❌
            res.redirect('/auth/login');
            req.flash("error", "Sorry, your token expired !");
        }
    } catch (err) {
        console.log('err', err);
    }
});

router.post("/password", async (req, res) => {
    try {
        // console.log('POST - /password');
        const { token, userID, password } = req.body;
        const candidate = await User.findOne({
            resetToken: token,
            resetTokenExp: { $gt: Date.now() },//we must check token expire time when do post request
            _id: userID,
        });
        const hashPassword = await bcrypt.hash(password, 10);

        if (candidate) {
            // candidate.password = password;//invorrect passowrd
            candidate.password = hashPassword;
            candidate.resetToken = undefined;
            candidate.resetTokenExp = undefined;
            await candidate.save();
            res.redirect("/auth/login");
        } else {
            req.flash("error", "Your token is expired !");
            res.redirect("/auth/reset");
        }
    } catch (err) {
        console.log('err', err);
    }

});


module.exports = router;