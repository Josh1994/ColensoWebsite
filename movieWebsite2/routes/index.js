var express = require('express');
var router = express.Router();
var cheerio = require ('cheerio')
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
client.execute ("open movies");

/* GET home page. */
// Testing master update
router.get('/', function(req, res, next) {
client.execute("xquery for $movie in //movie[position() lt 10] "+ 
	"return <movie> {$movie/title} {$movie/id} </movie>",
function(body) {
	 
	 var $ = cheerio.load(body);
	 var list = [];
	 $('movie').each(function (i,elem) {
	 	var title = $(elem).find('title').text();
	 	var id = $(elem).find('id').text();
	 	var url = 'images/' + id + '.jpg';
	 	list.push ({p:title, image: url});

	 });
	  res.render('index', { title: 'ECS Movie Rental' , images : list });
	}
	);
 
});

//module.exports = router;
