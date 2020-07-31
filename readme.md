---
noteId: "365ee650d27f11ea8c1aaf3b0c729447"
tags: []

---
Plan
⚫Install connect-mongodb-session
⚫After express-session require,import  function whch return mongoDB class,
⚫Give option that class.
⚫Then our session store in db.
⚫Then loged in system , that see in db session. ????
⚫When we do logout session must be clear in db.
⚫Have problem – hide two button edit and pay.

NOTE withour database when do reload of page redirect on login page, but when session store in db, its doesn't happen.


# Plan

# exmplain
save(callback) - Saves a session back to the store, replacing the contents of the store with the contents in memory.
Сохраните сеанс обратно в хранилище, заменив содержимое хранилища содержимым в памяти (хотя хранилище может сделать что-то другое - обратитесь к документации хранилища для точного поведения).

NOTE -  resave: this may have to be enabled for session stores that don't support the "touch" command.
NOTE - when saveUninitialized is false, the (still empty, because unmodified) session object will not be stored in the session store. 