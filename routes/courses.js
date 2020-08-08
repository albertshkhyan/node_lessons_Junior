const { Router } = require("express");
const Course = require("../model/course");

const router = Router();
const ensureAuth = require("../middlewares/ensureAuth");


const isOwner = (req, course) => {
    return req.user._id.toString() === course.userId.toString()
}


router.post("/remove", ensureAuth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id,
            userId: req.user._id

        });
        res.redirect("/courses");
    }
    catch (err) {
        console.log('err', err);
    }
});



router.get('/', async (req, res) => {
    //can't pass course of find method
    let course = await Course.find();
    // console.log('course', course);
    //convert to object
    course = course.map(({ title, _id: id, price, image, userId }) => ({ title, id, price, image, userId: userId.toString() }));

    res.render("courses", { title: "Courses", isCourses: true, course, activeUserID: req.user._id.toString() });
});

router.get("/:id/edit", ensureAuth, async (req, res) => {
    try {
        if (!req.query.allow) {
            return res.redirect('/');
        }
        // console.log('req.params.id', req.params.id);
        let course = await Course.findById(req.params.id);
        if (!isOwner(req, course)) {
            return res.redirect("/");
        }
        const { title, _id: id, price, image } = course;
        //after space, letter not show in edit page
        course = { title, id, price, image };
        res.render("courseEdit", {
            title: `${course.title}`,
            course
        });
    } catch (err) {
        console.log('err', err);

    }
});


router.post("/edit", ensureAuth, async (req, res) => {
    try {
        //remove id from req.body
        //
        const course = await Course.findById({
            _id: req.body.id,
            userId: req.user._id
        });
        //check course owner
        if (!isOwner(req, course)) {
            return res.redirect("/");
        }
        Object.assign(course, req.body);//change  value of course, req.body merge on course
        await course.save();
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