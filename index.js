/* #Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy which otherwise takes more time using only Node.js
|| Express.js - это инфраструктура веб-приложений для Node.js. Он предоставляет различные функции, которые делают разработку веб-приложений быстрой и простой, что в противном случае занимает больше времени, используя только Node.js.

 - https://www.tutorialsteacher.com/nodejs/expressjs

*/
const express = require('express');
/* 
express() - Creates an Express application. The express() function is a top-level function exported by the express module.

app.get() - handle get request on specify route
    app.get("/", (req, res) => {
        req and res have more functionality
    })
*/
const app = express();
const path = require("path");

/////////// static routes
// app.get("/", (req, res) => {

// });//cycling ➰➰ loop - we must close server response
app.get("/", (req, res) => {
    res.send();//like res.end()
});


/////////// dynamic routes (Path params)
//ex : /news/12 or /news/5 etc <- dynamic route  ⚠ not only numbers, ex: /news/:hi -> Path params can be word
// app.get("/news/:id", (req, res) => {
//     // console.log('req.param', req.params);//{ id: '1' }
//     res.send(`ID is - ${req.params.id}`)
// });

////several path params
app.get("/news/:name/:id", (req, res) => {
    console.log('req.param', req.params);//{ name: 'korona', id: '1' }
    res.send(`name is - ${req.params.name} id is - ${req.params.id}`)
});

app.listen(3000);



/****************************** ******************************/

















































/****************************** Show html files in browser  ******************************/
////#sendFile   

// //express like createServer
// const PORT = process.env.PORT || 3000;
// //process.env.PORT is undefined

// // app.get('/', (req, res, next) => {})
// app.get('/', (req, res) => {
//     console.log('req', req);
//     res.sendFile(path.join(__dirname, 'views', "index.html"));//Transfer the file at the given path., Automatically sets the Content-Type response header field.
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', "about.html"));
// });

// app.listen(PORT, () => {
//     console.log("Server is running...");
// });
