var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET Page. */
router.get('/:contentId', function(req, res, next) {
  
  var xmlfile = __dirname + "/../xml/content.xml";

  fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var apptitle = result['content']['apptitle'];
                var pages = result['content']['page'];
                var page;

                for(var i = 0; i < pages.length; i++) {
                    var obj = pages[i];
                    
                    // If pages id is equal to the passed paramater :contentId
                    if(obj.$.id == req.params.contentId) {
                        page = obj;
                    }
                }

                // Set active nav item
                var activeItem;
                if(page.$.id == "about") {
                    activeItem = "About";
                } else if(page.$.id == "contact") {
                    activeItem = "Contact";
                }

                res.render('page', { 
                  activeMenu: 'Tips',
                  title: apptitle,
                  page: page
                });
            });
        }
    });
});

module.exports = router;