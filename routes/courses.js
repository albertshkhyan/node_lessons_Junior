const { Router } = require("express");
const Course = require("../model/course");


const router = Router();


router.get('/', async (req, res) => {
    const course = await Course.getAll();
    res.render("courses", { title: "Courses", isCourses: true, course });

});

router.get("/:id/edit", async (req, res) => {
    // console.log('req,query', req.query);//{ allow: 'true' }
    //If user has allow edit course
    if (!req.query.allow) {
        //return for not to continue the code
        return res.redirect('/');
    }
    const course = await Course.getById(req.params.id);

    res.render("courseEdit", {
        title: `${course.title}`,
        course
    });
});


router.post("/edit", async (req, res) => {
    //req bosy is values of input (have 4 key), id is static, || id is for check, find which object did change
    // console.log('req.body', req.body);
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