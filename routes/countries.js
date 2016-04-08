var express = require('express');
var router = express.Router();

/*
 * GET countrylist
 */
router.get('/countryList', function(req, res) {
    var db = req.db;
    var collection = db.get('countries');
    collection.find({},{sort:{country: 1}},function(e,docs){
        res.json(docs);
    });
});
/*
 * POST to addCountry
 */
router.post('/addCountry', function(req, res) {
    var db = req.db;
    var collection = db.get('countries');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE country.
 */
router.delete('/deleteCountry/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('countries');
    var countryToDelete = req.params.id;
    collection.remove({ '_id' : countryToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});
module.exports = router;
