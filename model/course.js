const { Schema, model } = require("mongoose");


//create model 
/**
 * Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const courseSchema = new Schema({
    //fileds
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

////Adds an instance method to documents constructed from Models compiled from this schema.
/////when will work toClient ???
courseSchema.method("toClient", function () {
console.log("hello toClient function");
    const courseSchema = this.toObject();

    courseSchema.id = courseSchema._id;
    delete courseSchema._id;

    return courseSchema;
});

//with model we provide, for ex: save method
module.exports = model("Course", courseSchema);//schema compile to model -> instance of clas Document






















// const uuid = require("uuid");
// const fs = require("fs");
// const path = require("path");

// class Course {
//     constructor(title, price, image) {
//         this.title = title;
//         this.price = price;
//         this.image = image;
//         this.id = uuid.v4();
//     }

//     toJson() {
//         return ({
//             title: this.title,
//             price: this.price,
//             image: this.image,
//             id: this.id
//         });
//     }

//     async save() {
//         const courseSchema = await Course.getAll();//get all content of courseSchema.json file
//         courseSchema.push(this.toJson());//push object -> [ {} ] , in this case will not be json

//         return new Promise((res, rej) => {
//             //set file in data/courseSchema.json
//             fs.writeFile(
//                 path.join(__dirname, "../data", "courseSchema.json"),
//                 JSON.stringify(courseSchema),//[{}] -> "[{}]"
//                 (err) => {
//                     if (err) rej(err);
//                     else { res() }
//                 }
//             )
//         });
//     }

//     static getAll() {
//         return new Promise((res, rej) => {
//             fs.readFile(path.join(__dirname, '../data', "courseSchema.json"), "utf-8", (err, content) => {
//                 if (err) rej(err);
//                 else { res(JSON.parse(content)) }//parsing "[]" for can do push in save
//             });
//         });
//     }

//     static async getById(id) {
//         const getAll = await Course.getAll();
//         return getAll.find((item) => item.id === id);
//     }


//     static async update(courseSchema) {
//         const courses = await Course.getAll();

//         const indexOFChangedCourse = courses.findIndex(c => c.id === courseSchema.id);
//         //change only that courseSchema (that object) which has changed
//         courses[indexOFChangedCourse] = courseSchema;

//         return new Promise((res, rej) => {
//             fs.writeFile(
//                 path.join(__dirname, "../data", "courseSchema.json"),
//                 JSON.stringify(courses),//[{}] -> "[{}]"
//                 (err) => {
//                     if (err) rej(err);
//                     else { res() }
//                 }
//             )
//         });


//     }
// }
// module.exports = Course;