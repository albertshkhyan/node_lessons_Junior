const { Router } = require("express");


const router = Router();

router.get('/', (req, res) => {
    res.render("add", { title: "Add Courses", isAdd: true });
});


module.exports = router;