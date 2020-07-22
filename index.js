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


//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});

app.use(express.static(__dirname + '/public'));//Create a new middleware function to serve files from within a given root directory

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

// Database Connection 

(async () => {
    try {
        const url = `mongodb+srv://alik:8Ps8wL2HvHkSzODP@cluster0.mpuj4.mongodb.net/shop?retryWrites=true&w=majority`;
        await mongoose.connect(url, {
            useNewUrlParser: true,//By default, mongoose.connect() will print out the below warning:
            useUnifiedTopology: true,
            useFindAndModify: false
        });//connect on mongoDB
        const PORT = process.env.PORT || 3000;
        app.listen(PORT);
    } catch (err) {
        //if connect call reject
        console.log('err', err);
    }
})();
