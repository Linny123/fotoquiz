fotoApp.controller('quizCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.quiz = {};
    $scope.quiz.username = auth.currentUser();
    $scope.filter = {};
    $scope.selectedQuiz = {}


    $scope.closeFirstModal = function () {
        var file = document.getElementById('image').files[0]
        if(file == null) {
          alert("No image selected! Please select an image of a location.")
        } else {
          $scope.createQuiz();
        }
    };

    $scope.createQuiz = function () {
      console.log("IN CREATE QUIZ!!!!")
        var file = document.getElementById('image').files[0]
        $scope.quiz.file = file

        if (auth.isLoggedIn()) {
          appDB.createQuiz($scope.quiz).success(function (data) {
            showModal("secondPostingModal");
            //$state.reload();
            quizID = data.id;
            latitude = data.locationLat;
            longitude = data.locationLng;
            $scope.quiz = data;
            
          });

        }
        else {
          $state.go('home');
        }
    };

    $scope.finalizeQuiz = function() {
      console.log("FINALIZE!!!!");
      console.log(latitude);
      console.log(longitude);
      console.log(newQuizMarker.getPosition().lat());
      console.log(newQuizMarker.getPosition().lng());
      $scope.updateQuizLocation($scope.quiz.id, newQuizMarker.getPosition().lat(), newQuizMarker.getPosition().lng());
      $scope.quiz = {};
      $scope.quiz.username = auth.currentUser(); // reset input
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
        var radius = 30; // We use 30km as a radius (so that users cant find the exact location)
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

    $scope.removeFilter = function() {
      $state.reload();
    };

    appDB.getQuiz().success(function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      $scope.quizzes = data;
    });
      //$scope.updateQuizLocation("585316cb9a8d34ec2f63ceb5", 1, 2);
  }]);


