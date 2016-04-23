var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res) {
  res.render('admin', { title: 'Bananas are the best fruit' });
});

module.exports = router;
