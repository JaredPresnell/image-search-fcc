//the database part comes into play by saving queries to the database, so that previous queries can be displayed
// everything else should be non database stuff


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var Bing =require('node-bing-api')({accKey: process.env.BING1});
app.use("/public", express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/search/:query*", function(req, res){
  //need params for offset and query
  var query = req.params.query;
  var offset = req.query.offset;
  var returnVal=null;
  Bing.images(query, {
    count: 10,  // Number of results (max 50) 
    offset: offset   // Skip first 3 results 
  }, function(error, resp, body){
    var returnVal =body.value.map(function(x){return {imageUrl: x.contentUrl, hostPageUrl: x.hostPageUrl, alt_text: x.name};});
    res.send(JSON.stringify(returnVal));
    
  });
  // res.send("query: "+query+" offset: "+offset);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
