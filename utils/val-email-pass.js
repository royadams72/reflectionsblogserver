var Admin = require('../models/admin');

validateEmailAndPassword = function(email, password) {
  // console.log(email, password)
  var isOK = true;
 Admin.findOne({'email': email, password: password}, function(err, admin){
    //  console.log(admin.password)
      if(err){
        // return res.status(500).json({
        //   title: 'An error has occured',
        //   error: err
        // })
        console.log(err)
        return false;
      }
          // console.log(admin)
      if (!admin) {
        console.log("no admin")
        // return res.status(401).json({
        //     title: 'Login failed',
        //     error: {message: 'Invalid login credentials'}
        // });

      return false;
    }
    if (!password === admin.password) {
        // console.log(admin)
      return false;
          //  return res.status(401).json({
          //      title: 'Login failed',
          //      error: {message: 'Invalid login credentials'}
          //  });
       }
      //  if (admin) {
      //    console.log(admin)
      //    return true;
      //        //  return res.status(401).json({
      //        //      title: 'Login failed',
      //        //      error: {message: 'Invalid login credentials'}
      //        //  });
       //
      //       //  console.log("this far")
      //   // return true;
if(password === admin.password) {
  // console.log("admin")
 return isOK = true;
 }
    })
return isOK;
  }

module.exports  = validateEmailAndPassword;
