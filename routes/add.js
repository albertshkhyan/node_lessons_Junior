const { Router } = require("express");
const router = Router();
const Course = require("../model/course");
// console.log('isAuth', isAuth());//Cannot read property 'locals' of undefined
const ensureAuth = require("../middlewares/ensureAuth");
const { courseValidator } = require("../utils/validators");
const { validationResult } = require("express-validator");



router.get('/', ensureAuth, (req, res) => {
    //when click on add link
    res.render("add", { title: "Add Courses", isAdd: true });
});

router.post('/', ensureAuth, courseValidator, async (req, res) => {
    //when add new link
    
    console.log('koko', koko);
    try {
        //#for first we  will check actually valid inputs value or not
        const { title, price, image } = req.body;
        const errorResult = validationResult(req);//extract error object from req object
        if (!errorResult.isEmpty()) {
            return res
                .status(422)
                .render('add', {
                courseError: errorResult.array(),
                isAdd: true,
                data: {
                    title,
                    price,
                    image
                }
            });
        }


        //model of mongoosef
        const course = await new Course({
            //values
            title,
            price,
            image,
            userId: req.user,//Hwo add course ? 
        });
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        //for reject of save
        console.log('err', err);

    }
});

module.exports = router;