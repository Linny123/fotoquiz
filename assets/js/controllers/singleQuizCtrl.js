fotoApp.controller('singleQuizCtrl', ['$scope', '$state', '$stateParams', 'auth', 'appDB',
  function ($scope, $state, $stateParams, auth, appDB) {
    $scope.selectedQuiz = $stateParams.quiz;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.commentSection = {};
    $scope.author = auth.currentUser();
    $scope.comment= '';
    $scope.lockClass = 'free';

    quizID = $stateParams.quiz.id;


    var score = 0;
    var maxScore = 80;
    var done = false;
    var quizChance = 1;

    var addPoints = function (points) {
      appDB.addPoints(auth.currentUser(), points).success(function (data) {
      });
    };

    var addQuizDone = function (ID) {
      appDB.addQuizDone(auth.currentUser(), ID).success(function (data) {
        //
      });
    };

    var hasDoneQuiz = function (ID ,callback) {
      appDB.hasDoneQuiz(auth.currentUser(), ID).success(function (data) {
        if(callback != null){
          callback(data)
        }
      });
    };

    var lockQuiz = function () {
      hasDoneQuiz(quizID, function(data) {
        if(data){
          $scope.lockClass = 'lock';
        }
      });
    }

    $scope.guessingLocation = function () {
      if (!done){
        if(quizChance >= 3){
          score = 0;
          done = true;
          alert("You lose and scored" + score);
          addQuizDone(quizID);
          lockQuiz();
        }
        if(win){
          score = maxScore;
          done = true;
          addPoints(score);
          alert("You won and scored" + score);
          addQuizDone(quizID);
          lockQuiz();
        }
        quizChance = quizChance + 1;
        maxScore = maxScore - 20;
        score = maxScore;
        if(quizChance >= 3){
          lockQuiz();
        }
      } else {
        lockQuiz();
      }
    };

    $scope.resetMap = function () {
      // moet want chances wordt over alle quiz gedeeld..
      chances = 0;
      win = false;
    }

    // Get the comment section from DB
    var getCommentSection = function (quizID) {
      appDB.getCommentSection(quizID)
        .success(function (CS) {
          $scope.commentSection = CS;
        })
    };

    // Post a comment and update immediately afterwards
    $scope.postComment = function (){
      if ($scope.comment == '') {
        alert('pls write something ^^ ');
      } else {
        appDB.postComment($scope.author, $scope.comment, quizID).
        success(function() {
          getCommentSection(quizID);
          $scope.comment = '';
        });
        $scope.comment = ''; // in case something went wrong
      }
    };

    //Initialize the CS ; for now quizID is already known
    // later get quizID from the quiz itself..
    lockQuiz();
    getCommentSection(quizID);

  }]);
