var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required:true},
  script: {type: String, required:true},
  vidUrl: {type: String, required:true}
});
//export schema
module.exports = mongoose.model('Blog', schema);
