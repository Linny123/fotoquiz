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


        .state('ranking', {
              url: '/ranking',
              templateUrl: 'templates/ranking.html'
        })

        .state('quiz', {
          url: '/quiz',
          templateUrl: 'templates/quiz.html',
          controller: 'quizCtrl'
        })

        .state('singleQuiz', {
          url: '/singleQuiz',
          params: {
            quiz: ''
          },
          templateUrl: 'templates/singlequiz.html',
          controller: 'singleQuizCtrl'
        })

      .state('quizsearch', {
        url: '/quizsearch',
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      })

      .state('profile', {
        cache: false,
        url: '/profile',
        params: {
          username: '' // default = empty string
        },
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
