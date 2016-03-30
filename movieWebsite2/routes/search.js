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
  "for $n in .//TEI[. contains text '"+searchValue+".*'using wildcards or boolean("+searchValue+")]" + "return db:path($n)",
  //or boolean("+searchValue+")
  //  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" + 
  //"//name[@type='place' and position() = 1 and . ='" +req.query.searchString+ "']",
  function(error,result) {
    if (error){ console.error(error);}
    else{
      list = result.result.split('\n');
      var i = 0;
      for (i = 0; i < list.length; i++){
        var temp = list[i];
        list[i] = "Colenso/";
        list[i] += temp ;
      }
      res.render('search', {title:'Search Results',placer: result.result, Array:list});
      }
  }
  );
});
module.exports = router;