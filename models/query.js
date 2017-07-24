var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const querySchema = new Schema({
  
  searchQuery: String,
  
}, {timestamps: true});

const ModelClass = mongoose.model('query', querySchema);

module.exports = ModelClass;