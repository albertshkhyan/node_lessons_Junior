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

//not core packages
const mongoose = require("mongoose");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const varMiddleware = require("./middlewares/variable");
const userMiddleware = require("./middlewares/user");


//With MongoDBStore class we crete instance that have config of session in db
const MONGODB_URI = `mongodb+srv://alik:8Ps8wL2HvHkSzODP@cluster0.mpuj4.mongodb.net/shop?retryWrites=true&w=majority`;
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'//like table name
});

//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});

//models
const User = require("./model/user");


app.use(express.static(__dirname + '/public'));//Create a new middleware function to serve files from within a given root directory

app.use(express.urlencoded({ extended: true }));//true-> qs lib, parse req body <- working

// Use the session middleware, for that, can use session object
app.use(session({
    secret: 'top secret!',//This is a required option for the secret to sign the session ID cookie. It can be a string or an array of multiple string secrets.
    resave: false,//-  resave: this may have to be enabled for session stores that don't support the "touch" command. 
    saveUninitialized: false,//- when saveUninitialized is false, the (still empty, because unmodified) session object will not be stored in the session store. 
    store
}));

//custom middleware, in correct place we must switch this middleware
app.use(varMiddleware);
app.use(userMiddleware);//NOTE -  app.use automatic call inner function and give 3 arguments req, res, next



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
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,//By default, mongoose.connect() will print out the below warning:
            useUnifiedTopology: true,
            useFindAndModify: false
        });//connect on mongoDB

        //Temporary create some user
        // const candidate = await User.findOne();
        // if (!candidate) {
        //     const user = new User({
        //         name: "Alik",
        //         email: "alikshkhyan@gmail.com",
        //         cart: {
        //             items: []
        //         }
        //     });
        //     await user.save();
        // }

        const PORT = process.env.PORT || 8080;
        app.listen(PORT);
    } catch (err) {
        //if connect call reject
        console.log('err', err);
    }
})();
