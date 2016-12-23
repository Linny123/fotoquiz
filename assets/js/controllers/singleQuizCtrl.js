fotoApp.controller('singleQuizCtrl', ['$scope', '$state', '$stateParams', 'auth', 'appDB',
  function ($scope, $state, $stateParams, auth, appDB) {
    $scope.selectedQuiz = $stateParams.quiz;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.author = auth.currentUser();
    $scope.commentSection = {};
    $scope.comment= '';
    $scope.selectedQuiz.lock = 'free';

    var score = 0;
    var maxScore = 80;
    var done = false;
    $scope.chanceLeft = 3;
    $scope.hintBoolean = false;

    var addPoints = function (points) {
      appDB.addPoints(auth.currentUser(), points).success(function (data) {
      });
    };

    var addQuizDone = function (ID) {
      appDB.addQuizDone(auth.currentUser(), ID).success(function (data) {
      });
    };

    // This function tell us weither or not a quiz has been answered by the current user
    var hasDoneQuiz = function (ID ,callback) {
      appDB.hasDoneQuiz(auth.currentUser(), ID).success(function (data) {
        if(callback != null){
          callback(data)
        }
      });
    };

    $scope.showHint = function () {
      $scope.hintBoolean = true;
      maxScore = maxScore / 2;
    }

    // Whenever a user already guessed a quiz, then the quiz will appear grayed out (locked)
    var lockQuiz = function () {
      hasDoneQuiz($scope.selectedQuiz.id, function(hasDone) {
        if(hasDone){
          $scope.selectedQuiz.lock = 'lock';
        }
      });
    }

    var lockAfter = function () {
      $scope.selectedQuiz.lock = 'lock';
    }

    // This function will handle the guesses aswell lock the quiz when it's done
    $scope.guess = function () {
      var guessLocation = getMarkerLocation()
      var quizLocation = new google.maps.LatLng($scope.selectedQuiz.locationLat, $scope.selectedQuiz.locationLng);

      var distance = getDistance(guessLocation, quizLocation)

      if(distance < 250){
        score = maxScore;
        addPoints(score);
        addQuizDone($scope.selectedQuiz.id);
        lockAfter();
        alert("You won and scored " + score + "points!");
      } else if($scope.chanceLeft <= 1){ // any user might guess 3 times max
        score = 0;
        addQuizDone($scope.selectedQuiz.id);
        lockAfter();
        alert("You lose and scored " + score + "points!");
      } else {
        $scope.chanceLeft = $scope.chanceLeft - 1;
        maxScore = maxScore - 20;
        score = maxScore;
        alert("You missed! Try again");
      }
    
    };

    // Get the right comment section from DB
    var getCommentSection = function (quizID) {
      appDB.getCommentSection(quizID)
        .success(function (CS) {
          $scope.commentSection = CS;
        })
    };

    // Post a comment and update immediately afterwards
    $scope.postComment = function (){
      if ($scope.comment == '') {
        alert('pls write something');
      } else {
        appDB.postComment($scope.author, $scope.comment, $scope.selectedQuiz.id).
        success(function() {
          getCommentSection($scope.selectedQuiz.id);
          $scope.comment = '';
        });
        $scope.comment = ''; // in case something went wrong
      }
    };

    // If the user already answered the quiz, then lock the quiz
    lockQuiz();

    // Get comment section of the right quiz
    getCommentSection($scope.selectedQuiz.id);
  }]);
