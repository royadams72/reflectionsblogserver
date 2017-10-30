var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var admins = new Schema({
  email:  {type: String, required:true},
  password: {type: String, required:true}

});
// user.plugin(mongooseUniqueValidator);
//export schema
module.exports = mongoose.model('Admins', admins);
