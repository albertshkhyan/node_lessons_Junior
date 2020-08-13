const { Router } = require("express");

const router = Router();

const ensureAuth = require("../middlewares/ensureAuth");
const User = require("../model/user");


router.get('/', (req, res) => {
    // console.log(' req.user',  req.user.__proto__);//big proto
    // console.log('req.user.toObject()', req.user.toObject().__proto__);//empty proto
    // console.log('req.user PROFILE - GET', req.user);
    res.render('profile', {
        isProfile: true,
        user: req.user.toObject()
    });
});


router.post('/', ensureAuth, async (req, res) => {
    /**
     console.log('req.file------------', req.file);
    {
    fieldname: 'avatar',
    originalname: 'me1.JPG',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'uploads',
    filename: 'avatar-2020-08-13 22-37-01_454-me1.JPG',
    path: 'uploads\\avatar-2020-08-13 22-37-01_454-me1.JPG',
    size: 52044
    }*/

    try {
        const user = await User.findById(req.user._id);//get current user

        const toChange = {
            name: req.body.name,
            avatarUrl: ""
        }
        if (req.file) {
            toChange.avatarUrl = req.file.path;
        }
        Object.assign(user, toChange);
        await user.save();
        res.redirect("/profile");//redirect on profiel do GET request, for give profile page user object

    } catch (err) {
        console.log('err', err);

    }
});

module.exports = router;