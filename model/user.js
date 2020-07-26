const { Schema, model } = require("mongoose");

// define Schema
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    //Every user have own cart
    cart: {
        items: [
            //elements of items array must have count key
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Course"
                }
            }
        ]
    }
});

//Because in User Schema we already implement the cart, we willn't create cart model, we just extend functionality of User Schema

// Instance methods - add custom method 
user.methods.addCourseInCart = function (course) {
    //get cart field from user model
    const items = [...this.cart.items];
    const idx = items.findIndex((c) => c.courseId.toString() === course._id.toString());
    if (idx >= 0) {
        items[idx].count += 1
    }
    else {
        items.push({
            count: 1,
            courseId: course._id
        });
    }

    this.cart = { items };

    return this.save();
}

module.exports = model("User", user, 'users');//compile user schema to model, Returns another Model instance.






































/*

const mongoose= require("mongoose");
const { Schema, model } = require("mongoose");

// Database Connection  1
(async () => {
    try {
        const url = `mongodb+srv://alik:8Ps8wL2HvHkSzODP@cluster0.mpuj4.mongodb.net/shop?retryWrites=true&w=majority`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });//connect on mongoDB
        const PORT = process.env.PORT || 3000;
        // app.listen(PORT);
    } catch (err) {
        //if connect call reject
        console.log('err', err);
    }
})();
// define Schema 2
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    //Every user have own cart
    cart: {
        items: [
            //elements of items array must have count key
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ]
    }
});


const User = model("User", user, 'users');//compile user schema to model, Returns another Model instance.//3
// console.log('User', User);

//not show in db
// koko.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   })
const users = new User({//4
    name : "John",
    email : "john@mail.ru",
    items: [{
        count: 3
    }]
});

users.save(function(err,result){ //5
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
})
*/