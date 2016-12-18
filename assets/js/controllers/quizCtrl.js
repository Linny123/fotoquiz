fotoApp.controller('quizCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.quiz = {};
    $scope.quiz.username = auth.currentUser();
    $scope.filter = {};
    $scope.selectedQuiz = {}
    //$scope.imageFile = {};

    $scope.initiateNewQuiz = function () {
      $scope.quiz = {};
      $scope.quiz.username = auth.currentUser();
      //$scope.imageFile = {};
    };

    $scope.closeFirstModal = function () {
      // var file = document.getElementById('image').files[0]
      // $scope.quiz.file = file
      // Moet dit echt hier?
    };

     $scope.selectQuiz = function (data) {
      $scope.selectedQuiz = data;
    };

    $scope.createQuiz = function () {
        var file = document.getElementById('image').files[0]
        $scope.quiz.file = file

        if (auth.isLoggedIn()) {
          appDB.createQuiz($scope.quiz).success(function (data) {
            $state.reload();
          });
        }
        else {
          $state.go('home');
        }
    };

    $scope.updateQuizLocation = function (quizID, lat, lng) {
        if (auth.isLoggedIn()) {
          appDB.updateQuizLocation(quizID, lat, lng).success(function (data) {
            console.log(data)
          });
        }
        else {
          $state.go('home');
        }
    };

    $scope.filter = function() {
      if (auth.isLoggedIn()) {
        console.log("-> in filter function")
        var address = $scope.filter.address;
        var radius = $scope.filter.range;
        var quizzesInRange = [];

        getLatLng(address, function(results) {

          appDB.getQuiz().success(function (data) {
            for (var i = 0; i < data.length; i++) {
              var latc = results.lat;
              var lngc = results.lng;
              var latp = data[i].locationLat;
              var lngp = data[i].locationLng;

              var inrange = inRange(latc, lngc, latp, lngp, radius)

              if(inrange) {
                quizzesInRange.push(data[i])
              }


            }
            $scope.quizzes = quizzesInRange;
          });
        })

      } else {
        $state.go('home');
      }

    };

    appDB.getQuiz().success(function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      $scope.quizzes = data;
    });
      //$scope.updateQuizLocation("585316cb9a8d34ec2f63ceb5", 1, 2);
  }]);


