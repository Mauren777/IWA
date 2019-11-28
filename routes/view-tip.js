var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET view page. */
router.get('/:contentId', function(req, res, next) {

	var xmlfile = __dirname + "/../xml/content.xml";

  	fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var apptitle = result['content']['apptitle'];
                var tips = result.content.tip;
                var tip;

                for(var i = 0; i < tips.length; i++) {
                    var obj = tips[i];
                    
                    // If article id is equal to the passed paramater :contentId
                    if(obj.$.id == req.params.contentId) {
                        tip = obj;
                    }
                }

                res.render('view-tip', { 
                  activeMenu: 'Tips',
                  title: apptitle,
                  tip: tip
                });
            });
        }
    });
});

module.exports = router;