const { Router } = require("express");
const router = Router();

const Course = require("../model/course");

router.get('/', (req, res) => {
    res.render("add", { title: "Add Courses", isAdd: true });
});

router.post('/', async (req, res) => {
    // console.log('req.body addPost', req.body);

    const { title, price, image } = req.body;
    //csutom model
    // const course = await new Course(title, price, image);//create json, if you want to add in DB call save method

    //model of mongoose
    const course = await new Course({
        //values
        title,
        price,
        image
    });//create json, if you want to add in DB call save method

    try {
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        //for reject of save
        console.log('err', err);
    }

    // res.send("koko")
})


module.exports = router;