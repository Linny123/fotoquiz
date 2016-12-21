fotoApp.controller('quizCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.quiz = {};
    $scope.quiz.username = auth.currentUser();
    $scope.filter = {};


    $scope.closeFirstModal = function () {
        var file = document.getElementById('image').files[0]
        if(file == null) {
          alert("No image selected! Please select an image of a location.")
        } else {
          $scope.createQuiz();
          showProgressBar();
        }
    };

    $scope.createQuiz = function () {
      console.log("IN CREATE QUIZ!!!!")
        var file = document.getElementById('image').files[0]
        $scope.quiz.file = file

        if (auth.isLoggedIn()) {
          appDB.createQuiz($scope.quiz).success(function (data) {
            showModal("secondPostingModal");

            $scope.quiz = data;
            appDB.addQuizDone($scope.quiz.username, $scope.quiz.id).success(function (data) {}); // Lock quiz for creator of quiz
            // Load map AFTER the second model has been completely shown, only then will the map display correctly
            $('#secondPostingModal').on('shown.bs.modal', function () {
               loadMap($scope.quiz.locationLat, $scope.quiz.locationLng);
            });
            
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
    };

    $scope.updateQuizLocation = function (quizID, lat, lng) {
        if (auth.isLoggedIn()) {
          appDB.updateQuizLocation(quizID, lat, lng).success(function (data) {
            //console.log(data)
            $scope.quizzes.push(data); // Add new quiz to quizzes
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

    // Load all quizzes
    appDB.getQuiz().success(function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      $scope.quizzes = data;
    });
  }]);


