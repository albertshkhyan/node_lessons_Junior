//# The OS module provides information about the computer's operating system. || Модуль ОС предоставляет информацию об операционной системе компьютера.


const os = require('os');//{...utills}
// console.log('os', os);


/********************************** platform **********************************/
//# Returns information about the operating system's platform. || Возвращает информацию о платформе операционной системы

// const inforPltf = os.platform();//win32 - օպերացիոն համակարգը (պլատֆորմը) հիմնված է win32 արխիտեկտուրայի վրա։  Win32 (Windows API, WinAPI.) – это набор API Microsoft Windows
// console.log('inforPltf', inforPltf);











/********************************** arch - architecture of processor **********************************/
//# Returns the operating system CPU architecture. || Возвращает архитектуру процессора операционной системы


// const archOfOs = os.arch();//x64
// console.log('archOfOs', archOfOs);




/********************************** cpus - central processing unit **********************************/
//# os.cpus (central processing unit) - Returns an array containing information about the computer's CPUs.

// const infoAboutProcessor = os.cpus();
// console.log('infoAboutProcessor', infoAboutProcessor);

[

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,// (in MHz)
      times: {
        user: 1052953,
        nice: 0,
        sys: 6231187,
        idle: 16871421,
        irq: 4505000
      }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: {
        user: 1050703,
        nice: 0,
        sys: 1008031,
        idle: 22096484,
        irq: 142046
      }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: { user: 1442890, nice: 0, sys: 998265, idle: 21714062, irq: 45453 }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: { user: 911500, nice: 0, sys: 727843, idle: 22515875, irq: 35171 }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: { user: 1159343, nice: 0, sys: 896984, idle: 22098890, irq: 21078 }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: { user: 865031, nice: 0, sys: 616843, idle: 22673328, irq: 13406 }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: { user: 1532234, nice: 0, sys: 924109, idle: 21698859, irq: 18875 }
    },

    {
      model: 'Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz',
      speed: 2304,
      times: { user: 779765, nice: 0, sys: 885625, idle: 22489812, irq: 63156 }
    }
  ]















/********************************** freemem - free memory **********************************/
/* #Returns the amount of free system memory in bytes as an integer. || Возвращает количество свободной системной памяти в байтах в виде целого числа.
    * system memory === RAM
*/


// const frm = os.freemem();//2425982976 - վերադարձնում է ազատ հիշողության ծավալը բայթերի տեսքով։ Այսինքն RAM-ում ինչքան ազատ տեղ կա։
//   console.log('frm', frm);


  













/********************************** totalmem - total memory **********************************/
//# Returns the total amount of system memory in bytes as an integer. ||  Возвращает общий объем системной памяти в байтах в виде целого числа.

// const totalMem = os.totalmem();//8430772224 byte (8430772224 b ->  8,430772224 gb )
// console.log('totalMem', totalMem);


















/********************************** homedir - home directory **********************************/
//# Returns the string path of the current user's home directory.



// const hmdr = os.homedir();//C:\Users\aliks
// console.log('hmdr', hmdr);




















/********************************** userInfo (have hoomedir as key) **********************************/

// const usrInf = os.userInfo();
// console.log('usrInf', usrInf);
/*
{
  uid: -1,
  gid: -1,
  username: 'aliks',
  homedir: 'C:\\Users\\aliks',
  shell: null
}
*/















/********************************** uptime  **********************************/
//# Returns the system uptime in number of seconds. || Возвращает время работы системы в секундах.

// const upt = os.uptime();//2976sec  (2976 sec to 51 min)
// console.log('upt', upt);




