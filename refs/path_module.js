//# The Path module provides a way of working with directories and file paths.
const pathObj = require("path");
const { dirname } = require("path");
// console.log('pathObj', pathObj);//{utills}


/*************************** basename method ***************************/

//# the path.basename() methods returns the last portion of a path

// let bsn = pathObj.basename("/a/b/c/d");//d
// bsn =  pathObj.basename("asd/fgh/hjk/");//hjk
// // console.log('__dirname', __dirname);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs
// bsn =  pathObj.basename(__dirname);//refs
// bsn =  pathObj.basename(__filename);//path_module.js
// console.log('bsn - ', bsn);


/*************************** dirname method ***************************/
//# The directory name of the current module. 

//⚠ dirname method - all directory name -> https://www.google.com/search?q=all+directory+name&tbm=isch&ved=2ahUKEwie1pSUvbHqAhUU-4UKHcmqCaYQ2-cCegQIABAA&oq=all+directory+name&gs_lcp=CgNpbWcQAzoGCAAQBxAeOggIABAHEAUQHjoICAAQCBAHEB5QyQ1Ykhtg1x9oAHAAeACAAYECiAHPDZIBBTAuNy4ymAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img&ei=cVn_Xt7ZApT2lwTJ1aawCg&bih=667&biw=1349&rlz=1C1GCEA_enAM854AM854&hl=ru#imgrc=KQk8tC6-YqBYoM

let drn = pathObj.dirname("/a/b/c/d");// a/b/c
// drn = pathObj.dirname("/a/b/c/d/");// a/b/c last seperator ingored

// console.log('__dirname', __dirname);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs
// drn = pathObj.dirname(__dirname);//   D:\BACKEND\NodeJS\NodeJS-Junior-Lessons

// console.log('__filename', __filename);// D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs\path_module.js
// drn = pathObj.dirname(__filename);//  D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs 
// console.log('drn - ', drn);

// //This is the same as the path.dirname() of the __filename.
// console.log(__dirname);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs
// // Prints: /Users/mjr
// console.log(pathObj.dirname(__filename) === __dirname);//true
// // Prints: /Users/mjr


/*************************** extname method ***************************/

// let extn = pathObj.extname("index.html");//.html
// extn = pathObj.extname("a/c/dindex.html");//.html
// extn = pathObj.extname("index.coffee.md");//.md
// extn = pathObj.extname(__filename);//.js
// console.log('extn - ', extn);


/*************************** parse method ***************************/

//# The path.parse() method returns an object whose properties represent significant (imortant) elements of the path. 

// let prsObj =  pathObj.parse('/a/b/c/d/test.js');
// // console.log('prsObj', prsObj);
// /*
// {
//   root: '/',
//   dir: '/a/b/c/d',
//   base: 'test.js',
//   ext: '.js',
//   name: 'test'
// }
// */
// prsObj =  pathObj.parse('a/b/c/d/test.js');//{ root: '', dir: 'a/b/c/d', base: 'test.js', ext: '.js', name: 'test' }
// pathObj.parse(__dirname);//{ root: '', dir: 'a/b/c/d', base: 'test.js', ext: '.js', name: 'test' }
// pathObj.parse(__filename);//{ root: '', dir: 'a/b/c/d', base: 'test.js', ext: '.js', name: 'test' }
// console.log('prsObj', prsObj);



/*************************** join method ***************************/

//# The path.join() method joins all given path segments together using the platform-specific separator as a delimiter

//⚠ մաիյն առաջին seperator -ն (slash) է հաշվի առնվում

// let jn = pathObj.join("a","b",'c','d');// a\b\c\d
// jn = pathObj.join("/a","/b",'/c','/d');// \a\b\c\d
// jn = pathObj.join("///a","////b",'c','////d');// \a\b\c\d -> normolize too

// jn = pathObj.join('a', 'b', 'c', '..', 'd');// a\b\d
// console.log('jn', jn);


/*************************** resolve method ***************************/
//#The path.resolve() method resolves a sequence of paths or path segments into an absolute path. (Метод path.resolve () разрешает последовательность путей или сегментов пути в абсолютный путь.)



/*
⚠ resolve like join, because can stick together, but return absolute path

⚠ when first put /, first slash wiil be rootб without slash mean wiil be continue
* with slahs - you define root folder
* without slahs - system define root folder
    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
    // If the current working directory is /home/myself/node,
    // this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
*/


let rsl = pathObj.resolve("a","b",'c','d');// D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\a\b\c\d

rsl = pathObj.resolve();// D:\BACKEND\NodeJS\NodeJS-Junior-Lessons
// console.log(pathObj.resolve() === pathObj.dirname(__dirname));//???
console.log(pathObj.resolve() === pathObj.join(__dirname, '..'));//???



rsl = pathObj.resolve("/bar/bae', '/foo', 'test");// D:\bar\bae', '\foo', 'test
rsl = pathObj.resolve("bar/bae', '/foo', 'test");// D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\bar\bae', '\foo', 'test

// console.log('__filename', __filename);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs\path_module.js
rsl = pathObj.resolve(__filename);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs\path_module.js

// console.log('__dirname', __dirname);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs
rsl = pathObj.resolve(__dirname);//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs

rsl = pathObj.resolve(__dirname, "test");//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs\test

console.log('rsl - ', rsl);