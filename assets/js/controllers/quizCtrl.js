fotoApp.controller('quizCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.quiz = {};
    $scope.quiz.username = auth.currentUser();

    $scope.initiateNewQuiz = function () {
      $scope.quiz = {};
      $scope.quiz.username = auth.currentUser();
    };

    $scope.closeFirstModal = function () {
        var file = document.getElementById('image').files[0]
        console.log(file)
        $scope.quiz.file = file
    };

    $scope.createQuiz = function () {
        if (auth.isLoggedIn()) {
          appDB.createQuiz($scope.quiz).success(function (data) {
            $state.reload();
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
