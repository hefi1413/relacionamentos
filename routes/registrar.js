var express = require('express');
var router = express.Router();

/* GET registrar */
router.get('/registrar', function(req, res, next) {
  res.render('registrar', {} );
});

module.exports = router;