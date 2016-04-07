var express = require('express');
var router = express.Router();
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
var cheerio = require ('cheerio');
var domain = 'http://www.tei-c.org/ns/1.0';
var path = require('path');
client.execute ("OPEN Colenso");  

/* GET users listing. */
router.get('/', function(req, res) {
 // var pathToFile =
  var xmlFile = req.query.filr;
  var file = path.resolve("../") +'/'+ xmlFile;
  console.log(xmlFile);
  console.log(file);
  res.download(file);
});
module.exports = router;
