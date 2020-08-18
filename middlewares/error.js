module.exports = (req, res) => {
    res.status(404).render('404');
    //in here next not needed  because we switch this  controller in end, after all routes
}