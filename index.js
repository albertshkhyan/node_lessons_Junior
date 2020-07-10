/* #Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy which otherwise takes more time using only Node.js
|| Express.js - это инфраструктура веб-приложений для Node.js. Он предоставляет различные функции, которые делают разработку веб-приложений быстрой и простой, что в противном случае занимает больше времени, используя только Node.js.

 - https://www.tutorialsteacher.com/nodejs/expressjs

*/
const express = require('express');
// Creates an Express application. The express() function is a top-level function exported by the express module.

//express like createServer
const PORT = process.env.PORT || 3000;
//process.env.PORT is undefined

const app = express();

app.listen(PORT, () => {
    console.log("Server is running...");
});
