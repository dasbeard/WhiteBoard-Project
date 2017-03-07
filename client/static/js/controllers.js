// =========================================================================
// =========================== Home Controller =============================
// =========================================================================
app.controller('userController', function($scope, userFactory, wallFactory, codeFactory, $cookies, $state){

  $scope.user = {};
  $scope.message = '';
  $scope.allQuestions = [];
  $scope.loginMask = $cookies.getObject('hideMask');
  $scope.staticCode = [];

  console.log('loged user');
  console.log($scope.user);

  if($cookies.getObject('user')){
    $scope.loginMask = false;
    $state.go('home');
  } else {
    $scope.loginMask = true;
    $state.go('logReg');
  }

  $scope.user=$cookies.getObject('user');
  if(!$scope.user){
    $state.go('logReg');
  }






  $scope.regUser = function(){
    // console.log('Register Button Clicked');
    // console.log($scope.reg);


    if($scope.reg.name){
      //call Factory method to register user
      userFactory.register($scope.reg, function(output){
        // console.log(output);
        // console.log("Back from factory ---> finished registering");
        $scope.user = output.data;

        if(output.data.error){
          $scope.error = output.data.error;
        } else {
          // console.log('this is the outputtttt');
          // console.log(output.data);
          $cookies.putObject('user', output.data);
          $scope.user=$cookies.getObject('user');
          $cookies.putObject('hideMask', false);
          $scope.loginMask = false;
          $state.go('home');
        }
      });
    } else {
      $scope.error= "Passwords do not match!"
    }
    //Clear input
    $scope.reg = {};
  }


  $scope.loginUser = function(){
    console.log('Login Button Clicked');
    console.log($scope.login);

    //call Factory method to register user
    userFactory.login($scope.login, function(output){
      console.log(output);
      console.log("Back from factory ---> finished login");

      if(output.data.error){
        $scope.error = output.data.error;
      } else {
        $cookies.putObject('user', output.data);
        $scope.user=$cookies.getObject('user');
        console.log('This is the cookied user');
        console.log($scope.user);
        $cookies.putObject('hideMask', false);
        $scope.loginMask = false;
        $state.go('home');
      }
    });
    //Clear input
    // $scope.login = {};
  }


    $scope.logout = function(){
      $cookies.remove('user');
      $cookies.remove('question');
      $cookies.remove('hideMask');
      $state.go('logReg');
    } // End Logout

});

// =========================== Home Contoller Parts ============================
app.controller('homeController', function($scope, userFactory, wallFactory, codeFactory, $cookies, $state){
  $scope.user = $cookies.getObject('user');
  $scope.newMessage = {};
  $scope.messages = [];

  var m = document.getElementById('mess');

  //this triggers the connection in our server.
  var socket = io.connect();
  socket.on('getAllMessages', function (data){
    $scope.messages = [];
    getM();
  });
  //=====================


  socket.on('refresh', function(){
    console.log('back from clear');
    $state.go('logReg');
  })


  $scope.clearWhiteboard = function(data){
    console.log('testing');
      socket.emit('clear', function(data){});
  }





  function getM(){
    wallFactory.getAllMessages(function(info_from_db){
      $scope.messages = info_from_db;
      console.log('info from db');
      console.log(info_from_db);
      top();
    });
  }

  getM();


  function top(){
    // console.log("top");
    setTimeout(function(){
      m.scrollTop=m.scrollHeight;
    }, 10)
  }


  $scope.submitNewMessage = function(){
    console.log($scope.user);
    $scope.newMessage._user = $scope.user._id;
    console.log($scope.newMessage);
    //run the factory method to save new message
    wallFactory.submitNewMessage($scope.newMessage, function(info_from_db){
      console.log('back from factory');
      console.log(info_from_db);
      $scope.messages = info_from_db;
      //comment was saved at this point
      socket.emit("updateInfo", {});
      $scope.newMessage = {};
      top();
    })
  }

  $scope.logout = function(){
    $cookies.remove('user');
    $cookies.remove('question');
    $cookies.remove('hideMask');
    $state.go('logReg');
  } // End Logout

// ==== End Live Chat ===========






  var socket = io.connect();
  socket.on('getAllCodes', function (data){
    $scope.staticCode = [];
    getC();
  });


  function getC(){
    codeFactory.getStaticCode(function(staticCode){
      $scope.staticCode = staticCode.data;
      console.log('this it the static code');
      console.log($scope.staticCode);
    })
  }

  getC();


}); //End of User Controller



// =============codeController ==============================
app.controller('codeController', function($scope, codeFactory, userFactory, wallFactory, $cookies, $location){
  $scope.coder = {};
  $scope.newCode = {};
  $scope.codes = [];

  // var code = document.getElementById('coders');
  // console.log(code);
  // this triggers the connection in our server.
  var socket = io.connect();
  socket.on('getAllCodes', function (data){
    $scope.codes = [];
    getC();
  });
  $scope.$watch("newCode.code", function(newValue, oldValue) {
     console.log("I've changed : ", newValue);
     getC();
  });
  $scope.$watch("code", function(newValue, oldValue) {
     console.log("I've changed : ", newValue);
    //  socket.emit("updateCode", {});

     getC();
  });
  function getC(){
    codeFactory.getAllCodes(function(info_from_db){
      $scope.codes = info_from_db;
      // console.log(info_from_db);
      top();
      // m.scrollTop=m.scrollHeight;
    })
  }

  getC();

  function top(){
    console.log("top");
    setTimeout(function(){
      // code.scrollTop=code.scrollHeight;
    }, 10)
  }

  $scope.submitNewCode = function(){
    // console.log(req.body);
    $scope.newCode._user = $scope.user._id;
    console.log($scope.newCode);

    //run the factory method to save new message
    codeFactory.submitNewCode($scope.newCode, function(info_from_db){
      socket.emit("updateCode", {});
      $scope.newCode = {};
      console.log('clead input');
    })
  }


  codeFactory.getStaticCode(function(staticCode){
    $scope.staticCode = staticCode;
    console.log('this it the static code');
    console.log($scope.staticCode);
  })


});
