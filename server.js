//the database part comes into play by saving queries to the database, so that previous queries can be displayed
// everything else should be non database stuff


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var Bing =require('node-bing-api')({accKey: process.env.BING1});
var queryModel = require('./models/query.js');
app.use("/public", express.static('public'));

mongoose.connect(process.env.MONGODB_URI);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

       
app.get("/search/:query*", function(req, res){
  //need params for offset and query
  var query = req.params.query;
  var offset = req.query.offset;
  if(offset===null ||offset===undefined)
    offset=0;
  var returnVal=null;
  Bing.images(query, {
    count: 10,  // Number of results (max 50) 
    offset: offset   // Skip first 3 results 
  }, function(error, resp, body){
    var returnVal =body.value.map(function(x){return {imageUrl: x.contentUrl, hostPageUrl: x.hostPageUrl, alt_text: x.name};});
    var data = new queryModel({
      searchQuery: query
    });
    data.save(err=>{
      if(err){
        return res.send('Error saving to database');
      }
    });
    res.send(JSON.stringify(returnVal));
    
  });
  // res.send("query: "+query+" offset: "+offset);
});

// app.get("/search/:query", function(req, res){
//   var redirectString = "/search/"+req.params.query+"/?offset=0";
//   res.redirect(redirectString);
// });

app.get("/history", function(req, res){
  var history = queryModel.find({}, function(err, data)
                                  {
    if(err) console.log("error");
    else 
    {
      var returnData= data.map(function(x){
        return {searchQuery: x.searchQuery, time: x.updatedAt}
      })
      returnData = returnData.reverse(); //sets most recent to the beginning of the array, rather than the end 
      res.send(returnData);
    }
  });
  //res.send(history);
  // res.send('hey there');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
