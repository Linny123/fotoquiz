fotoApp.controller('singleQuizCtrl', ['$scope', '$state', '$stateParams', 'auth', 'appDB',
  function ($scope, $state, $stateParams, auth, appDB) {
    $scope.selectedQuiz = $stateParams.quiz;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.commentSection = {};
    $scope.author = auth.currentUser();
    $scope.comment= '';
    $scope.lockClass = 'free';

    var quizID = $stateParams.quiz.id;

    var score = 0;
    var maxScore = 80;
    var done = false;


    var addQuizDone = function (ID) {
      appDB.addQuizDone(auth.currentUser(), ID).success(function (data) {
        //
      });
    };

    var boolHelper = false;
    var hasDoneQuiz = function (ID) {
      appDB.hasDoneQuiz(auth.currentUser(), ID).success(function (data) {
        boolHelper = data;
      });
    };

    var lockQuiz = function () {
      console.log("lockQuiz");
      console.log(boolHelper);
      hasDoneQuiz(quizID);
      console.log(boolHelper);
      if(boolHelper){
        console.log("locking");
        $scope.lockClass = 'lock';
      } else {
        console.log("free");
      }
    }

    $scope.guessingLocation = function () {
      if (!done){
        if(chances >= 3){
          score = 0;
          done = true;
          alert("You lose and scored" + score)
        }
        if(win){
          score = maxScore;
          done = true;
          alert("You won and scored" + score)
        }
        maxScore = maxScore - 20;
        score = maxScore;
      } else {
        console.log("game over");
        addQuizDone(quizID);
        lockQuiz();
      }
    }

    $scope.resetMap = function () {
      // moet want chances wordt over alle quiz gedeeld..
      chances = 0;
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
