var Admin = require('../models/admin');

findUserIdFor = function(val) {
// console.log("validateEmailAndPassword")
  Admin.findOne({email}, (err, admin)=>{
      if(err){
        return res.status(500).json({
          title: 'An error has occured',
          error: err
        })
      }
      if (!admin) {
        return res.status(401).json({
            title: 'Login failed',
            error: {message: 'Invalid login credentials'}
        });
    }
    if (!password === admin.password)) {
           return res.status(401).json({
               title: 'Login failed',
               error: {message: 'Invalid login credentials'}
           });
       }
    return adminInfo = {status: true}
    })
  }

module.exports  = validateEmailAndPassword;
