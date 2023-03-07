var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    //indexControll.init();
    //
    res.redirect('/home');
});

module.exports = router;