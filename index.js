const express = require("express");

const app = express();//instance of Express class


/*
Routing (Маршрутизация)
Routing determines how an application responds to a client request to a specific address (URI).
|| Маршрутизация определяет, как приложение отвечает на клиентский запрос к конкретному адресу (URI).
*/

/* -------------------------------------------------------------------------- */
/*                                send and end                                */
/* -------------------------------------------------------------------------- */

// app.get("/", (req, res) => {
//     console.log("Hello World");
//     ////Sending a response of various types.
//     // res.send({ some: 'json' });//Content-Type: application/json; charset=utf-8 ...
//     // res.send("hi");//
//     // res.end({ some: 'json' });//Error: chunk argument must be string ...
// });


// app.listen(3000);





















/* -------------------------------------------------------------------------- */
/*                               Route methods                                */
/* -------------------------------------------------------------------------- */
/*
HTTP: get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search и connect.
*/
// // GET method route
// app.get('/', function (req, res) {
//     res.send('<h1>GET request to the homepage</h1>');
//   });

//   // POST method route
//   app.post('/', function (req, res) {
//     res.send('<h2>POST request to the homepage</h2>');
//   });


////chaining 
// app
//     .get('/', function (req, res) {
//         res.send('<h1>GET request to the homepage</h1>');
//     })
//     .post('/', function (req, res) {
//         res.send('<h2>POST request to the homepage</h2>');
//     });


// app.listen(3000);












/* -------------------------------------------------------------------------- */
/*                               Path of Routes                               */
/* -------------------------------------------------------------------------- */

// app.get('/', function (req, res) {
//     res.send('Root route');
// })
// app.get('/ab?cd', function (req, res) {//http://localhost:3000/acd || http://localhost:3000/abcd ??
//     res.send('ab?cd');
// })

// app.get('/random.text', function (req, res) {
//     res.send('random.text');
// });

// app.get('/ab+cd', function(req, res) {//http://localhost:3000/abbcd || http://localhost:3000/abbbcd ???
//     res.send('ab+cd');
//   });

// app.get('/ab*cd', function(req, res) {//http://localhost:3000/abhasdkjfkjsdhakfhsdkhijkcd - ab ... cd
// res.send('ab*cd');
// });

// app.get('/ab(cd)?e', function (req, res) {//????
//     res.send('ab(cd)?e');
// });
/**
 * http://localhost:3000/abe -> work
 * http://localhost:3000/abcde -> work
 * http://localhost:3000/abee -> not work
 */


// app.get(/a/, function(req, res) {//This route path matches any element with “a” in the route name.
//     res.send('/a/');
//   });

// app.get(/.*fly$/, function(req, res) {//last three letter must end by "fly"
//     res.send('/.*fly$/');
//   });
/**
 * http://localhost:3000/butterfly -> work
 * http://localhost:3000/butterfly -> work
 * http://localhost:3000/fly -> work
 * http://localhost:3000/fl -> not work
 */

// app.listen(3000);























/* -------------------------------------------------------------------------- */
/*                               Route handlers                               */
/* -------------------------------------------------------------------------- */
// app.get("/", (req, res) => {
//     debugger
//     res.send('Hello World');
// });
// app.get("/example/a", (req, res) => {
//     res.send('Hello from A!');
// });
// app.get("/example/b", (req, res) => {
//     res.send('Hello from B!');
// });
// app.listen(3000);

/*
* Для обработки запроса можно указать несколько функций обратного вызова, подобных middleware. Единственным исключением является то, что эти обратные вызовы могут инициировать next('route') для обхода остальных обратных вызовов маршрута. С помощью этого механизма можно включить в маршрут предварительные условия, а затем передать управление последующим маршрутам, если продолжать работу с текущим маршрутом не нужно.

Обработчики маршрутов могут принимать форму функции, массива функций или их сочетания, как показано в примерах ниже.
*/
//// One route can be handled by several callback functions (be sure to specify the next object).
////$1
// app.get("/", (req, res) => {
//     res.send('Hello World');
// });
// app.get("/example/a", (req, res, next) => {
//     console.log('the response will be sent by the next function ...');
//     next();//without next function infinity loop
//     // res.end('Hello from A1!');//this is not show
// }, (req, res) => {
//     res.end('Hello from A2!');
// });

// app.listen(3000);



////$2 - Find Error
const cb0 = (req, res, next) => {
    debugger
    console.log('CB0');
    next();
}

const cb1 = (req, res, next) => {
    debugger
    console.log('CB1');
    next();
}

const cb2 = (req, res) => {
    debugger
    console.log('CB2');
    next();
}

app.get('/example/c', [cb0, cb1, cb2], (req, res, next) => {//error
    debugger
    res.send('Hello from C!');
});

app.listen(3000);

////work
// console.log(1);
// const cb0 = function (req, res, next) {
//     debugger
//     console.log('CB0');
//     next();
// }

// const cb1 = function (req, res, next) {
//     debugger
//     console.log('CB1');
//     next();
// }
// const cb2 = function (req, res, next) {
//     debugger
//     console.log('CB2');
//     next();
// }
// const cb3 = function (req, res, next) {
//     debugger
//     console.log('CB3');
//     next();
// }

// // app.get('/example/d', [cb0, cb1, cb2, cb3], function (req, res, next) {
// //     console.log('the response will be sent by the next function ...');
// //     next();
// // }, function (req, res) {
// //     res.send('Hello from D!');
// // });
// ////or
// app.get('/example/d', [cb0, cb1, cb2, cb3], function (req, res, next) {
//     debugger
//     console.log('the response will be sent by the next function ...');
//     res.send('Hello from D!');
// });

// app.listen(3000);













/*

Why 3000 port not work

Emitted 'error' event on Server instance at:
    at emitErrorNT (net.js:1340:8)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  code: 'EADDRINUSE',
  errno: 'EADDRINUSE',
  syscall: 'listen',
  address: '::',
  port: 3000
}
*/