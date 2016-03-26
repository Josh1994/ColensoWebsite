var express = require('express');
var router = express.Router();
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
client.execute ("OPEN Colenso");

/* GET home page. */
router.get("/", function(req, res) {
	client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" + 
	"//name[@type='place' and position() = 1 and . = 'Manawarakau']",
	function(error,result) {
	 	if (error){ console.error(error);}
	 	else{
	 		res.render('index', { title: 'ECS Video Rental' , placer : result.result });
	 				// varName: req.query.text box name. This is to get the input from the text box
	 	}
	 		}
	 		);
});
module.exports = router;
