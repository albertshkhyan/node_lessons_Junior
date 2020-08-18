const {Router} = require("express");


//The top-level express object has a Router() method that creates a new router object.
const router = Router();//instance of middleware

router.get('/', (req, res) => {
    // console.log('req.session home - ', req.session);//in content of session object ther is isAuthenticated: true

    res.render("index", { title: "Home", isHome: true });
});

module.exports = router;