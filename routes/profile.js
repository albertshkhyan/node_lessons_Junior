const { Router } = require("express");

const router = Router();

router.get('/', (req, res) => {
    // console.log(' req.user',  req.user.__proto__);//big proto
    // console.log('req.user.toObject()', req.user.toObject().__proto__);//empty proto
    res.render('profile', {
        idProfile: true,
        user: req.user.toObject()
    });
});


router.post('/', (req, res) => {

});

module.exports = router;