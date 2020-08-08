const { body } = require("express-validator");
const User = require("../model/user");

exports.registerValidator = [
    body("email")
        .isEmail()
        .withMessage("incorrect email")
        .custom(async (value) => {
        // console.log('value', value);
        const candidate = await User.findOne({email: value});
        if(candidate) {
            // throw new Error("Sorry that email already exist");//work
            return Promise.reject("A user with that email has already registered. Please use a different email");
        }
    })
    .normalizeEmail(),//Sanitaizer -> for ex: JOHNDOW@MAIL.RU -> johndoe@mail.ru
    body("name", "Name must be at least three characters")
        .isLength(3),
    body("password", "The password must be at least 3 characters")
        .isLength({min: 3, max: 16})
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
]

