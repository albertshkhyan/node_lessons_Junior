const {Schema, model} = require('mongoose');


const orderSchema = new Schema({
    courses: [
            {
                course: {
                    type: Object,//array of courses
                    required: true
                },
                count: {
                    type: Number,
                    required: true
                }
            }
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Order", orderSchema);
