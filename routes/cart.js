const { Router } = require("express");
const Course = require("../model/course");

//Work with cat with User model, because in User implement cart field
const User = require("../model/user");


const router = Router();


router.get('/', async (req, res) => {
    // const cart = await Cart.fetch();
    // res.render('cart', {
    //     isCart: true,
    //     courses: cart.courses,
    //     price: cart.price
    // });
    res.json({
        getCart: true
    })
});

router.delete("/remove/:id", async (req, res) => {
    // const cart = await Cart.remove(req.params.id);
    res
    .status(200)
    .json(cart);
});

router.post('/add', async (req, res) => {
    try {
        const course = await Course.findById(req.body.id);
        // const user = new User();
        // await user.addCourseInCart(course);
        ////or
        console.log('req.user', req.user);
        await req.user.addCourseInCart(course);

        res.json({added: true});
        // res.redirect('/cart');//After adding of course in basket we redirect to card
    }
    catch (err) {
        console.log('err', err);

    }

}); 

module.exports = router;