var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

app.get('/:contentId', function (req, res) {

	var xmlfile = __dirname + "/../content.xml";

	fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var articles = result.content.article;

                for(var i = 0; i < articles.length; i++) {
        
                    // If article id is equal to the passed paramater :contentId
                    if(articles[i].$.id == req.params.contentId) {
                        // Remove from array
                        articles.splice(i, 1); 
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
				
				// Redirect back to Admin route
                res.redirect('/admin/');
            });
        }
    });
});

module.exports = router;