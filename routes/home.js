const {Router} = require("express");


//The top-level express object has a Router() method that creates a new router object.
const router = Router();//instance of middleware

router.get('/', (req, res) => {
    res.render("index", { title: "Home", isHome: true });
});

module.exports = router;