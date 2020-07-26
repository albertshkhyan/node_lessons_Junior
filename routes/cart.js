const { Router } = require("express");
const Course = require("../model/course");

//Work with cat with User model, because in User implement cart field
const User = require("../model/user");


const router = Router();
////HELPER FUNCTIONS
const mapCartItems = (course) => {
    // console.log('course', course);
    return course.map((c) => {
        // console.log('c.courseId._doc', c.courseId._doc);//identy object show
        // console.log('c.courseId', c.courseId);//identy object show
        // console.log(' c.courseId === c.courseId._doc',  c.courseId === c.courseId._doc);//false

        // console.log('"toJSON" in c', "toJSON" in c);//true
        // console.log('"toJSON" in c.courseId', "toJSON" in c.courseId);//true
        return ({
            // ...c.courseId._doc,  count: c.count//👌 not show metada wiht _doc, but... more correct is toJSON()
            ...c.courseId.toJSON(), count: c.count//✅
            ////Without toJSON or _doc
            // ...c.courseId,  count: c.count//show metadata, return array of map have metadat without _doc or toJSON👎
        })
    });
}
const mapTotalPriceOfItems = (course) => {
    return course.reduce((total, { courseId, count }) => total += courseId.price * count, 0);
}

router.get('/', async (req, res) => {
    try {
        // const cart = await Cart.fetch();//get content of cart.json
        // res.render('cart', {
        //     isCart: true,
        //     courses: cart.courses,
        //     price: cart.price
        // });
        const user = await req.user
            .populate("cart.items.courseId")
            .execPopulate();//without execPopulate can't get content of Course model


        // console.log('mapCartItems ////////////////', mapCartItems(user.cart.items));


        // res.json({
        //     getCart: true
        // })
        //user can be a lot  for this we musth use map

        // console.log('user.cart.items.courseId', user.cart.items.courseId);//no have  metadata
        // console.log('user.cart.items', user.cart.items[0]);//no have  metadata
        // console.log('user.cart.items[0]', user.cart.items[0]);//no have  metadata
        // console.log('user.cart.items[0].courseId', user.cart.items[0].courseId);//no have  metadata

        // console.log('mapCartItems(user.cart.items).courseId', mapCartItems(user.cart.items));

        // console.log('mapTotalPriceOfItems(user.cart.items)', mapTotalPriceOfItems(user.cart.items));//reducer not return array

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
        await req.user.addCourseInCart(course);

        // res.json({ added: true });
        res.redirect('/cart');//After adding of course in basket we redirect to card
    }
    catch (err) {
        console.log('err', err);

    }

});

module.exports = router;