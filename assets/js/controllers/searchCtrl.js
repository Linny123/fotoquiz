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
        }
        $scope.foundQuizzes = data;
      })
    };

    $scope.generalProfileSearch = function () {
      appDB.generalProfileSearch($scope.general).success(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].index = i;
        }
        $scope.foundProfiles = data;
      })
    };

    $scope.generalSearch();

  }]);


