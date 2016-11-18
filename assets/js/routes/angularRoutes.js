fotoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        
        .state('nav1', {
              url: '/nav1', 
              templateUrl: 'templates/nav1.html'
        })

        .state('nav2', {
              url: '/nav2', 
              templateUrl: 'templates/nav2.html'
        })

});