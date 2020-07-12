var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

const PORT = process.env.PORT || 3000;

//1 cofig of engine
const hbs = exphbs.create({//return object
    defaultLayout: "main",
    extname: "hbs",
});

//2 register in express that we have engine
app.engine("hbs", hbs.engine);
//3 set in express our gived cofig engine (with view engined)
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/about', (req, res) => {
    res.render("about");
});

app.listen(PORT);
