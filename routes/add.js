const { Router } = require("express");
const router = Router();
const Course = require("../model/course");
// console.log('isAuth', isAuth());//Cannot read property 'locals' of undefined
const ensureAuth = require("../middlewares/ensureAuth");

router.get('/', ensureAuth, (req, res) => {
    //when click on add link
    res.render("add", { title: "Add Courses", isAdd: true });
});

router.post('/', ensureAuth, async (req, res) => {
    //when add new link
    try {
        const { title, price, image } = req.body;
        //model of mongoose
        const course = await new Course({
            //values
            title,
            price,
            image,
            //when we add course we also must add id of user which add that course
            userId: req.user//mongoose auto set req.user.id, because we specifiy in model type of userId field
        });
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        //for reject of save
        console.log('err', err);

    }
});

module.exports = router;