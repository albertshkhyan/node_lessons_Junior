const fs = require("fs");
const path = require("path");


const p = path.join(
    require.main.path,
    "data",
    "cart.json"
);//return path (string)

class Cart {
    static async fetch() {
        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) rej(err);
                else { res(JSON.parse(content)) };
            });
        })
    }

    static async remove(id) {
        console.log('id', id);

        //get data from db (cart)
        const cart = await Cart.fetch();
        // console.log('cart 1', cart);

        //get that object on which we clicked, for check count key
        const idx = cart.courses.findIndex(c => c.id === id);
        const course = cart.courses[idx];


        if (course.count === 1) {
            //if course tyep is only one, we must delete course object
            cart.courses = cart.courses.filter((c) => c.id !== id);
        }
        else {
            //id course count type is several
            // course.count;
            course.count--;
        }

        //write data to file
        return new Promise((res, rej) => {
            fs.writeFile(
                p,
                JSON.stringify(cart),
                (err) => {
                    if (err) rej(err);
                    else res(cart);
                }
            );
        });

    }


    static async add(course) {
        //in here not come only id, in add pass entire object
        //course -> {title: 'Vue', ... id: '1f711f0d-7f81-4e8c-a6a1-9ca8d9cc267f' }

        //get current state of DB
        const cart = await Cart.fetch();//{ courses: [], price: '' }

        // coures from outside caompare in DB courses
        const indx = cart.courses.findIndex((c) => c.id === course.id);
        //if in DB we don't have that course, which user clicked, candidate will be undefined
        const candidate = cart.courses[indx];
        if (candidate) {
            //if already have that course
            //added in cart DB, because candidate and cart.courses[indx] are located same address
            candidate.count++;
        }
        else {
            //if don't have that course
            //before push the course, we must add new key, count : 1 (count of course is 1, first time when user clicked)
            course.count = 1;
            cart.courses.push(course);
        }
        //total price (db price + current price)
        cart.price = +cart.price + +course.price;

        //write data to file
        return new Promise((res, rej) => {
            fs.writeFile(
                p,
                JSON.stringify(cart),
                (err) => {
                    if (err) rej(err);
                    else res();
                }
            );
        });

    }
}
// Cart.add();
module.exports = Cart;