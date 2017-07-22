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

app.get("/query/*", function(req, res){
  var temp = req.params[0];
  Bing.images(temp, {
    count: 10,  // Number of results (max 50) 
    offset: 3   // Skip first 3 results 
  }, function(error, resp, body){
 
    res.json(body);
  });
 //res.send('return val is '+returnVal);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
