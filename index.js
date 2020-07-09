/** Create Web-Server (HTTP server)
 */


const http = require("http");
// console.log('http', http);
/*
{
  Agent: [Function: Agent] { defaultMaxSockets: Infinity },
  ClientRequest: [Function: ClientRequest],
  IncomingMessage: [Function: IncomingMessage],
  OutgoingMessage: [Function: OutgoingMessage],

  Server: [Function: Server],// 🙋‍♀️ 

  ServerResponse: [Function: ServerResponse],

  createServer: [Function: createServer],//-> 🆕 Returns a new instance of http.Server.

  get: [Function: get],
  request: [Function: request],
  maxHeaderSize: [Getter],
  globalAgent: [Getter/Setter]
}

*/










// console.log('http.Server', http.Server);
// console.log('new http.Server', new http.Server());
/*
new http.Server Server {
  insecureHTTPParser: undefined,
  _events: [Object: null prototype] {
    connection: [Function: connectionListener]
  },
  _eventsCount: 1,
  _maxListeners: undefined,
  _connections: 0,
  _handle: null,
  _usingWorkers: false,
  _workers: [],
  _unref: false,
  allowHalfOpen: true,
  pauseOnConnect: false,
  httpAllowHalfOpen: false,
  timeout: 120000,
  keepAliveTimeout: 5000,
  maxHeadersCount: null,
  headersTimeout: 60000,
  [Symbol(IncomingMessage)]: [Function: IncomingMessage],
  [Symbol(ServerResponse)]: [Function: ServerResponse],
  [Symbol(kCapture)]: false,
  [Symbol(asyncId)]: -1
}
*/



/**
 * http.createServer([options][, requestListener]) - 
 * ⚠ createServer - Returns a new instance of http.Server.
 * ⚠ With createServer, we create web server.
 */
// const  server = http.createServer();
// console.log('server', server);
/*
return Server object - instance of http.Server ( new  http.Server() )
⚠ server object  - ը ժառանգումա EventEmmiter կլասսից և ունի բոլոր հնարավարությունները ինչը , որ ունի EventEmitter - ը։
Server {
  insecureHTTPParser: undefined,
  _events: [Object: null prototype] {
    connection: [Function: connectionListener]
  },
  _eventsCount: 1,
  _maxListeners: undefined,
  _connections: 0,
  _handle: null,
  _usingWorkers: false,
  _workers: [],
  _unref: false,
  allowHalfOpen: true,
  pauseOnConnect: false,
  httpAllowHalfOpen: false,
  timeout: 120000,
  keepAliveTimeout: 5000,
  maxHeadersCount: null,
  headersTimeout: 60000,
  [Symbol(IncomingMessage)]: [Function: IncomingMessage],
  [Symbol(ServerResponse)]: [Function: ServerResponse],
  [Symbol(kCapture)]: false,
  [Symbol(asyncId)]: -1
}
*/













/******************* */

/**
 server.listen() - 
||on which port server must listen
|| Starts the HTTP server listening for connections. This method is identical to server.listen() from net.Server.
||Запускает HTTP-сервер, прослушивающий соединения. Этот метод идентичен server.listen () из net.Serv

 *  
 */

//nothing happen
// const  server = http.createServer();
// server.listen(3000);




















/******************* */
// Event: 'connection' - This event is emitted when a new TCP stream is established. - Այս  իրադարձությունը emit է լինում, երբ ստեղծվում է TCP հոսք։

/**
 * TCP (Transmission Control Protocol) - один из основных протоколов передачи данных интернета, надежная доставка данных 
 */



// const  server = http.createServer();

// server.on("connection", (socket) => {
//     console.log('socket', socket);
//     console.log("New connection!!!");

// })
// /**
//  *Socket is a object
// Socket {
//   connecting: false,
//   _hadError: false,
//   _parent: null,
//   _host: null,
//   _readableState: ReadableState {
//     objectMode: false,
//     highWaterMark: 16384,
//     buffer: BufferList { head: null, tail: null, length: 0 },
//     length: 0,
//     pipes: null,
//     pipesCount: 0,
//     flowing: true,
//     ended: false,
//     endEmitted: false,
//     reading: true,
//     sync: false,
//     needReadable: true,
//     emittedReadable: false,
//     readableListening: false,
//     resumeScheduled: true,
//     emitClose: false,
//     autoDestroy: false,
//     destroyed: false,
//     defaultEncoding: 'utf8',
//     awaitDrainWriters: null,
//     multiAwaitDrain: false,
//     readingMore: false,
//     decoder: null,
//     encoding: null,
//     [Symbol(kPaused)]: false
//   },
//   readable: true,
//   _events: [Object: null prototype] {
//     end: [ [Function: onReadableStreamEnd], [Function: bound socketOnEnd] ],
//     timeout: [Function: socketOnTimeout],
//     data: [Function: bound socketOnData],
//     error: [Function: socketOnError],
//     close: [Function: bound socketOnClose],
//     drain: [Function: bound socketOnDrain],
//     resume: [Function: onSocketResume],
//     pause: [Function: onSocketPause]
//   },
//   _eventsCount: 8,
//   _maxListeners: undefined,
//   _writableState: WritableState {
//     objectMode: false,
//     highWaterMark: 16384,
//     finalCalled: false,
//     needDrain: false,
//     ending: false,
//     ended: false,
//     finished: false,
//     destroyed: false,
//     decodeStrings: false,
//     defaultEncoding: 'utf8',
//     length: 0,
//     writing: false,
//     corked: 0,
//     sync: true,
//     bufferProcessing: false,
//     onwrite: [Function: bound onwrite],
//     writecb: null,
//     writelen: 0,
//     afterWriteTickInfo: null,
//     bufferedRequest: null,
//     lastBufferedRequest: null,
//     pendingcb: 0,
//     prefinished: false,
//     errorEmitted: false,
//     emitClose: false,
//     autoDestroy: false,
//     bufferedRequestCount: 0,
//     corkedRequestsFree: {
//       next: null,
//       entry: null,
//       finish: [Function: bound onCorkedFinish]
//     }
//   },
//   writable: true,
//   allowHalfOpen: true,
//   _sockname: null,
//   _pendingData: null,
//   _pendingEncoding: '',
//   server: Server {
//     insecureHTTPParser: undefined,
//     _events: [Object: null prototype] { connection: [Array] },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     _connections: 2,
//     _handle: TCP {
//       reading: false,
//       onconnection: [Function: onconnection],
//       [Symbol(owner)]: [Circular]
//     },
//     _usingWorkers: false,
//     _workers: [],
//     _unref: false,
//     allowHalfOpen: true,
//     pauseOnConnect: false,
//     httpAllowHalfOpen: false,
//     timeout: 120000,
//     keepAliveTimeout: 5000,
//     maxHeadersCount: null,
//     headersTimeout: 60000,
//     _connectionKey: '6::::8080',
//     [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//     [Symbol(ServerResponse)]: [Function: ServerResponse],
//     [Symbol(kCapture)]: false,
//     [Symbol(asyncId)]: 5
//   },
//   _server: Server {
//     insecureHTTPParser: undefined,
//     _events: [Object: null prototype] { connection: [Array] },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     _connections: 2,
//     _handle: TCP {
//       reading: false,
//       onconnection: [Function: onconnection],
//       [Symbol(owner)]: [Circular]
//     },
//     _usingWorkers: false,
//     _workers: [],
//     _unref: false,
//     allowHalfOpen: true,
//     pauseOnConnect: false,
//     httpAllowHalfOpen: false,
//     timeout: 120000,
//     keepAliveTimeout: 5000,
//     maxHeadersCount: null,
//     headersTimeout: 60000,
//     _connectionKey: '6::::8080',
//     [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//     [Symbol(ServerResponse)]: [Function: ServerResponse],
//     [Symbol(kCapture)]: false,
//     [Symbol(asyncId)]: 5
//   },
//   timeout: 120000,
//   parser: HTTPParser {
//     '0': [Function: parserOnHeaders],
//     '1': [Function: parserOnHeadersComplete],
//     '2': [Function: parserOnBody],
//     '3': [Function: parserOnMessageComplete],
//     '4': [Function: bound onParserExecute],
//     _headers: [],
//     _url: '',
//     socket: [Circular],
//     incoming: null,
//     outgoing: null,
//     maxHeaderPairs: 2000,
//     _consumed: true,
//     onIncoming: [Function: bound parserOnIncoming],
//     parsingHeadersStart: 1594074220891
//   },
//   on: [Function: socketListenerWrap],
//   addListener: [Function: socketListenerWrap],
//   prependListener: [Function: socketListenerWrap],
//   _paused: false,
//   [Symbol(asyncId)]: 13,
//   [Symbol(kHandle)]: TCP {
//     reading: true,
//     onconnection: null,
//     _consumed: true,
//     [Symbol(owner)]: [Circular]
//   },
//   [Symbol(kSetNoDelay)]: false,
//   [Symbol(lastWriteQueueSize)]: 0,
//   [Symbol(timeout)]: Timeout {
//     _idleTimeout: 120000,
//     _idlePrev: [TimersList],
//     _idleNext: [Timeout],
//     _idleStart: 13215,
//     _onTimeout: [Function: bound ],
//     _timerArgs: undefined,
//     _repeat: null,
//     _destroyed: false,
//     [Symbol(refed)]: false,
//     [Symbol(asyncId)]: 14,
//     [Symbol(triggerId)]: 13
//   },
//   [Symbol(kBuffer)]: null,
//   [Symbol(kBufferCb)]: null,
//   [Symbol(kBufferGen)]: null,
//   [Symbol(kCapture)]: false,
//   [Symbol(kBytesRead)]: 0,
//   [Symbol(kBytesWritten)]: 0
// }
//  */
// server.listen(8080);













































/* ******************* Experiment: Create http server ******************* */


// const server = http.createServer((req, res) => {
//   // console.log('res', res);//res also is event -> Emitted when a response is received to this request. This event is emitted only once.
//   // console.log('req', req);//Class: http.IncomingMessage - will show in console when we try write in broweser url - localhost -> Emitted each time there is a request. 
//   // console.log("2 - request listener", req.url);

//   // console.log('req.eventNames()', req.eventNames());//[ 'end' ]

//   res.write(`<h1>Hello World</h1>`);//Отправляет текст или поток текста клиенту
//   res.end();//Сигналы того, что сервер должен считать, что ответ завершен

//   //return new http.Server() - creaate server return 

// });//http.Server instance
// server.listen(3000, (err) => {
//   console.log('1 - err', err);
// });

/**
 * response.write(chunk[, encoding][, callback]) -
 * ⚠ This method may be called multiple times to provide successive parts of the body.
 */

/**
 * response.end([data[, encoding]][, callback]) - This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
 || Этот метод сообщает серверу, что все заголовки и тело ответа отправлены; этот сервер должен считать это сообщение завершенным. Метод response.end () ДОЛЖЕН вызываться для каждого ответа.

 *
 *
 */

































/* ******************* Create http server ******************* */
//$1
// const server = http.createServer((req, res) => {
//   res.write("<h1>Message  for  client</h1>");
//   res.end();
// });

// server.listen(3000);







// //$2
// const fs = require("fs");
// const path = require("path");

// const bodyPath = path.join(__dirname, "public", "index.html");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   fs.readFile(bodyPath, "utf-8", (err, data) => {
//     if (err) throw err;
//     res.write(data);
//     res.end();
//   });
// });

// server.listen(3000);




// //$3
// const fs = require("fs");
// const path = require("path");

// const bodyPath = path.join(__dirname, "public", "index.html");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   fs.readFile(bodyPath, "utf-8", (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("404 not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// });

// server.listen(3000);



























/* ******************* IncomingMessage Object in nodeJs ******************* */

const server = http.createServer((req, res) => {
  // console.log('req.headers', req.headers);
    
  // console.log('req.httpVersion', req.httpVersion);//1.1
  
  // console.log('req.method', req.method);//GET
  
  // console.log('req.rawHeaders', req.rawHeaders);
  // console.log('req.statusCode1', req.statusCode);//null ??????

  // res.writeHead(200);
  // console.log('with writeHeade -> req.statusCode', req.statusCode);//null ??????
  
  // console.log('req.socket', req.socket);//Socket {} - big object
  
  // console.log('req.url 1', req.url);//Returns the request URL string -> after slash

  
  res.write("<h1>Hello World!!!!!!! :)</h1>");
  //request in not finished 
  res.end();
  // console.log('req.statusCode2', req.statusCode);//null ??????
  console.log('req.url 2', req.url);

})

server.listen(3000, () => {
  console.log("server is runing");
  
});

