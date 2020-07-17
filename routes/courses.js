const { Router } = require("express");
const Course = require("../model/course");


const router = Router();


router.get('/', async (req, res) => {
    const course = await Course.getAll();
    res.render("courses", { title: "Courses", isCourses: true, course });

});

router.get("/:id/edit", async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const course = await Course.getById(req.params.id);

    res.render("courseEdit", {
        title: `${course.title}`,
        course
    });
});


router.post("/edit", async (req, res) => {
    await Course.update(req.body);
    res.redirect('/courses');
});

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id);
    res.render("course", {
        layout: "empty", //which layout  we will push own course.hbs content
        title: `Course ${course.title}`,
        course
    });
});

module.exports = router;