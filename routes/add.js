const { Router } = require("express");
const { route } = require("./home");


const router = Router();

router.get('/', (req, res) => {
    res.render("add", { title: "Add Courses", isAdd: true });
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);//undefined
/*for fix req.body: we must add middleware which will parse request url to object 
title=Alik&price=Shkhyan&image=ssd -> { title: 'Alik', price: 'Shkhyan', image: 'ssd' }
*/
////after add middleware express.urlencoded
console.log('req.body', req.body);//{ title: 'Alik', price: 'Shkhyan', image: 'ssd' }


    res.redirect('/courses');
})


module.exports = router;