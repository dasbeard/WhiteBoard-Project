// =========================================================================
// ============================== Require ==================================
// =========================================================================
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

var User = mongoose.model('User');

module.exports = (function(){
  return {

    reg: function(req,res){
      console.log('In the Reg method  ----> users controler'. cyan);
      console.log(req.body);

      User.findOne({email: req.body.email}, function(err, oneUser){
        if(err){
          console.log('====== Error ======'.red);
        } else {
          //1. User was found
          if(oneUser){
            console.log('====== user Was Found ======'.yellow);
            res.json({error: "This email is already registered. Please Login"});
          } else {
          // 2. No email found
            console.log('====== User is good to go ======'.yellow);
            // Encrypt password before saving
            // var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

            //Create the user object and save to database
            var user = new User({name: req.body.name, email: req.body.email, password:  req.body.password});
            user.save(function(err){
              if(err){
                console.log('====== Error when Registering ======'.red);
              } else {
                console.log('====== Successfuly registered ======');
                res.json(user)
              }
            });
          }
        }
      });
    },


    login: function(req,res){
      console.log('In the login method  ----> users controler'. cyan);
      console.log(req.body);

      // Find user by email
      User.findOne({email: req.body.email}, function(err, oneUser){
        if(err){
          console.log('====== Error ======'.red);
        } else {
          if(!oneUser){
            console.log('====== user NOT Found ======'.yellow);
            res.json({error: "Email not in the system. Please Register"});

          } else {
            console.log('====== Checking password ======'.yellow);
            // Authenticate password
            if(req.body.password == oneUser.password){
            // if(bcrypt.compareSync(req.body.password, oneUser.password)){
              console.log('====== Successfuly Logged In ======');
              console.log(oneUser);
              res.json(oneUser)
            } else {
              res.json({error: "Email or Password do not match"});
            }
          }
        }
      });
    },


  }
})();
