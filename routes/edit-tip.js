var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET edit page. */
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
                    
                    // If tip id is equal to the passed paramater :contentId
                    if(obj.$.id == req.params.contentId) {
                        tip = obj;
                    }
                }

                res.render('edit-tip', { 
                  activeMenu: 'Admin',
                  title: apptitle,
                  tip: tip
                });
            });
        }
    });
});

/* Post to edit page. */
router.post('/:contentId', function (req, res) {

	// POST values
	var tipTitle = req.body.tip_title;
	var tipImage = req.body.tip_image;
	var tipBody = req.body.tip_body;

	var xmlfile = __dirname + "/../xml/content.xml";

	fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var tips = result.content.tip;

                for(var i = 0; i < tips.length; i++) {
        
                    // If tip id is equal to the passed paramater :contentId
                    if(tips[i].$.id == req.params.contentId) {

                        // update the tip with POST data.
                        result.content.tip[i].title = tipTitle;
                        result.content.tip[i].image = tipImage;
                        result.content.tip[i].body = tipBody;
                    }
				}
				
				var builder = new xml2js.Builder({cdata: true});
				var xml = builder.buildObject(result); 

				fs.writeFile(xmlfile, xml, function (error) {
					if (error) {
						throw error;
					} else {
						console.log('It\'s saved!');
					}
				});
				
				// Redirect back to GET route
                res.redirect('/edit-tip/' + req.params.contentId);
            });
        }
    });

});

module.exports = router;