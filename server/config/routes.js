// =========================================================================
// ============================== Require ==================================
// =========================================================================
var users = require('./../controllers/users.js');
var messages = require('./../controllers/messages.js');
var codes = require('./../controllers/codes.js');



module.exports = function(app, io) {
  var line_history = [];

    io.sockets.on('connection', function(socket){
      //run as soon as socket is connected ----
      console.log("we are using sockets my friend");
      console.log(socket.id);

      socket.on("updateInfo", function(data){
        //tell all clients to update info except one sending it.
        socket.broadcast.emit("getAllMessages");
      });

      socket.on("updateCode", function(data){
        //tell all clients to update info except one sending it.
        socket.broadcast.emit("getAllCodes");
      });

      socket.on('clear', function(data){
        line_history = [];
        console.log('sometihing');
        for (var i in line_history) {
          socket.emit('draw_line', { line: line_history[i] } );
        }
        io.emit('refresh');
      });



      // first send the history to the new client
      for (var i in line_history) {
        socket.emit('draw_line', { line: line_history[i] } );
      }

      // add handler for message type "draw_line".
      socket.on('draw_line', function (data) {
        // add received line to history
        line_history.push(data.line);
        // send line to all clients
        io.emit('draw_line', { line: data.line });
      });
    });



//Canvas




// =========================================================================
// =========================== User Routes =================================
// =========================================================================
  app.post('/user/reg', function(req,res){
    users.reg(req,res)
  });

  app.post('/user/login', function(req,res){
    users.login(req,res)
  });

  //message routes =========================
  app.get('/messages/all', function(req, res) {
      messages.getAllMessages(req, res);
  });
  app.post('/messages/new', function(req, res) {

      messages.addMessage(req, res);
  });
  app.get('/codes/all', function(req, res) {
      codes.getAllCodes(req, res);
  });
  app.post('/addCode', function(req, res) {
      codes.addCode(req, res);
  });

  app.get('/codes/staticCode', function(req, res) {
      codes.getStatic(req, res);
  });

};
