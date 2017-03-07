// =========================================================================
// ========================= User Factory ==================================
// =========================================================================
app.factory('userFactory', function ($http){
  var factory = {};
  var user = {};
  var message = {};


  // // Register User method
  factory.register = function(input, callback){
    $http.post('/user/reg', input).then(function(output){
      // console.log('Made it back to factory');
      // console.log(output);
      callback(output);
    });
  }

  //Login method
  factory.login = function(input, callback){
    $http.post('/user/login', input).then(function(output){
      console.log('Made it back to factory');
      console.log(output);
      callback(output);
    });
  }


  return factory;
}); // End Login Factory





// =========================================================================
// ========================= Wall Factory ==================================
// =========================================================================
app.factory('wallFactory', function ($http) {
    var factory = {};

    factory.submitNewMessage = function(data_from_user, callback){
      console.log('At the factory ======= ');
      $http.post('/messages/new', data_from_user).then(function(info_from_db){ //info from db goes to controller.
        console.log("we just added a message! "); //.then only runs after db comes back from db.
        callback(info_from_db.data);
      });
    }

    factory.getAllMessages = function(callback){
      $http.get('/messages/all').then(function(info_from_db){
        console.log("we just got all messages");
        callback(info_from_db.data);
      });
    }

    return factory;
});




//==============codeFactory ========================================
app.factory('codeFactory', function ($http) {
    var factory = {};
    var user = {};


    factory.submitNewCode = function(data_from_user, callback){
      $http.post('/addCode', data_from_user).then(function(info_from_db){
        console.log("we made it back "); //.then only runs after db comes back from db.
        callback(info_from_db);
      }); //this http request will have call back to run in this callback.  yo dawg u like callbacks, so callback in callback
    }
    factory.getAllCodes = function(callback){
      $http.get('/codes/all').then(function(info_from_db){
        console.log("we just got all messages");
        callback(info_from_db.data);
      });
    }

    factory.getUser = function(callback){
      callback(user);
    }

    factory.getUser = function(callback){
      callback(user);
    }

    factory.getStaticCode = function(callback){
      $http.get('/codes/staticCode').then(function(info_from_db){
        callback(info_from_db);
      })
    }





    return factory;
});
