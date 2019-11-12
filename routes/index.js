var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: 'LosViajesdeMaura',
      intro: 'I am <strong>Traveler</strong> &amp; <strong>Blogger</strong> from Bolivia, Who Loves Documenting Adventures &amp; Discoveries Around the World'
      });
});

module.exports = router;
