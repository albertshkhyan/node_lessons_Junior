const { Router } = require('express');
const router = Router();
const Order = require('../model/order');
const order = require('../model/order');
// console.log('Order', Order);//Model { Order }

router.get("/", async (req, res) => {
    try {
        //find that users which id equal id of active user, we must do populate because we have only name of user, we want all data of user (for ex: email)
        //# Find documents by nested ID -> with find
        //$ mongoose auto match req.user._id.toString - convert string then compare
        let orders = await Order.find({ "user.userId": req.user._id }).populate('user.userId');//give condition (filtering), currentUserId === ordersUserId
        // console.log('orders', orders);
        // console.log(orders[0].courses.__proto__);//without populate 👌
        // console.log( orders[0].user.userId.__proto__);//😨😨 againt info about db, after populate always must transform data to object

        orders = orders.map(o => {
            // console.log('o.courses.__proto__', o.courses.__proto__);
            // console.log('o.courses', o.courses);
            // console.log('o.__proto__', o.__proto__);//😨🔫 must fix wiht _doc or toJSON()
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

router.post("/", async (req, res) => {
    //in users collection we have cart which contain our order courses -> get -> cart: { items: [ [Object], [Object] ] },
    try {
        const user = await req.user.populate("cart.items.courseId").execPopulate();

        //transform cart array of course to readable format , why we must transfrom
        // console.log('user.__proto__', user.__proto__);// 😨  for this we must transform, we willn't give client info about database
        const courses = user.cart.items.map(({ courseId, count }) => ({ course: courseId.toJSON(), count }));
        // console.log('courses', courses);
        // console.log('user.__proto__', user.__proto__);//👌

        /**
         * 
         * every course (c) {
            count: 1,//every course must  have count
            _id: 5f1f31f6b14a4f21284327ef,
            courseId: {
                _id: 5f1aed4394be660cc8a6af42,
                title: 'Angular ',
                price: '400000',
                image: 'https://angular.io/assets/images/logos/angular/angular.png',
                userId: 5f1adf513e01303678e8ce3c,
                __v: 0
            }
            }
         * user {
            cart: { items: [ [Object], [Object] ] },
            _id: 5f1b5dcfe89c8224688e92d3,
            name: 'Alik',
            email: 'alikshkhyan@gmail.com',
            __v: 0
            }
         * eq.user.cart.items[0]{
            _id: 5f1aed8a69d1423ab85d98ce,
            title: 'Vue',
            price: '450000',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png',
            userId: 5f1adf513e01303678e8ce3c,
            __v: 0
            }
         
        * courses [
            {
                course: {
                _id: 5f1aed8a69d1423ab85d98ce,
                title: 'Vue',
                price: '450000',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png',
                userId: 5f1adf513e01303678e8ce3c,
                __v: 0
                }
            },
            */

        ////now array of course orders add in order collection

        const order = new Order({
            courses,//array of orders
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
