var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res) {
  res.render('admin', { title: 'Troy is my one true love' });
});

module.exports = router;
