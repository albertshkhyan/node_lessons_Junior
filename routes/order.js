const {Router} = require('express');
const router = Router();

router.get("/", (req, res) =>  {
    res.render("order", {
        isOrder: true,//for navigation menu, active item
    });
});

router.post("/", (req, res) => {
    res.redirect("/orders")
});

module.exports = router;
