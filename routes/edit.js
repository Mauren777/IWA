var express      = require('express');
var router       = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();

/* GET edit page. */
router.get('/:contentId', function(req, res, next) {

	var xmlfile = __dirname + "/../content.xml";

  	fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {

                var apptitle = result['content']['apptitle'];
                var articles = result.content.article;
                var article;

                for(var i = 0; i < articles.length; i++) {
                    var obj = articles[i];
                    
                    // If article id is equal to the passed paramater :contentId
                    if(obj.$.id == req.params.contentId) {
                        article = obj;
                    }
                }

                res.render('edit', { 
                  activeMenu: 'Admin',
                  title: apptitle,
                  article: article
                });
            });
        }
    });
});

/* Post to edit page. */
router.post('/:contentId', function (req, res) {

	// POST values
	var articleTitle = req.body.article_title;
	var articleDate = req.body.article_date;
	var articleImage = req.body.article_image;
	var articleBody = req.body.article_body;

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

                        // update the article with POST data.
                        result.content.article[i].title = articleTitle;
                        result.content.article[i].date = articleDate;
                        result.content.article[i].image = articleImage;
                        result.content.article[i].body = articleBody;
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
                res.redirect('/edit/' + req.params.contentId);
            });
        }
    });

});

module.exports = router;