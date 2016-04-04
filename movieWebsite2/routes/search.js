var express = require('express');
var router = express.Router();
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
var cheerio = require ('cheerio');
var domain = 'http://www.tei-c.org/ns/1.0';
client.execute ("OPEN Colenso");
var list = [];

/*GET search page (working)*/ 
router.get("/", function(req,res){
  var searchValue = req.query.searchString;

  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" + 
  "for $n in .//TEI[. contains text '"+searchValue+".*'using wildcards or boolean("+searchValue+")]" + 
  "return db:path($n)",

 // "return db:path($n)", // Returns xml document with path
  //"XQUERY doc('Colenso/db:path($n)')" //Ideally should open each xml matching the search query and to be displayed  stright after
  //"XQUERY doc('Colenso/McLean/private_letters/PrLMcL-0024.xml')" //Example of ^
  //or boolean("+searchValue+")
  function(error,result) {
    if (error){ console.error(error);}
    else{
      list = result.result.split('\n'); //comma is shown every result dude to split in new line
      //console.log(result.result);
      var i = 0;
      for (i = 0; i < list.length; i++){
        var holder = list[i];
        list[i] = "Colenso/";
        list[i] += holder;
       // console.log (fn:doc(list[i]));
      }
      //placer = search query
      //doc = raw search query result
      //list = formatted search result
      res.render('search', {title:'Search Results',placer: searchValue,doc:result.result, Array:list});
      }
  }
  )
;});
module.exports = router;