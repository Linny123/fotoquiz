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

        .state('comment', {
              url: '/comment', 
              templateUrl: 'templates/comment.html',
              controller: 'commentCtrl'
        })
        
        .state('nav1', {
              url: '/nav1', 
              templateUrl: 'templates/nav1.html'
        })

        .state('fotoviewer', {
              url: '/fotoviewer', 
              templateUrl: 'templates/fotoviewer.html',
              controller: 'imgurCtrl'
        })

        .state('fotouploader', {
              url: '/fotouploader', 
              templateUrl: 'templates/fotouploader.html',
              controller: 'imgurCtrl'
        })

        .state('ranking', {
              url: '/ranking', 
              templateUrl: 'templates/ranking.html'
        })

        .state('profile', {
            url: '/profile',
              templateUrl: 'templates/profile.html',
              controller: 'profileCtrl',
              resolve : {
                isLoggedIn:  function($state, $q, $timeout, auth){
                  if(!auth.isLoggedIn()){
                    $timeout(function() {
                        $state.go('home')
                      },0);
                      return $q.reject()
                  }
                }
              }
        })

});