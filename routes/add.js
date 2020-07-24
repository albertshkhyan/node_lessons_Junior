const { Router } = require("express");
const router = Router();

const Course = require("../model/course");

router.get('/', (req, res) => {
    res.render("add", { title: "Add Courses", isAdd: true });
});

router.post('/', async (req, res) => {
    try {
        //What we can do after liked the models 
        // console.log('req.user._id', req.user._id);
        // const crs = await Course
        // .findOne()
        // // .populate("userId");//with populate we can access fileds of User, because Course model have reference to User Model -> get all fields
        // ////specify filed -> select concrete field
        // .populate("userId", "name")//{ _id: 5f1adf513e01303678e8ce3c, name: 'Alik' }
        // .select("price");//select from Course model, show only onw specified fileds)

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