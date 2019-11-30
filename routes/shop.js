var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET Shop page. */
router.get('/', function(req, res, next) {
  
  var xmlfile = __dirname + "/../xml/content.xml";

  fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var apptitle = result['content']['apptitle'];
                var products = result['content']['product'];

                res.render('shop', { 
                  activeMenu: 'Shop',
                  title: apptitle,
                  products: products 
                });
            });
        }
    });
});

module.exports = router;