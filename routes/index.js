var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var xmlfile = __dirname + "/../content.xml";

  fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var apptitle = result['content']['apptitle'];
                var appintro = result['content']['appintro'];
                var articles = result['content']['article'];

                res.render('index', { 
                  activeMenu: 'Home',
                  title: apptitle,
                  intro: appintro,
                  articles: articles,
                });
            });
        }
    });
});

module.exports = router;