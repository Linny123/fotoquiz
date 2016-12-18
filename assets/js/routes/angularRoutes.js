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

        .state('ranking', {
              url: '/ranking',
              templateUrl: 'templates/ranking.html'
        })

        .state('quiz', {
          url: '/quiz',
          templateUrl: 'templates/quiz.html',
          controller: 'quizCtrl'
        })

      .state('quizsearch', {
        url: '/quizsearch',
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      })

         .state('filter', {
          url: '/filter',
          templateUrl: 'templates/filter.html',
          controller: 'quizCtrl'
        })

        .state('profile', {
            cache: false,
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl',
            params: {
              username: '' // default = empty string
            },
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
