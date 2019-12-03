var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET create page. */
router.get('/', function(req, res, next) {
    
    res.render('create-tip', { 
        activeMenu: 'Admin',
        title: 'LosViajesdeMaura'
    });

});

/* Post to create page. */
router.post('/', function (req, res) {

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
                
                // Increment ID
                newTipID = tips.length + 1;

                // Create new tip Object
                var newtip =  {
                    $: {id: newTipID}, 
                    title: tipTitle,
                    image: tipImage,
                    body: tipBody
                };

                // Add new tip to results. 
                result.content.tip.push(newtip); 
				
				var builder = new xml2js.Builder({cdata: true});
				var xml = builder.buildObject(result); 

				fs.writeFile(xmlfile, xml, function (error) {
					if (error) {
						throw error;
					} else {
						console.log('It\'s saved!');
					}
				});
				
				// Redirect back to admin route
                res.redirect('/admin/');
            });
        }
    });

});

module.exports = router;