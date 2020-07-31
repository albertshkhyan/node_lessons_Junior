---
noteId: "365ee650d27f11ea8c1aaf3b0c729447"
tags: []

---

# Plan
⚫ Remove that  middleware with  imitation active user.
⚫ When we must get actiove user ? - Temporarily we will wait  while get some user (active user).
    ◾ In session also add out  active user (user data and isAuthenticated)

⚠ In next we will save session I database.


# exmplain
save(callback) - Saves a session back to the store, replacing the contents of the store with the contents in memory.
Сохраните сеанс обратно в хранилище, заменив содержимое хранилища содержимым в памяти (хотя хранилище может сделать что-то другое - обратитесь к документации хранилища для точного поведения).

NOTE -  resave: this may have to be enabled for session stores that don't support the "touch" command.
NOTE - when saveUninitialized is false, the (still empty, because unmodified) session object will not be stored in the session store. 