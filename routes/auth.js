const {Router} = require("express");
const router = Router();

router.get("/login", (req, res) => {
    
    res.render('auth/login');//Returns the rendered HTML of a view
});

module.exports = router;