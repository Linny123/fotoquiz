fotoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        })

        .state('facebook', {
            url: '/facebook/{token}',
            templateUrl: 'templates/facebook.html',
            controller: 'fbCtrl'
        })
        
        .state('nav1', {
              url: '/nav1', 
              templateUrl: 'templates/nav1.html'
        })

        .state('nav2', {
              url: '/nav2', 
              templateUrl: 'templates/nav2.html'
        })
        
        .state('login', {
              url: '/login', 
              templateUrl: 'templates/login.html',
              controller: 'authCtrl'
        })

        .state('signup', {
              url: '/signup', 
              templateUrl: 'templates/signup.html',
              controller: 'authCtrl'
        })

        .state('profile', {
            url: '/profile',
              templateUrl: 'templates/profile.html',
              controller: 'profileCtrl'
        })

});