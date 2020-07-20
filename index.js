const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//routers
const homeRouter = require("./routes/home");
const coursesRouter = require("./routes/courses");
const addRouter = require("./routes/add");
const cartRouter = require('./routes/cart');

//mongoose
const mongoose = require("mongoose");
// console.log('mongoose', mongoose);//{...}



//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});
app.use(express.static('public'));
////When do post request req.body is undefined -> 
app.use(express.urlencoded({ extended: true }));//true-> qs lib, parse req body <- working

//2 register in express that we have engine
app.engine("hbs", hbs.engine);
//3 set in express our gived cofig engine (with view engined)
app.set("view engine", "hbs");

// //$3 more readable
app.use('/cart', cartRouter);

app.use("/", homeRouter);
app.use("/courses", coursesRouter);
app
    .use("/add", addRouter)
    .use("/courses", addRouter);


const start = async () => {
    const password = "8Ps8wL2HvHkSzODP";
    const url = `mongodb+srv://alik:${password}@cluster0.mpuj4.mongodb.net/shop?retryWrites=true&w=majority`;

    //connect return promise for this we must wait, first connect mongoose to MongoDB, use await
    //but can work reject, for handle error we will use try catch
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        //check connected or not
        console.log('Mongoose Connecting to MongoDB - ', mongoose.connection.readyState);//1 === connected
        const PORT = process.env.PORT || 3000;
        app.listen(PORT);
    } catch (err) {
        //if connect call reject
        console.log('err', err);
    }

}

start();

//mongodb+srv://alik:<password>@cluster0.mpuj4.mongodb.net/<dbname>?retryWrites=true&w=majority
// const current_ip = "37.252.94.176";

