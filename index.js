const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//routers
const homeRouter = require("./routes/home");
const coursesRouter = require("./routes/courses");
const addRouter = require("./routes/add");
const cartRouter = require('./routes/cart');


const PORT = process.env.PORT || 3000;

//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});
app.use(express.static('public'));

////When do post request req.body is undefined -> 
app.use(express.urlencoded({extended : true }));//true-> qs lib, parse req body <- working

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

    
app.listen(PORT);
const password = "1InRnaA5swLvRluc";
// const current_ip = "37.252.94.176";
const url = `mongodb+srv://alik:${password}@cluster0.yvm9m.mongodb.net/<dbname>?retryWrites=true&w=majority`;
