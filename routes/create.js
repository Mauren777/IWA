var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET create page. */
router.get('/', function(req, res, next) {
    
    res.render('create', { 
        activeMenu: 'Admin',
        title: 'LosViajesdeMaura'
    });

});

module.exports = router;