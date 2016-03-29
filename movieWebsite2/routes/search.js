var express = require('express');
var router = express.Router();
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
var cheerio = require ('cheerio');
var domain = 'http://www.tei-c.org/ns/1.0';
client.execute ("OPEN Colenso");

/*GET search page (working)*/ 
router.get("/", function(req,res){
  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" + 
  "//*[text()='" +req.query.searchString+ "']",
  //  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" + 
  //"//name[@type='place' and position() = 1 and . ='" +req.query.searchString+ "']",
  function(error,result) {
    if (error){ console.error(error);}
    else{
      res.render('search', {title:'Search Results', placer: result.result});
      }
  }
  );
});
module.exports = router;