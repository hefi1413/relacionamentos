var express = require('express');
var router = express.Router();

/* GET inicio */
router.get('/inicio', function(req, res, next) {
  res.render('inicio', { });
});

module.exports = router;