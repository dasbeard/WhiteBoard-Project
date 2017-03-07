var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports = (function(){
  return  {

    getAllMessages: function(req, res){ //have to do a deep populate here of multiple fields.
      Message.find({}).populate([{path: '_user'},{path: '_comments', populate: {path: '_user'}}]).exec(function(err, m){ //_user is field to populate with.
        if(err){
          console.log("error when getting all messages".red);
        }else {
          // console.log(m);
          console.log("succesfully got all messages");
          res.json(m);
        }
      });
    },


    addMessage: function(req, res) {
      console.log("==========".yellow);
      console.log(req.body);
      console.log("============".yellow);

      var m = new Message({content: req.body.content, _user: req.body._user});
      m.save(function(err){
        if(err){
          console.log("error when saving message".red);
        } else {console.log(m);
          console.log("saved above mesage".green);
          res.redirect('/messages/all');
        }
      })
    }

  }
})();
