const { body } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcryptjs");


exports.registerValidator = [
    //in here we write middleware -> for ex: body validation middleware
    body("email")
        .isEmail()
        .withMessage("incorrect email")
        .custom(async (value) => {
            const candidate = await User.findOne({ email: value });
            if (candidate) {
                // throw new Error("Sorry that email already exist");//work
                return Promise.reject("A user with that email has already registered. Please use a different email");
            }
        })
        .normalizeEmail(),//Sanitaizer -> for ex: JOHNDOW@MAIL.RU -> johndoe@mail.ru
    body("name", "Name must be at least three characters")
        .isLength(3),
    body("password", "The password must be at least 3 characters")
        .isLength({ min: 3, max: 16 })
        .trim(),//Sanitazier - left and right side remove space
    body("repeat")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passowrd don't match, Try")
            }
            return true;//if custom validator retrun false that mean field is invalid
            /**
             * The custom validator may also throw JavaScript exceptions (eg throw new Error()) and return falsy values to indicate the field is invalid.
             */
        })
];


exports.loginValidator = [
    body('email')
        .isEmail()
        .withMessage("incorrect email")
        .custom(async (value) => {
            const candidate = await User.findOne({ email: value });
            if (!candidate) {
                return Promise.reject("No such user exists");
            }
        })
        .normalizeEmail(),
    body('password')
        .custom(async (value, { req }) => {
            const candidate = await User.findOne({ email: req.body.email });
            if (candidate) {
                const areSame = await bcrypt.compare(value, candidate.password);//compare enetered password to db password
                if (!areSame) {
                    return Promise.reject("Incorrect password");
                }
            }
        })

]

