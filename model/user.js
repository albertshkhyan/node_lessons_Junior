const { Schema, model } = require("mongoose");

// define Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //Every userSchema have own cart
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
userSchema.methods.addCourseInCart = function (course) {
    //get cart field from userSchema model
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

userSchema.methods.removeItemsFromCart = function (id) {
    let items = [...this.cart.items];

    const userCart = items.find(c => c.courseId.toString() === id.toString());

    if (userCart.count === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    }
    else {
        userCart.count--
    }

    this.cart = { items };
    return this.save();
}

module.exports = model("User", userSchema, 'users');//compile userSchema schema to model, Returns another Model instance.


