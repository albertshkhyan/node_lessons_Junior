var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

const PORT = process.env.PORT || 3000;

//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});
app.use(express.static('public'));
/*
* app.use([path,] callback [, callback...])
    app.use() - Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
    Монтирует указанную функцию промежуточного программного обеспечения или функции по указанному пути: функция промежуточного программного обеспечения выполняется, когда база запрошенного пути совпадает с путем.

* express.static - This is a built-in middleware function in Express. It serves static files and is based on serve-static.

Create a new middleware function to serve files from within a given root directory.

*/

//2 register in express that we have engine
app.engine("hbs", hbs.engine);
//3 set in express our gived cofig engine (with view engined)
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("index", {title : "Home", isHome : true});
});
app.get('/courses', (req, res) => {
    res.render("courses", {title : "Courses", isCourses : true});
});
app.get('/add', (req, res) => {
    res.render("add", {title : "Add Courses", isAdd : true});
});

app.listen(PORT);
