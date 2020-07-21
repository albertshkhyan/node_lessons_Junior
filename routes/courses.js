const { Router } = require("express");
const Course = require("../model/course");


const router = Router();


router.get('/', async (req, res) => {
    //can't pass course of find method
    let course = await Course.find();
    // console.log('course', course);
    //convert to object
    console.log("get courses /");
    course = course.map(({ title, _id: id, price, image }) => ({ title, id, price, image }));
    // console.log('course', course);
    res.render("courses", { title: "Courses", isCourses: true, course });

});

router.get("/:id/edit", async (req, res) => {
    console.log("get edit courses /:id/edit");

    if (!req.query.allow) {
        return res.redirect('/');
    }
    let course = await Course.findById(req.params.id);
    const { title, _id: id, price, image } = course;
    //after space, letter not show in edit page
    course = { title, id, price, image };
    console.log('title', title);
    res.render("courseEdit", {
        title: `${course.title}`,
        course
    });
});


router.post("/edit", async (req, res) => {
    // console.log("koko 1");
    try {
        const {id} = req.body; 
        console.log('req.body 1', req.body);
        // delete req.body.id;
        console.log('req.body 2', req.body);

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