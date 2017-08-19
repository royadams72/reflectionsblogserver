var mongoose = require('mongoose')

//mongoose schemas work with server side js to define data structures
//and methods to interact with your data store.
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required:true},
  script: {type: String, required:true},
  vidUrl: {type: String, required:true}
});
//export schema
module.exports = mongoose.model('Blog', schema);//Will export as message
