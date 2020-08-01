---
noteId: "365ee650d27f11ea8c1aaf3b0c729447"
tags: []

---

CSRF or XSRF - fake request
* attack with forms
* CSRF (Cross-Site Request Forgery, также XSRF) – опаснейшая атака, которая приводит к тому, что хакер может выполнить на неподготовленном сайте массу различных действий от имени других, зарегистрированных посетителей.
* Cross-site request forgery, also known as one-click attack or session riding and abbreviated as CSRF.
That mena hacker can get our session.

Plan
⚫Install csurf package
⚫Refactor all forms (return function as middleware).
⚫Use csurf middleware
⚫Fix error “Invalid csrf token”
⚫Handle all forms.
    Add in variable middleware new variable for views



ForbiddenError: invalid csrf token - this error give when we try do post request.