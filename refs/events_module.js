
/************************************ events module ************************************/
//# events a default module available in node, that allows us to create custom events. || events модуль по умолчанию, доступный в узле, который позволяет нам создавать собственные события.



const events = require("events");
// console.log('events', events);
//or
// const EventEmitter = require("events");
// console.log('events.entEmitter', events.EventEmitter);//⚠not content of EventEmitter we must create instance
// console.log('events.entEmitter', new events.EventEmitter);//👍 
console.log('events.entEmitter', new events.EventEmitter().__proto__);//👍 

// console.log('events', events);

/*
[Function: EventEmitter] {
  once: [Function: once],
  on: [Function: on],
  EventEmitter: [Circular],
  usingDomains: false,
  captureRejectionSymbol: Symbol(nodejs.rejection),
  captureRejections: [Getter/Setter],
  errorMonitor: Symbol(events.errorMonitor),
  defaultMaxListeners: [Getter/Setter],
  init: [Function],
  listenerCount: [Function]
}
*/
















/** EventEmmiter
 * EventEmitter - это модуль, который облегчает связь / взаимодействие между объектами в Node. EventEmitter лежит в основе асинхронной управляемой событиями архитектуры Node. Многие из встроенных модулей Node наследуются от EventEmitter, в том числе такие известные платформы, как Express.js.
 * 
 * Event Emmiter methods and properties
      events.entEmitter EventEmitter {
        _events: undefined,
        _eventsCount: 0,
        _maxListeners: undefined,
        setMaxListeners: [Function: setMaxListeners],
        getMaxListeners: [Function: getMaxListeners],
        emit: [Function: emit],
        addListener: [Function: addListener],
        on: [Function: addListener],
        prependListener: [Function: prependListener],
        once: [Function: once],
        prependOnceListener: [Function: prependOnceListener],
        removeListener: [Function: removeListener],
        off: [Function: removeListener],
        removeAllListeners: [Function: removeAllListeners],
        listeners: [Function: listeners],
        rawListeners: [Function: rawListeners],
        listenerCount: [Function: listenerCount],
        eventNames: [Function: eventNames]
      }
 */
// console.log('events', events);

// "EventEmitter" instanceof 

//⚠ all object inherit EventEmitter object (like js Object.prototype)
// var fs = require('fs');
// var path = require('path');
// var rs = fs.createReadStream(path.join(__dirname, "./demofile.txt"));//ReadStream { ... }
// // console.log('rs', rs);
// rs.on('open', function () {
//     console.log('The file is open');
//   });

// console.log('rs.__proto__', rs.__proto__);
// console.log('rs.__proto__.__proto__.__proto__.__proto__.', rs.__proto__.__proto__.__proto__.__proto__);//EventEmitter {on:f, ...}

// // console.log('rs.__proto__.__proto__.__proto__.__proto__.__proto__', rs.__proto__.__proto__.__proto__.__proto__.__proto__);// {}
// console.log('rs.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__', rs.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);// null


// {}.__proto__
// console.log('{}.__proto__.__proto__', {}.__proto__.__proto__);//not inherit from EventEmmiter
// console.log('function(){}.prototype', function(){}.prototype);//{} not inherit from EventEmmiter

















/************************************ EventEmmiter class ************************************/
/*# All objects that emit events are instances of the EventEmitter class. 
|| Node js-ում բոլոր իրադարձությունները առաջանում են EventEmitter class-ի instance-ից։ (Object can have event)
|| Այն օբյեկտները, որոնք կարողանում են իրականացնել իրադարձություններ, այդ օբյեկտները ժառանգում են EventEmmiter կլասսից։ EventEmmiter կլասը մեզ տրամադրումա events մոդուլը։
*/


//// Кроме того, все свойства и методы события являются экземпляром объекта EventEmitter. Чтобы иметь доступ к этим свойствам и методам, создайте объект EventEmitter:
// const events = require("events");
// console.log('events', events);

// console.log('events.EventEmitter.prototype', events.EventEmitter.prototype);
/*
EventEmitter {
  _events: undefined,
  _eventsCount: 0,
  _maxListeners: undefined,
  setMaxListeners: [Function: setMaxListeners],
  getMaxListeners: [Function: getMaxListeners],
  emit: [Function: emit],
  addListener: [Function: addListener],
  on: [Function: addListener],
  prependListener: [Function: prependListener],
  once: [Function: once],
  prependOnceListener: [Function: prependOnceListener],
  removeListener: [Function: removeListener],
  off: [Function: removeListener],
  removeAllListeners: [Function: removeAllListeners],
  listeners: [Function: listeners],
  rawListeners: [Function: rawListeners],
  listenerCount: [Function: listenerCount],
  eventNames: [Function: eventNames]
}
*/



// console.log('events', events);
// let eventEmitter = events.EventEmitter();//undefined
// eventEmitter = new events.EventEmitter();
/*Output
 EventEmitter {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
  __proto__: 
  on,
  emit.
  etc
}
 */
// console.log('eventEmitter', eventEmitter);

//Example: 1
// eventEmitter.on("some_event", function firstListener() {
//     console.log("Listener is worked!");
// });
// eventEmitter.emit("some_event");//trigger event listener -> Output : Listener is worked! 🔫
// console.log('eventEmitter', eventEmitter);
// /*
//  {
//   _events: [Object: null prototype] { some_event: [Function: firstListener] },
//   _eventsCount: 1, 
//   _maxListeners: undefined,
//   [Symbol(kCapture)]: false
// }
// */

//Example: 2
// eventEmitter.on("some_event", function firstListener() {
//     console.log("Listener is worked 1");
// });
// eventEmitter.on("some_event", function secondListener() {
//     console.log("Listener is worked 2 ");
// });
// eventEmitter.emit("some_event");//trigger event listener -> Output : Listener is worked! 🔫
// console.log('eventEmitter', eventEmitter);
/*
The EventEmitter calls all listeners synchronously in the order in which they were registered
    Output
        Listener is worked 1
        Listener is worked 2

 {
  _events: [Object: null prototype] { some_event: [Function: firstListener] },
  _eventsCount: 1, ->⚠ already event count is 1
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
}
*/


//Example: 3

// eventEmitter.on("some_event1", function firstListener() {
//     console.log("Listener is worked 1");
// });
// eventEmitter.on("some_event2", function secondListener() {
//     console.log("Listener is worked 2 ");
// });
// eventEmitter.emit("some_event1");//trigger event listener -> Output : Listener is worked! 🔫
// console.log('eventEmitter', eventEmitter);

/*
The EventEmitter calls all listeners synchronously in the order in which they were registered

 EventEmitter {
  _events: [Object: null prototype] {
    some_event1: [Function: firstListener],
    some_event2: [Function: secondListener]
  },
  _eventsCount: 2, >⚠ event names are different
  _maxListeners: undefined,
  [Symbol(kCapture)]: false
}
*/











/*++++++++++++++++++++++++++ EventEmmiter - asynchronous functions listener ????  ++++++++++++++++++++++++++*/

//?????????????
// eventEmitter.on("some_event", function() {
//     setImmediate(() => {
//         console.log("Listener is worked 1");
//     })

// });
// eventEmitter.on("some_event", function() {
//     setImmediate(() => {
//         console.log("Listener is worked 2 ");
//     })
// });
// eventEmitter.on("some_event", function() {
//     setImmediate(() => {
//         console.log("Listener is worked 3 ");
//     })
// });
// eventEmitter.emit("some_event");//


//?????????????
// eventEmitter.on('event', (a, b) => {
//     setImmediate(() => {
//       console.log('1 this happens asynchronously');
//     });
//   });

// eventEmitter.on('event', (a, b) => {
//     setImmediate(() => {
//       console.log('2 this happens asynchronously');
//     });
//   });
//   eventEmitter.emit('event', 'a', 'b');

// console.log('eventEmitter', eventEmitter);














/*++++++++++++++++++++++++++ EventEmmiter Example with class ++++++++++++++++++++++++++*/

// class Cars extends events.EventEmitter {
//   constructor(model, color) {
//     super();
//     // console.log(this);//EventEmmiter object
//     this.model = model;
//     this.color = color;
//   }

//   speedEmmit(sp) {
//     this.emit('speed', this.model + " speed is " + sp);
//   }
// }

// const bmw = new Cars("M5", "red");
// const merc = new Cars("W223", "yellow");

// bmw.on("speed", (sp) => {
//     console.log(sp);//M5 speed is 240 km
// });
// merc.on("speed", (sp) => {
//   console.log(sp);//M5 speed is 240 km
// });
// bmw.speedEmmit("240 km");
// merc.speedEmmit("240 km");


////forEach try - defenc dublicate code

// const autos = [bmw, merc];
// autos.forEach((auto) => {
//   auto.on("speed", (sp) => {
//     console.log(sp);
//   });
// });

// bmw.speedEmmit("240 km");
// merc.speedEmmit("240 km");








/*++++++++++++++++++++++++++ Give several events single object  ++++++++++++++++++++++++++*/

/**
 * մի օբյեկտը կարող  է ունենալ նույն անունով մի քանի event
 */

////$1
// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   speedEmmit(speed) {
//     // console.log(this);//Cars,

//     this.emit('speed', `${this.model} speed is ${speed}`);
//   }
// }
// //give event on object (Cars instance) - Object can have event

// const bmw = new Cars("M5");
/**
 * 
 * emmiter.on(eventName,listener) - 
  * Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. 
 */
// bmw
//   .on("speed", () => {
//     console.log("1 speed event was work");
//   })
//   .on("speed", () => {
//     console.log("2 speed event was work");
//   });

//   bmw.speedEmmit("180");

// console.log('bmw', bmw);
/*
bmw Cars {
  _events: [Object: null prototype] { speed: [ [Function], [Function] ] },
  _eventsCount: 1,
  _maxListeners: undefined,
  model: 'M5',
  [Symbol(kCapture)]: false
}
*/









////$2
// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter(eventName, eventParam) {
//     // console.log(this);//Cars,

//     this.emit(eventName, eventParam);
//   }
// }

// const bmw = new Cars("M5");
// bmw
//   .addListener("start", (eventParam) => {
//     console.log("start event - ", eventParam);
//   })
//   .addListener("go", (eventParam) => {
//     console.log("go event - ", eventParam);
//   })
//   .addListener("speed", (eventParam) => {
//     console.log("speed event - ", eventParam);
//   });
// const registrEventArr = bmw.eventNames();/ [ 'start', 'go', 'speed' ]


// bmw.emmiter("speed",180);
// bmw.emmiter("go","start go");
// bmw.emmiter("start","starting...");


// console.log('bmw', bmw);
/*
vent was work
bmw Cars {
  _events: [Object: null prototype] {
    start: [Function],
    go: [Function],
    speed: [Function]
  },
  _eventsCount: 3,
  _maxListeners: undefined,
  model: 'M5',
  [Symbol(kCapture)]: false
}
*/



////$2
// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter(eventName, eventParam) {
//     // console.log(this);//Cars,

//     this.emit(eventName, eventParam);
//   }
// }

// const bmw = new Cars("M5");
// bmw
//   .on("start", (eventParam) => {
//     console.log("1 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("2 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("3 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("4 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("5 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("6 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("7 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("8 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("9 start event - ", eventParam);
//   })
//   .on("start", (eventParam) => {
//     console.log("10 start event - ", eventParam);
//   });

//   bmw.emit("start", "arg for all identy names listeners 10 count");//worked -> show all 10
////but more 10
// bmw.emit("start", "arg for all identy names listeners 11 count");//show all but then more 10, show worining ->Worning:  MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 start listeners added to [Cars]. Use emitter.setMaxListeners() to increase limit


// console.log('bmw', bmw);
// bmw.emit("start", "arg for all identy names listeners 10 count");
// console.log('bmw.listenerCount()', bmw.listenerCount());//0
// console.log('bmw.listenerCount()', bmw.listenerCount("start"));//10



























/**************************************** Different Ways to Listen For Events ****************************************/

/**
 * on - Adds the specified listener
 * addEventListener -> alias of on - Adds the specified listener
 * once -> only one time, and will remove from event name array -> Adds the specified listener once. When the specified listener has been executed, the listener is removed
 * prependListener -> will work first every time - Adds the specified listener as the first event with the specified name
 * prependOneListener ->  will work first only one time - 
 */


// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter(eventParam) {
//     // console.log(this);//Cars,

//     this.emit("message", eventParam);
//   }
// }

// const bmw = new Cars("M5");
// bmw
//   .on("message", (eventParam) => {
//     console.log("on - A message was emitted");
//   })
//   .addListener("message", () => {
//     console.log("addListener - Alias of on")
//   })
//   .once("message", () => {
//     console.log("once - I will work only one time");

//   })
//   .prependListener("message", () => {
//     console.log("prependListener - I will work first every time🏆");
//   })
//   .prependOnceListener("message", () => {
//     console.log("prependOnceListener - I will work first but at once ");
//   })

//   setInterval(()=> {
//     bmw.emmiter("message");
//   }, 1000);




























/**************************************** removeListener ****************************************/
/**
 * emitter.removeListener(eventName, listener) - Removes the specified listener from the listener array for the event named eventName.
 * ⚠ listener argument is required.
 */
// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter(eventParam) {
//     // console.log(this);//Cars,

//     this.emit("message", eventParam);
//   }
// }
// const listener1 = (eventParam) => {
//   console.log("on - A message was emitted");
// }
// const listener2 = (eventParam) => {
//   console.log("on - Im listenr 2");
// }
// const bmw = new Cars("M5");
// bmw
// .on("message", listener1)
// .on("message", listener2);
// // message: [ [Function: listener1], [Function: listener2] ]

//   setInterval(()=> {
//     bmw.emmiter("message");
//   }, 1000);

//   setTimeout(()=> {
//     bmw.removeListener("message", listener1);
//     // message: [ [Function: listener2] ]

//   }, 4000)

//   setTimeout(()=> {
//     bmw.emmiter("message");//not will work -> because removed from listener array (array name is message) -> registr off
//   }, 5000);
// console.log('bmw', bmw);
















































/**************************************** removeAllListener ****************************************/

/**
 * emitter.removeAllListeners([eventName]) - Removes all listeners, or those of the specified eventName.
 */
// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter() {
//     // console.log(this);//Cars,

//     this.emit("message");
//   }
// }

// const bmw = new Cars("M5");
// bmw
//   .on("message", () => {
//     console.log("1 message event");
//   })
//   .on("message", () => {
//     console.log("2 message event");
//   })
//   .on("message", () => {
//     console.log("3 message event");
//   })
//   .on("message", () => {
//     console.log("4 message event");
//   })
//   .on("message", () => {
//     console.log("5 message event");
//   })
//   .on("message", () => {
//     console.log("6 message event");
//   })
//   .on("message", () => {
//     console.log("7 message event");
//   })
//   .on("message", () => {
//     console.log("8 message event");
//   })
//   .on("message", (eventParam) => {
//     console.log("9 message event");
//   })
//   .on("data", () => {
//     console.log("9 message event");
//   })
//   .on("message", () => {
//     console.log("10 start event");
//   });
// /**
//   _events: [Object: null prototype] {
//   message: [
//     [Function], [Function],
//     [Function], [Function],
//     [Function], [Function],
//     [Function], [Function],
//     [Function], [Function]
//   ],
//   data: [Function]
// },
// _eventsCount: 2,
// _maxListeners: undefined,
// model: 'M5',
// [Symbol(kCapture)]: false
// }
//  */

// console.log('bmw', bmw);

// setInterval(() => {
//   bmw.emmiter("message");
// }, 1000);

// setTimeout(() => {
//   bmw.removeAllListeners("message");
// }, 4000);

// setTimeout(() => {
//   console.log('bmw', bmw);//_events: [Object: null prototype] { data: [Function] }, - now bmw object have only one evetn which names is data 
// }, 5000);





















/**************************************** Lstener count contorl ****************************************/

/**
 * getMaxListener - 	Returns the maximum number of listeners allowed for one event
 * setMaxListener
 * defaultMaxEmitter (static property of new EventEmtter)
 */

/*+++++++++++++++++++++++ getMaxListener and setMaxListener +++++++++++++++++++++++*/

// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter() {
//     // console.log(this);//Cars,

//     this.emit("message");
//   }
// }

// const bmw = new Cars("M5");

// // console.log('bmw.getMaxListeners();', bmw.getMaxListeners());//10 - one event can have 10 listeners
// bmw.setMaxListeners(2);
// console.log('bmw.getMaxListeners()', bmw.getMaxListeners());//2

// bmw
//   .on("message", () => {
//     console.log("1 message event");
//   })
//   .on("message", () => {
//     console.log("2 message event");
//   })
//   .on("message", () => {
//     console.log("3 message event");
//   });
//MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 3 message listeners added to [Cars]. Use emitter.setMaxListeners() to increase limit




/************************ defaultMaxListeners ************************/

//# for all instance  || Устанавливает максимальное количество слушателей, разрешенное для одного события. По умолчанию 10



// class Cars extends events.EventEmitter {
//   constructor(md) {
//     super()
//     this.model = md;
//   }
//   emmiter() {
//     // console.log(this);//Cars,

//     this.emit("message");
//   }
// }

// const bmw = new Cars("M5");
// const merc = new Cars("C3");
// Cars.defaultMaxListeners = 3;

// bmw
//   .on("message", () => {
//     console.log("1 message event");
//   })
//   .on("message", () => {
//     console.log("2 message event");
//   })
//   .on("message", () => {
//     console.log("3 message event");
//   });

// //1 - show 2 listener
// // merc
// // .on('message', () => {
// //   console.log("1 merc message event");
// // })
// // .on('message', () => {
// //   console.log("1 merc message event");
// // });

// //But 

// //2 - show 
// merc
//   .on('message', () => {
//     console.log("1 merc message event");
//   })
//   .on('message', () => {
//     console.log("2 merc message event");
//   })
//   .on('message', () => {
//     console.log("3 merc message event");
//   })
//   .on('message', () => {
//     console.log("4 merc message event");
//   });//MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 4 message listeners added to [Cars]. Use emitter.setMaxListeners() to increase limit
// merc.emmiter("message");
























/****************************************  ****************************************/
/**
 * eventNames() - array of events -> Returns an array containing all registered events;
 * listenerCount(eventName) - count of listeners of eventName (output: number) -> 	Returns the number of listeners with the specified name
 * listeners(eventName) - array of listeners of event -> Returns an array of listeners with the specified name
 */



class Cars extends events.EventEmitter {
  constructor(md) {
    super()
    this.model = md;
  }
  emmiter() {
    this.emit("message");
  }
}

const bmw = new Cars("M5");

bmw
  .on("message", () => {
    console.log("1 message event");
  })
  .on("message", () => {
    console.log("2 message event");
  })
  .on("data", () => {
    console.log("2 message event");
  })
  .on("message", () => {
    console.log("3 message event");
  });

// let arrOfEventNames = bmw.eventNames("message");//[ 'message', 'data' ]

// let arrCountOfEventNames = bmw.listenerCount("message");//3
// arrCountOfEventNames = bmw.listenerCount("data");//1


// let arrOfListener = bmw.listeners();//[]
// arrOfListener = bmw.listeners('message');//[ [Function], [Function], [Function] ]
// arrOfListener = bmw.listeners('data');//[ [Function] ]
// console.log('arrOfListener', arrOfListener);



//+Task 1
// let arrOfEventNames = bmw.eventNames("message");//[ 'message', 'data' ]
// arrOfEventNames.forEach((eventName) => {
//   console.log(`${eventName} has ${bmw.listenerCount(eventName)}`);
// })




















//NOTE -  ES6 Style Class Inheritance











