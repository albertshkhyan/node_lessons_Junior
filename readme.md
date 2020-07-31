---
noteId: "365ee650d27f11ea8c1aaf3b0c729447"
tags: []

---
Plan
⚫Implement register post routes
    ◾ User registration and email verification || user registration with email
    ◾ Have candidate  
    ◾ By default when user registration he will have empty cart




# Plan

# exmplain
save(callback) - Saves a session back to the store, replacing the contents of the store with the contents in memory.
Сохраните сеанс обратно в хранилище, заменив содержимое хранилища содержимым в памяти (хотя хранилище может сделать что-то другое - обратитесь к документации хранилища для точного поведения).

*  FOR WHAT connect-monogdb-session - without database when do reload of page redirect on login page, but when session store in db, its doesn't happen.
* resave: this may have to be enabled for session stores that don't support the "touch" command.
* when saveUninitialized is false, the (still empty, because unmodified) session object will not be stored in the session store. 