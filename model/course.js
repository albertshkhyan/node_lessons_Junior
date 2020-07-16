const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

class Course {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = uuid.v4();
    }

    toJson() {
        return ({
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        });
    }

    async save() {
        const course = await Course.getAll();//get all content of course.json file
        course.push(this.toJson());//push object -> [ {} ] , in this case will not be json

        return new Promise((res, rej) => {
            //set file in data/course.json
            fs.writeFile(
                path.join(__dirname, "../data", "course.json"),
                JSON.stringify(course),//[{}] -> "[{}]"
                (err) => {
                    if (err) rej(err);
                    else { res() }
                }
            )
        });
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '../data', "course.json"), "utf-8", (err, content) => {
                if (err) rej(err);
                else { res(JSON.parse(content)) }//parsing "[]" for can do push in save
            });
        });
    }

    static async getById(id) {
        const getAll = await Course.getAll();
        return getAll.find((item) => item.id === id);
    }


    static async update(course) {
        const courses = await Course.getAll();

        const indexOFChangedCourse = courses.findIndex(c => c.id === course.id);
        //change only that course (that object) which has changed
        courses[indexOFChangedCourse] = course;

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, "../data", "course.json"),
                JSON.stringify(courses),//[{}] -> "[{}]"
                (err) => {
                    if (err) rej(err);
                    else { res() }
                }
            )
        });


    }
}
module.exports = Course;