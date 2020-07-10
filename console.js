//# process global object - The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require(). It can also be explicitly accessed using require(): || Объект процесса является глобальным, который предоставляет информацию о текущем процессе Node.js и контролирует его. Как глобальный, он всегда доступен для приложений Node.js без использования require (). К нему также можно получить явный доступ, используя require ():




//#process.argv - The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched. The first element will be process.execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command line arguments. ||  Свойство process.argv возвращает массив, содержащий аргументы командной строки, переданные при запуске процесса Node.js. * Первым элементом будет process.execPath. Смотрите process.argv0, если необходим доступ к исходному значению argv [0]. Вторым элементом будет путь к исполняемому файлу JavaScript. Остальные элементы будут любыми дополнительными аргументами командной строки.



// console.log('process.argv', process.argv);
/*
    [
    'C:\\Program Files\\nodejs\\node.exe',//where run nodeJS
    'D:\\BACKEND\\NodeJS\\NodeJS-Junior-Lessons\\console.js' - file when run js file
    ]
*/






//$1 give argument
// console.log('process.argv', process.argv);
/*
$ node console.js testArg1
process.argv [
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\BACKEND\\NodeJS\\NodeJS-Junior-Lessons\\console.js',
  'testArg1'
]
*/

//$2 give argument
// console.log('process.argv', process.argv);
/*
 [
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\BACKEND\\NodeJS\\NodeJS-Junior-Lessons\\console.js',
  'name=alik'
]
*/














// Now we will create function which will get  this parametres (with json view).

const consoleToJson = () => {
    let covertToJson = {};

    for (let i = 2; i < process.argv.length; ++i) {
        const keyAndValue = process.argv[i].split("=");
        covertToJson = {
            ...covertToJson,
            [keyAndValue[0]]: keyAndValue[1] ? keyAndValue[1] : true

        }
    }
    return JSON.stringify(covertToJson);
}
console.log('consoleToJson()', consoleToJson());//{"name":"alik"}
