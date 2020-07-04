//# fs (File System) - The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions. || Manipulation with file system -> ( Модуль fs предоставляет API для взаимодействия с файловой системой в манере, близкой к стандартной функции POSIX. )

const fs = require('fs');//{...utills}
// 
const path = require("path");

/** 
 * What we will do 
    * create folder -> notes
    * create file -> myNotes.txt
    * myNotes.txt <- append data, not replace
 */

/*
All file system operations have synchronous and asynchronous forms.
    # asynchronous form (asynchronous operations).
        * The asynchronous form -  always takes a completion callback as its last argument. 
        The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception (error).  If the operation was completed successfully, then the first argument will be null or undefined. 
        
         Асинхронная форма всегда принимает обратный вызов завершения в качестве последнего аргумента. Аргументы, переданные обратному вызову завершения, зависят от метода, но первый аргумент всегда зарезервирован для исключения. Если операция была успешно завершена, то первый аргумент будет нулевым или неопределенным. 


    # synchronous form (synchronous operations). -> block thread (that mean will work slow)

*/
















/*********************** mkdir - Asynchronously creates a directory. ***********************/
// console.log('path.join - ', path.join(__dirname, "notes"));//D:\BACKEND\NodeJS\NodeJS-Junior-Lessons\refs\notes

// the first argument is always reserved for an exception (error).

// 1 -  first run did work correct
// fs.mkdir(path.join(__dirname, "notes"), (err) => {
//     console.log('err', err);//null
//     if(err) throw err;

//     console.log("Directory is created.")
// });

// 2 -  first run did work correct
// fs.mkdir(path.join(__dirname, "notes"), (err) => {
//     // console.log('err', err);//{errno: -4075, errno: -4075, syscall: 'mkdir', path: 'D:\\BACKEND\\NodeJS\\NodeJS-Junior-Lessons\\refs\\notes'} -> when have error, firs parameter wil be Errro object

//     if(err) throw err;//file already exists

//     console.log("Directory is created.");//not show
// });
















/****************************** writeFile ************************* *****/

/* # The fs.writeFile() method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created: 
|| Asynchronously writes data to a file, replacing the file if it already exists. 
||  Метод fs.writeFile () заменяет указанный файл и содержимое, если оно существует. Если файл не существует, будет создан новый файл, содержащий указанное содержимое:

writeFile (
    path, -> directory in last must be filename. ex: myDir.html
    content ->  The data to write
)
*/

// // 1
// fs.writeFile(path.join(__dirname, "notes", "myNotes.txt"), "in here my content", (err) => {
//     if (err) throw err;

//     console.log("File is created and have content");
// });


// 2 -> Not give error, just if exist do replace ->  not do rename -> myNotes.txt - myNote.txt
// fs.writeFile(path.join(__dirname, "notes", "myNotes.txt"), "in here my content", (err) => {
//     if (err) throw err;

//     console.log("File is created and have content");
// });

















/****************************** appendFile  ******************************/

// # appendFile - Asynchronously append data to a file, creating the file if it does not yet exist.

// const pathToFile = path.join(__dirname, 'notes', "myNotes.txt");
// fs.appendFile( pathToFile, "Hello World", (err) => {
//     if(err) throw err;
//     console.log("If file exist, append in last data");
// } );


// v2 - no file - this code will create noFile_appendFile.js
// EXERCISE : BUG FIX - always show 1
// const pathToFile = path.join(__dirname, 'notes', "noFile_appendFile.js");
// let inc = 1;
// fs.appendFile( pathToFile, `console.log(${inc}); `, (err) => {
//     if(err) throw err;

//     inc = inc + 1;
//     console.log("If file exist, append in last data");
// } );


/****************************** rename (file or folder) ******************************/
/* # Asynchronously rename file at oldPath to the pathname provided as newPath. In the case that newPath already exists, it will be overwritten. If there is a directory at newPath, an error will be raised instead. No arguments other than a possible exception are given to the completion callback. 
|| Асинхронно переименовывает файл в oldPath в путь, указанный как newPath. В случае, если newPath уже существует, он будет перезаписан.   Если в newPath есть каталог, вместо этого будет выдана ошибка. Никакие аргументы, кроме возможного исключения, не передаются для обратного вызова завершения.
*/
//1
// const oldPath = path.join(__dirname, 'notes', "myNotes.txt");
// const newPath = path.join(__dirname, 'notes', "note1.txt");
// fs.rename(oldPath, newPath, err => { //No arguments other than a possible exception are given to the completion callback.
//     if(err) throw err;

//     console.log("Rename is complete!");
// });

//2  - give error -. no such file or directory, because we don't have myNotes.txt
// const oldPath = path.join(__dirname, 'notes', "myNotes.txt");
// const newPath = path.join(__dirname, 'notes', "note1.txt");
// fs.rename(oldPath, newPath, err => { //No arguments other than a possible exception are given to the completion callback.
//     if(err) throw err;

//     console.log("Rename is complete!");
// });










/****************************** unlink  ******************************/

//# Asynchronously removes a file or symbolic link. No arguments other than a possible exception are given to the completion callback.

// cant't remove folder, only file
// fs.unlink( path.join(__dirname, "delWithUnlink.js"), err => {
//     if (err) throw err;
//     console.log("delete delWithUnlink file!");
// });


/****************************** rmdir  ******************************/
//# delete a directory.
// fs.rmdir( path.join(__dirname, "forDeleterDir"), err => {
//     if (err) throw err;
//     console.log("delete forDeleterDir file!");

// });
























/****************************** readFile  ******************************/
/*# Asynchronously reads the entire contents of a file. 
|| The fs.readFile() function buffers the entire file. To minimize memory costs, when possible prefer streaming via fs.createReadStream().
|| Функция fs.readFile () буферизирует весь файл. Чтобы минимизировать затраты памяти, по возможности предпочитайте потоковую передачу через fs.createReadStream ().


Buffer
    В информатике бу́фер, буфера́, бу́феры — это область памяти, используемая для временного хранения данных при вводе или выводе. 




*/
////https://onlineutf8tools.com/convert-bytes-to-utf8
/**
 * Buffer class - The Buffer class is a subclass of the Uint8Array class that is built into the JavaScript language. 
    * Class Method: Buffer.from(arrayBuffer[, byteOffset[, length]])
    * Buffer.from Это создает представление ArrayBuffer без копирования основной памяти. Например, когда передается ссылка на свойство .buffer экземпляра TypedArray, вновь созданный буфер будет использовать ту же выделенную память, что и TypedArray.
 */
{/* <Buffer 2f 2f 23 20 66 73 20 28 46 69 6c 65 20 53 79 73 74 65 6d 29 20 2d 20 54
68 65 20 66 73 20 6d 6f 64 75 6c 65 20 70 72 6f 76 69 64 65 73 20 61 6e 20 41 ... 9488 more bytes> */}

// const readFlPath = path.join(__dirname, "./read_file.txt");

//$1 If no encoding is specified, then the raw buffer is returned. (or should we do it manually), Если кодировка не указана, возвращается необработанный буфер.

// fs.readFile(readFlPath, (err, data) => {
//     if(err) throw err;
//     // console.log("file is readed data - ", data);//<Buffer 2f 2f 23 20 66 73
//     console.log("file is readed data - ", Buffer.from(data).toString());//hi
// });


//$2 -> more elegant way -> If options is a string, then it specifies the encoding: (Если options является строкой, то она указывает кодировку:)
// fs.readFile(readFlPath, "utf-8", (err, data) => {
//     if(err) throw err;
//     // console.log("file is readed data - ", data);//<Buffer 2f 2f 23 20 66 73
//     console.log("file is readed data - ", data);//hi
// });



















/* callback */

////$1
// const dirPath = path.join(__dirname, "notes");
// const pathToFile = path.join(__dirname, 'notes', "myNotes.txt");

// 1 - must have notes directory
// fs.mkdir(dirPath, (err) => {
//     console.log('err', err);//null
//     if (err) throw err;

//     console.log("1 - Directory is created, then...")
// });

// //2 create file
// fs.writeFile(pathToFile, "in here my content", (err) => {
//     if (err) throw err;

//     console.log("2 - File is created, then ...");
// });

// //3 append in creted file
// fs.appendFile(pathToFile, "Hello World ", (err) => {
//     if (err) throw err;
//     console.log("3 - added data in file -> last data");

// });


// fs.unlink(pathToFile, err => {
//     if (err) throw err;
//     console.log("4 - deleted successfully");

// });

/* Work Asynchronous

* 1
    1 - Directory is created, then...
    3 - added data in file -> last data
    2 - File is created, then ...

* 2
    1 - Directory is created, then...
    2 - File is created, then ...
    3 - added data in file -> last data
*/








////$2

// const dirPath = path.join(__dirname, "notes");
// const pathToFile = path.join(__dirname, 'notes', "myNotes.txt");

// //1 crete directory
// fs.mkdir(dirPath, (err) => {
//     console.log('err', err);//null
//     if (err) throw err;

//     console.log("1 - Directory is created, then...")
// });


// //2 create file
// fs.writeFile(pathToFile, "in here my content.", (err) => {
//     if (err) throw err;

//     console.log("2 - File is created, then ...");

//     //3 append in creted file
//     fs.appendFile(pathToFile, "Hello World ", (err) => {
//         if (err) throw err;
//         console.log("3 - added data in file -> last data");
//     });
// });

/*Always -> work like sync
1 - Directory is created, then...
2 - File is created, then ...
3 - added data in file -> last data
*/


