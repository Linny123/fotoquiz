fotoApp.controller('quizCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.quiz = {};
    $scope.quiz.username = auth.currentUser();

    $scope.createQuiz = function () {
      if (auth.isLoggedIn()) {
        appDB.createQuiz($scope.quiz).error(function (error) {
          $scope.error = error;
        }).then(function () {
          $state.go('quiz');
        });
      }
      else {
        $state.go('home');
      }
    };

    appDB.getQuiz().success(function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      $scope.quizzes = data;
    });
  }]);
