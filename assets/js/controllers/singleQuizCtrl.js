fotoApp.controller('singleQuizCtrl', ['$scope', '$state', '$stateParams', 'auth', 'appDB',
  function ($scope, $state, $stateParams, auth, appDB) {
    $scope.selectedQuiz = $stateParams.quiz;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.author = auth.currentUser();
    $scope.commentSection = {};
    $scope.comment= '';
    $scope.lockClass = 'free';
    $scope.selectedQuiz.lock = 'free';


    quizID = $stateParams.quiz.id;
    latitude = $stateParams.quiz.locationLat;
    longitude = $stateParams.quiz.locationLng;

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
      console.log(maxScore);
    }

    // Whenever a user already guessed a quiz, then the quiz will appear grayed out (locked)
    var lockQuiz = function () {
      hasDoneQuiz(quizID, function(data) {
        if(data){
          $scope.lockClass = 'lock';
          $scope.selectedQuiz.lock = 'lock';
        }
      });
    }

    var lockAfter = function () {
      console.log("LOCK!")
      $scope.selectedQuiz.lock = 'lock';
    }

    // This function will handle the guesses aswell lock the quiz when it's done
    $scope.guessingLocation = function () {
      if (!done){
        if($scope.chanceLeft <= 1){ // any user might guess 3 times max
          score = 0;
          done = true;
          addQuizDone(quizID);
          lockQuiz();
          alert("You lose and scored " + score);
        }
        if(win){ // user guessed right, score is added and quiz is locked afterwards
          score = maxScore;
          done = true;
          addPoints(score);
          addQuizDone(quizID);
          lockQuiz();
          alert("You won and scored " + score);
        } //wrong guess, decrement the chances left and the max obtainable score
        $scope.chanceLeft = $scope.chanceLeft - 1;
        maxScore = maxScore - 20;
        score = maxScore;
      } else {
        // user finished the quiz, the quiz is now locked
        lockQuiz();
      }
    };

    // This function will handle the guesses aswell lock the quiz when it's done
    $scope.guess = function () {
      console.log("GUESS!!")
      var guessLocation = getMarkerLocation()
      var quizLocation = new google.maps.LatLng($scope.selectedQuiz.locationLat, $scope.selectedQuiz.locationLng);

      var distance = getDistance(guessLocation, quizLocation)

      if(distance < 100){
        score = maxScore;
        addPoints(score);
        addQuizDone(quizID);
        lockAfter();
        alert("You won and scored " + score);
      } else if($scope.chanceLeft <= 1){ // any user might guess 3 times max
        score = 0;
        addQuizDone(quizID);
        lockAfter();
        alert("You lose and scored " + score);
      } else {
        $scope.chanceLeft = $scope.chanceLeft - 1;
        maxScore = maxScore - 20;
        score = maxScore;
      }
      

 
    };

    $scope.resetMap = function () {
      // Since map functionalities are loaded from map.js, 
      // this little function is needed whenever the user is done with the current quiz
      // and go on the next one.
      chances = 0;
      win = false;
    }

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
        appDB.postComment($scope.author, $scope.comment, quizID).
        success(function() {
          getCommentSection(quizID);
          $scope.comment = '';
        });
        $scope.comment = ''; // in case something went wrong
      }
    };

    // If the user already answered the quiz, then lock the quiz
    lockQuiz();
    // Get comment section of the right quiz
    getCommentSection(quizID);
  }]);
