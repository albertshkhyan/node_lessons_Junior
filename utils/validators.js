const { body, validationResult } = require("express-validator");

exports.registerValidator = [
    body("email").isEmail().withMessage("incorrect email"),
    body("name", "Name must be at least three characters").isLength(3),
    body("password", "The password must be at least 3 characters").isLength({min: 3, max: 16}),
    body("repeat").custom((value, { req }) => {
        console.log('custom value', value);
        if (value !== req.body.password) {
            throw new Error("Passowrd don't match, Try")
        }
        return true;//if custom validator retrun false that mean field is invalid
        /**
         * The custom validator may also throw JavaScript exceptions (eg throw new Error()) and return falsy values to indicate the field is invalid.
         */
    })
]

