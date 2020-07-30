# Plan
⚫ Switch package which allow use session, install express-session 
    ◾ Create a session middleware with the given options. ✅ ?
    ◾ access the request session object and store certain data directly inside the session  ✅ 
    ◾ Handle posts request of login and Sign up (implement routes, /register and /login)  ✅ 

⚫ in template we must understand there is  authorized user or not
    ◾ Custom middleware 📁middlware -> variables.js
    ◾ In index.js switch own middleware (⚠ switch that middleware correct place, that mean after express-session middleware)
    ◾ Add functionality which allow add or hide some items in navbar (show login or add, cart, orders)
⚫ Add item which allow log off (logout) from system
    ◾ Implement logout route (auth/logaout) -> clear session


# exmplain
* req.session - Сеанс, соответствующий этому sessionId, выбирается с сервера и присоединяется к объекту req как req. сессия. Это дает ощущение, что мы получаем сессию со стороны клиента, но на самом деле это промежуточное программное обеспечение, которое прикрепляет объект сеанса к объекту запроса, получая cookie от клиента.
