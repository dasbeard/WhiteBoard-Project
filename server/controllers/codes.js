var mongoose = require('mongoose');
var Code = mongoose.model('Code');
module.exports = (function(){
  return {

    getAllCodes: function(req, res){ //have to do a deep populate here of multiple fields.
      Code.find({}).populate({path: '_user'}).exec(function(err, code){ //_user is field to populate with.
        if(err){
          console.log("error when getting all code".red);
        }else {
          console.log(code);
          console.log("succesfully got all codes");
          res.json(code);
        }
      });

    },






    addCode: function(req, res){
      console.log("=========".yellow);
      console.log(req.body);
      console.log("=========".yellow);
      // if(req.body.code.length <5){
      //   console.log("length is not 5 or longer");
      //   res.json({error: "code must be atleast 5 in length"});
      // }
        var code = new Code({code: req.body.code, _user: req.body._user });
        code.save(function(err){
          if(err){
            console.log("error when saving".red);
          }else {
            // console.log(code);
            console.log("code saved!".cyan);
            res.json(code);
          }
        })

    },


    getStatic: function(req,res){
      Code.find({}, function(err, allStaticCode){
        if(err){
          console.log("error when getting all code".red);
        }else {
          res.json(allStaticCode);
        }
      })
    }









  }
})();
