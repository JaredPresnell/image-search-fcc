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
  //need params for offset and query
  var temp = req.params[0];
  var returnVal=null;
  Bing.images(temp, {
    count: 2,  // Number of results (max 50) 
    offset: 0   // Skip first 3 results 
  }, function(error, resp, body){
     //url = body.value[0].contentUrl
    var returnVal = body.value.map(x => x.contentUrl);
    //res.send(JSON.stringify(body.value[0].contentUrl));
    res.send(JSON.stringify(returnVal));

  });
 //res.send('return val is '+returnVal);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
