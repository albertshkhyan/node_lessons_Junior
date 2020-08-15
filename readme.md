---
noteId: "365ee650d27f11ea8c1aaf3b0c729447"
tags: []

---

# protect keys
* create 2 files
    * keys.dev.js - for development enviroment
    * keys.pord.js - for production enviroment - in production mode keys must be hidden, in order to someone haven't seen API keys.
        * For hide keys we will user process.env
            * process.env - this is enviroment of variables in which store system variable, we can store our custom variables. | process.env - It represents the state of the system environment at the time the application is launched.
                *for decide enviroment of node js app, we will use special standart variable - NODE_ENV

