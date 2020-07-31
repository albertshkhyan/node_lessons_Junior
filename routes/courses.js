const { Router } = require("express");
const Course = require("../model/course");

const router = Router();
const ensureAuth = require("../middlewares/ensureAuth");


router.post("/remove", ensureAuth, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.body.id);
        res.redirect("/courses");
    }
    catch (err) {
        console.log('err', err);
    }
});

router.get('/', async (req, res) => {
    //can't pass course of find method
    let course = await Course.find();
    //convert to object
    course = course.map(({ title, _id: id, price, image }) => ({ title, id, price, image }));
    res.render("courses", { title: "Courses", isCourses: true, course });
});

router.get("/:id/edit", ensureAuth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    let course = await Course.findById(req.params.id);
    const { title, _id: id, price, image } = course;
    //after space, letter not show in edit page
    course = { title, id, price, image };
    res.render("courseEdit", {
        title: `${course.title}`,
        course
    });
});


router.post("/edit", ensureAuth,  async (req, res) => {
    try {
        const { id } = req.body;
        await Course.findByIdAndUpdate(id, req.body);
        res.redirect('/courses');

    } catch (err) {
        console.log('err', err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        const { title, _id: id, price, image } = course;
        course = { title, _id: id, price, image };
        res.render("course", {
            layout: "empty", //which layout  we will push own course.hbs content
            title: `Course ${course.title}`,
            course
        });
    } catch (err) {
        console.log('err', err);
    }
});

module.exports = router;