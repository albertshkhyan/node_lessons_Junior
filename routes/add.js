const { Router } = require("express");
const router = Router();

const Course = require("../model/course");

router.get('/', (req, res) => {
    res.render("add", { title: "Add Courses", isAdd: true });
});

router.post('/', async (req, res) => {
    /*for fix req.body: we must add middleware which will parse request url to object 
    title=Alik&price=Shkhyan&image=ssd -> { title: 'Alik', price: 'Shkhyan', image: 'ssd' }
    */
    ////after add middleware express.urlencoded
    // req.body//{ title: 'Alik', price: 'Shkhyan', image: 'ssd' }
    const { title, price, image } = req.body;
    const course = await new Course(title, price, image);//create json, if you want to add in DB call save method
    course.save();

    res.redirect('/courses');
    // res.send("koko")
})


module.exports = router;