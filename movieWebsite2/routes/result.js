var express = require('express');
var router = express.Router();
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
var cheerio = require ('cheerio');
var domain = 'http://www.tei-c.org/ns/1.0';
client.execute ("OPEN Colenso");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var xmlFile = req.query.filr;
  console.log(xmlFile);
  client.execute("XQUERY doc('"+xmlFile+"')" ,
  function(error,result) {
  if (error){ console.error(error);}
    else{
      //var fn = jade.compile(result.result, {doctype:'xml'});
     // var fn = [];
     // fn = result.result.split('\n');
      var i = 0;

      //placer = search query
      //doc = raw search query result
      //list = formatted search result
      res.render('result', {title:'Search Results', text: result.result, text2:result.result });
      }
  }
  )
});

module.exports = router;