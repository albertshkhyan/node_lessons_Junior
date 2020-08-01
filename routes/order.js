const { Router } = require('express');
const router = Router();
const Order = require('../model/order');
const order = require('../model/order');
const ensureAuth = require("../middlewares/ensureAuth");

router.get("/", ensureAuth, async (req, res) => {
    try {
        //find that users which id equal id of active user, we must do populate because we have only name of user, we want all data of user (for ex: email)
        //# Find documents by nested ID -> with find
        //$ mongoose auto match req.user._id.toString - convert string then compare
        let orders = await Order.find({ "user.userId": req.user._id }).populate('user.userId');//give condition (filtering), currentUserId === ordersUserId

        orders = orders.map(o => {
            return ({
                ...o.toJSON(),//user,data,courses
                // data: dateFormat(),//❌
                price: o.courses.reduce((totalPrice, c) => {
                    return totalPrice += c.course.price * c.count
                }, 0)
            });
        });
        // console.log('orders.user.userId', orders[0].user.userId);

        res.render("order", {
            isOrder: true,//for navigation menu, active item
            orders,
        });
    } catch (err) {
        console.log('err', err);
    }
});

router.post("/", ensureAuth, async (req, res) => {
    try {
        const user = await req.user.populate("cart.items.courseId").execPopulate();
        const courses = user.cart.items.map(({ courseId, count }) => ({ course: courseId.toJSON(), count }));
        const order = new Order({
            courses,
            user: {
                name: user.name,
                userId: user//mongoose auto put id 
            }
        });
        order.save();
        res.redirect("/orders")
    }
    catch (err) {
        console.log('err', err);
    }


});

module.exports = router;
