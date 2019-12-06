var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET Shop page. */
router.get('/', function(req, res, next) {
  
  var xmlfile = __dirname + "/../content.xml";

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

    //res.writeHead(200, {'Content-Type': 'text/html'});

    //var xml = fs.readFileSync('/../content.xml', 'utf8');
    //var xsl = fs.readFileSync('/../content.xsl', 'utf8');
    //var doc = xmlParse(xml);
    //var stylesheet = xmlParse(xsl);

    //var result = xsltProcess(doc, stylesheet);
    //console.log(result);
    //res.end(result.toString());
    
});

module.exports = router;