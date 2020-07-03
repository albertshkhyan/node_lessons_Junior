// console.log("Hello", module);//module object Module{..., exports: {} }

// const rtrOjb = require("./users");//if not exprt from users, retrun empty object
// console.log('rtrOjb', rtrOjb);//{ name: 'Valod', srname: 'Valodyan' } - ref type

////if type primitive

// const rtrOjb = require("./users");// Hello world - when export primitve value show that primitve (not in object), but if not exprted from a file reuire retrun empty object 
// console.log('rtrOjb', rtrOjb);


////if we want export more files

// const objOfUsers = require("./users");
// console.log('objOfUsers', objOfUsers);


// console.log('require.cache', require.cache);


////global object  in nodeJS

////v1
// const txt = "helo";
// const num = 100;
// const sayHi = () => "hello World!!";
// console.log('this', this);//this {}

////v2
// var txt = "helo"; 
// var num = 100;
// var sayHi = () => "hello World!!";
// console.log('this', this);//this {}

////v3
// const rtrOjb = require("./users");
// console.log('rtrOjb', rtrOjb);
// console.log('this', this);//this {}


////v4
// (() => {
//     console.log(this);//{}not show  global  object because arraow function
// })()

//v5
// (function() {
//     console.log(this);// show gloal object
// })()

















//////////////////////v6
const IP = "6.181.38.149";
module.exports = IP;
console.log('this', this);//{} empty


//////////////////////v7
/*
this in NodeJS global scope is the current module.exports object, not the global object. This is different from a browser where the global scope is the global window object. Consider the following code executed in Node:
*/
// console.log('this', this);//this {}
// module.exports.a = 5;
// console.log('this', this);//this { a: 5 } 😯😯

// console.log('module.exports', module.exports);//module.exports {}


//or
// module.koko = "Gorila";
// console.log('module', module);
// console.log('this', this);//{}  -> only when export  this shoe not empty object
// console.log('global', global);








// console.log('global', global);//global object
// console.log('this', this);//{}


