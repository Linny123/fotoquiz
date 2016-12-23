fotoApp.controller('searchCtrl', ['$scope', '$state', '$stateParams', 'auth', 'appDB',
  function ($scope, $state, $stateParams, auth, appDB) {
    $scope.general = $stateParams.term;


    $scope.generalSearch = function () {
      $scope.generalQuizSearch();
      $scope.generalProfileSearch();
    };

    $scope.generalQuizSearch = function () {
      appDB.generalQuizSearch($scope.general).success(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].index = i;
          lockQuiz2(data[i].id, data[i]);
        }
        $scope.foundQuizzes = data;
      })
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

    $scope.generalProfileSearch = function () {
      appDB.generalProfileSearch($scope.general).success(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].index = i;
          lockQuiz2(data[i].id, data[i]);
        }
        $scope.foundProfiles = data;
      })
    };

    $scope.generalSearch();

  }]);


