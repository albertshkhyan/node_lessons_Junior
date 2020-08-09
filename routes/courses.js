const { Router } = require("express");
const Course = require("../model/course");

const router = Router();
const ensureAuth = require("../middlewares/ensureAuth");

// const 

function isOwner(user, course) {
    if (user && course) {
        return user.id.toString() === course.userId.toString();
    }
}

router.post("/remove", ensureAuth, async (req, res) => {
    try {
        //remove - protect routes of course edit
        const course = await Course.findById(req.body.id)
        // console.log('!isOwner(req.user, course)', !isOwner(req.user, course));
        if (!isOwner(req.user, course)) {
            return res.redirect("/");
        }
        console.log("koko");
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
    // console.log('course.userId', course.userId);//undefined
    course = course.map(({ title, _id: id, price, image, userId: userID }) => ({ title, id, price, image, userID: userID.toString() }));

    res.render("courses", {
        course,
        isCourses: true,
        title: "Courses",
        userID: req.user._id.toString(),//current user 
    });
});

router.get("/:id/edit", ensureAuth, async (req, res) => {
    try {
        if (!req.query.allow) {
            return res.redirect('/');
        }

        let course = await Course.findById(req.params.id);
        console.log('course', course);

        //GET - protect routes of course edit
        if (!isOwner(req.user, course)) {
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
        const { id } = req.body;
        const course = await Course.findById(id);
        if(!isOwner(req.user, course)) {
            return res.redirect('/');
        }
        // await Course.findByIdAndUpdate(id, req.body);//for not do additional request on DB, using Object.assign
        Object.assign(course, req.body);
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