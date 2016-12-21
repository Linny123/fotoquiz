fotoApp.controller('quizCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.quiz = {};
    $scope.quiz.username = auth.currentUser();
    $scope.filter = {};
    $scope.lockClass = 'free';

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
            // since usere created the quiz, the quiz will be locked.
            data.lock = "lock2";
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

              lockQuiz2(data[i].id, data[i]);
              
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

    // This function tell us weither or not a quiz has been answered by the current user
    var hasDoneQuiz = function (ID , callback) {
      appDB.hasDoneQuiz(auth.currentUser(), ID).success(function (data) {
        if(callback != null){
          callback(data)
        }
      });
    };

    // Whenever a user already guessed a quiz, then the quiz will appear grayed out (locked)
    var lockQuiz2 = function (ID, item) {
      hasDoneQuiz(ID, function(data) {
        if(data){
          item.lock = 'lock2';
        } else {
          item.lock = 'free';
        }
      });
    }

    // Load all quizzes
    appDB.getQuiz().success(function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].index = i;
        console.log(data[i]);
        console.log(data[i].lock);
        lockQuiz2(data[i].id, data[i]);
      }
      $scope.quizzes = data;
    });


  }]);


