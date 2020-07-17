const {Router} = require("express");
const Cart = require("../model/cart");
const Course = require("../model/course");

const router = Router();


router.get('/', async (req, res) => {
    const cart = await Cart.fetch();
    res.render('cart', {
        cart
    });
});

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body);//After click on button we will get id that course which user want to pay.
    await Cart.add(course);
    res.redirect('/cart');//After adding of course in basket we redirect to card
});

module.exports = router;