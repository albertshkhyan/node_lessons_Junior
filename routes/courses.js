const {Router} = require("express");
const Course = require("../model/course");


const router = Router();


router.get('/', async (req, res) => {
    const course = await Course.getAll();    
    console.log('get  course',  course);
    // console.log('typeof course',  course);
    
    res.render("courses", { title: "Courses", isCourses: true, course });

});

module.exports = router;