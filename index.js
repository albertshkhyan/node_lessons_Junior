var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 

////$1
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
 
// app.get('/', function (req, res) {
//     // res.render(__dirname + "/views/layouts/main.handlbars", {title : "my title"});//✅ without config extension must be handlebars
//     /*
//     Default search -> views/layouts/main.handlebars:
//     views
//         layouts
//             main.handlebars
//     */
//     res.render(__dirname + "/views/layouts/main.hbs", {title : "my title"});//cannot find module hbs❌
// });
 
// app.listen(3000);




















////$2
/*
Default search the template file (myFIle.handlebars)  in views folder  , when not find take in layouts folder main.handlebars.
|| default search own given path
.
├── app.js
└── views
    ├── home.handlebars
    └── layouts
        └── main.handlebars
*/
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
 
// app.get('/', function (req, res) {

//     // res.render(__dirname + "/views/home.handlebars", {title : "in home"});//👍
//     // res.render("main", {title : "in home"});//❌
//     // res.render(__dirname + "/views/layouts/myLayout.handlebars", {title : "in myLayout"});//👍
//     // res.render(__dirname + "/views/layouts/", {title : "in myLayout"});//❌
// });
 
// app.listen(3000);























////$3 With config

/*
├── app.js
└── views
    └── layouts
        └── main.hbs
    └── index.hbs

 * Another way to use this view engine is to create an instance(s) of ExpressHandlebars, allowing access to the full API:
        hbs = exphbs.create( { config }  ;
*/

//config
// const hbs = exphbs.create({
//     // defaultLayout: 'main', 
//     extname : "hbs",    
// })
// console.log('hbs', hbs);
// /*
// interface ExphbsOptions {
//     handlebars?: any;
//     extname?: string;
//     layoutsDir?: string;
//     partialsDir?: any;
//     defaultLayout?: string;
//     helpers?: any;
//     compilerOptions?: any;
// }
// */

// // // console.log('hbs.engine', hbs.engine);//[Function: bound renderView] AsyncFunction
// // // console.log('app.engine', app.engine);/[Function: engine]

// // Register `hbs.engine` with the Express app.
// // console.log('app.engine()', app.engine('handlebars', (path, option) => { ////engines: { '.handlebars': [Function] } }));

// app.engine("hbs", hbs.engine);//register that we  have engine and give some options || register as engine for rendering pages
// // app.engine('.hbs', exphbs({extname: '.hbs'}));

// app.set('view engine', "hbs");//setting (install) handlebars
// // app.get("view engine");
// // console.log('app.get("view engine")', app.get("view engine"));/hbs - give extesnion of engine

// app.get("/", (req, res) => {
//     ////render - Render the given view name name with options and a callback accepting an error and the rendered template string.
//     res.render("index", {email : "Tobi"});//not need write all path when give config
// });

// app.listen(3000);



































////$4 With config


const PORT = process.env.PORT || 3000;

//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout : "main",
    extname : "hbs"
});

//2 register in express that we have engine
app.engine("hbs", hbs.engine);
//3 set in express our gived cofig engine (with view engined)
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/about', (req, res) => {
    //4
    res.render("about");
});

app.listen(PORT);

