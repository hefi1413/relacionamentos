var express = require('express');
var router = express.Router();

/* GET contato */
router.get('/contato', function(req, res, next) {
  res.render('contato', { });
});

module.exports = router;