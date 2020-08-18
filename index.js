const express = require('express');
const app = express();
const path = require('path');

const keys = require("./keys");


const exphbs = require('express-handlebars');
const csurf = require("csurf");//this lib for protection forms, give one function

//#routers
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cartRoutes = require('./routes/cart');
const orderRoutes = require("./routes/order");
const loginRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const mongoose = require("mongoose");//lib of js ODM allows you to define strongly typed data schemas.
//#midlewares
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const errorMiddleware = require("./middlewares/error");
const fileMiddleware = require("./middlewares/file");
const helmet = require('helmet');
const compression = require('compression');


const varMiddleware = require("./middlewares/variable");
const userMiddleware = require("./middlewares/user");
const flash = require("connect-flash");//With the flash middleware in place, all requests will have a req.flash() function that can be used for flash messages.


//With MongoDBStore class we crete instance that have config of session in db
const sessionStore = new MongoDBStore({
    uri: keys.MONGODB_URI,
    collection: 'sessions'//like table name
});

//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
    helpers: require("./utils/hbs-helpers")
});

app.use(express.static(path.join(__dirname, '/public')));//Create a new middleware function to serve files from within a given root directory

app.use('/uploads', express.static(path.join(__dirname, "uploads")));//this /uploads request will send img tag 


app.use(express.urlencoded({ extended: true }));//true-> qs lib, parse req body <- working

// Use the session middleware, for that, can use session object
app.use(session({
    secret: keys.SESSION_SECRET,// secret parameter allows express-session to use it to encrypt the sessionId
    resave: false,// Bydefault, sesssion save after every request, only save in session when change something, for example add in sesssion.user
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },//expire time is one day
    store: sessionStore
}));
//after session and before csrf we switch file middleware
app.use(fileMiddleware.single("avatar"));//Name of the multipart form field to process. Multer.File` object populated by `single()` middleware. 


app.use(helmet());//switch 11 small middlewares, which add some headers in response, for example protect XSS (cross-site-scripting) atack and etc.

//content security policy, allow all
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "img-src": "*",//Defines valid sources of images.
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "https://cdnjs.cloudflare.com"],//<link />
            scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"]//<script></script>
        }
    })
);

app.use(flash());
app.use(csurf());//protect all forms
app.use(compression(``));//The middleware will attempt to compress response bodies for all request that traverse through the middleware


//custom middleware, in correct place we must switch this middleware
app.use(varMiddleware);
app.use(userMiddleware);//current user (active, online user)


app.engine("hbs", hbs.engine);//2 register in express that we have engine
app.set("view engine", "hbs");//3 set in express our gived cofig engine (with view engined)

// works that route which first match, queue of app.use is important
app.use('/cart', cartRoutes);
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app//work when go add page, and add new course
    .use("/add", addRoutes)//show when enter on add course link, get add page
    .use("/courses", addRoutes);//works when from /add route redirect on /course
app.use("/orders", orderRoutes);
app.use("/auth", loginRoutes);
app.use('/profile', profileRoutes);


//switch 404 error after all routes
app.use(errorMiddleware);

// Database Connection 
(async () => {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,//By default, mongoose.connect() will print out the below warning:
            useUnifiedTopology: true,
            useFindAndModify: false
        });//connect on mongoDB
        const PORT = process.env.PORT || 8080;
        const host = '0.0.0.0';
        // console.log('process.env.PORT', process.env.PORT);
        // app.listen(PORT);
        // console.log('process.env.PORT---', process.env.PORT);
        // app.listen(process.env.PORT || 8080);
        app.listen(PORT, host, (err) => {
            // app.listen(process.env.PORT || 8080, (err) => {
            if (err) {
                throw err;
            }
            console.log("server is listening");
        });
        //if connect call reject
    }
    catch (err) {
        console.log('err', err);
    }
})();
