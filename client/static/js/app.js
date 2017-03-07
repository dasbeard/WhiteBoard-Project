var app = angular.module('routerApp', ['ui.router', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/logReg');

    $stateProvider

        // LOGIN REG ===========================================================
        .state('logReg', {
            url: '/logReg',
            templateUrl: 'partials/logReg.html',
            controller: 'userController'
        })

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
          url: '/home',
          templateUrl: 'partials/home.html',
          controller: 'homeController'

        })
        // nested list with custom controller
        .state('home.main', {
            url: '/main',
            templateUrl: 'partials/home-main.html',
            controller: 'codeController'

            // controller: function($scope) {
            //     $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            // }
        })

        // nested list with just some random string data
        .state('home.otherStuff', {
            url: '/otherStuff',
            templateUrl: 'partials/home-otherStuff.html',
            controller: 'codeController'

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        // .state('about', {
        //     url: '/about',
        //     templateUrl: 'partials/about.html'
        // });

});
