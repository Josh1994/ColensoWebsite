var express = require('express');
var router = express.Router();
var basex = require ('basex')
var client = new basex.Session ("127.0.0.1", 1984, "admin", "admin");
client.execute ("OPEN Colenso");

/* GET home page. */
router.get("/", function(req, res) {
res.render('index', { title: 'Colenso Wesbite' , placer : "Hello"});

});
module.exports = router;
