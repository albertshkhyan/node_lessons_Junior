const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//routers
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cartRoutes = require('./routes/cart');
const orderRoutes = require("./routes/order");
const loginRoutes = require('./routes/auth');



//mongoose
const mongoose = require("mongoose");


//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});

//models
const User = require("./model/user");

//custom midleware - find  own specify id of then put in reqest object that user
app.use(async (req, res, next) => {
    //active users
    try {
        const user = await User.findById("5f1b5dcfe89c8224688e92d3");
        req.user = user;//request through all middlewares, any router can take this user from own request object
        next();
    }
    catch (err) {
        console.log('err', err);
    }
});

app.use(express.static(__dirname + '/public'));//Create a new middleware function to serve files from within a given root directory

app.use(express.urlencoded({ extended: true }));//true-> qs lib, parse req body <- working

//2 register in express that we have engine
app.engine("hbs", hbs.engine);
//3 set in express our gived cofig engine (with view engined)
app.set("view engine", "hbs");


//// works that route which first match, queue of app.use is important
app.use('/cart', cartRoutes);

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);

app//work when go add page, and add new course
    .use("/add", addRoutes)//show when enter on add course link, get add page
    .use("/courses", addRoutes);//works when from /add route redirect on /course
app.use("/orders", orderRoutes);
app.use("/auth", loginRoutes);



// Database Connection 

(async () => {
    try {
        const url = `mongodb+srv://alik:8Ps8wL2HvHkSzODP@cluster0.mpuj4.mongodb.net/shop?retryWrites=true&w=majority`;
        await mongoose.connect(url, {
            useNewUrlParser: true,//By default, mongoose.connect() will print out the below warning:
            useUnifiedTopology: true,
            useFindAndModify: false
        });//connect on mongoDB
        
        //check have in db some user or not, if not have some user we will create user
        const candidate = await User.findOne();
        // console.log('candidate', candidate);
        if (!candidate) {
            const user = new User({
                name: "Alik",
                email: "alikshkhyan@gmail.com",
                cart: {
                    items: []
                }
            });
            await user.save();
        }

        const PORT = process.env.PORT || 8080;
        app.listen(PORT);
    } catch (err) {
        //if connect call reject
        console.log('err', err);
    }
})();
