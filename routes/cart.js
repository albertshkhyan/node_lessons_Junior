const { Router } = require("express");
const Course = require("../model/course");

//Work with cat with User model, because in User implement cart field
const User = require("../model/user");


const router = Router();
////HELPER FUNCTIONS
const mapCartItems = (course) => {
    return course.map((c) => {
        return ({
            // ...c.courseId._doc,  count: c.count//not recomented
            ...c.courseId.toJSON(),
            id: c.courseId.id,//mongoose auto understand _id
            count: c.count
        })
    });
}
const mapTotalPriceOfItems = (course) => {
    return course.reduce((total, { courseId, count }) => total += courseId.price * count, 0);
}

router.get('/', async (req, res) => {
    try {
        const user = await req.user
            .populate("cart.items.courseId")
            .execPopulate();//without execPopulate can't get content of Course model
            
            // console.log('mapCartItems(user.cart.items)', mapCartItems(user.cart.items));
        res.render("cart", {
            title: "Cart",
            isCart: true,
            courses: mapCartItems(user.cart.items),
            price: mapTotalPriceOfItems(user.cart.items)
        })
    } catch (err) {
        console.log('err', err);

    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        const user = await req.user.removeItemsFromCart(req.params.id);
        const getCoursesByid = await req.user.populate('cart.items.courseId').execPopulate();
        
        const cart = {
            courses: mapCartItems(getCoursesByid.cart.items),
            price: mapTotalPriceOfItems(getCoursesByid.cart.items)
        }
        res
            .status(200)
            .json(cart);
    } catch (err) {
        console.log('err', err);
    }
});

router.post('/add', async (req, res) => {
    try {
        const course = await Course.findById(req.body.id);
        await req.user.addCourseInCart(course);
        // res.json({ added: true });
        res.redirect('/cart');//After adding of course in basket we redirect to card
    }
    catch (err) {
        console.log('err', err);
    }

});

module.exports = router;