const { Router } = require("express");
const Cart = require("../model/cart");
const Course = require("../model/course");

const router = Router();


router.get('/', async (req, res) => {
    const cart = await Cart.fetch();
    res.render('cart', {
        isCart: true,
        courses: cart.courses,
        price: cart.price
    });
});

router.delete("/remove/:id", async (req, res) => {
    const cart = await Cart.remove(req.params.id);
    // console.log('res.json', res.json);//f
    //$1
    // res
    //     .status(200)
    //     .send(cart);
    ////use json method
    //$2
    res
    .status(200)
    .json(cart);
})

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);//After click on button we will get id that course which user want to pay.
    // req.body//{ id: '1f711f0d-7f81-4e8c-a6a1-9ca8d9cc267f' }
    //not need to set await

    // await Cart.add(course); ??? add cart.hbs
    Cart.add(course);
    res.redirect('/cart');//After adding of course in basket we redirect to card
});

module.exports = router;