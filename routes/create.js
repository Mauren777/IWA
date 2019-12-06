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

/* Post to create page. */
router.post('/', function (req, res) {

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
                
                // Increment ID
                newArticleID = articles.length + 1;

                // Create new article Object
                var newArticle =  {
                    $: {id: newArticleID}, 
                    title: articleTitle,
                    date: articleDate,
                    image: articleImage,
                    body: articleBody
                };

                // Add new article to results. 
                result.content.article.push(newArticle); 
				
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