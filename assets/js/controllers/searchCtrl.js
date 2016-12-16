fotoApp.controller('searchCtrl', ['$scope', '$state', 'auth', 'appDB',
  function ($scope, $state, auth, appDB) {
    $scope.general = '';
    $scope.advanced = {};
    $scope.advanced.author = '';
    $scope.advanced.content = '';


    $scope.generalSearch = function () {
      appDB.generalSearch($scope.general).success(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].index = i;
        }
        $scope.foundQuizzes = data;
      })
    };

    $scope.advancedSearch = function () {
        appDB.advancedSearch($scope.advanced).success(function (data) {
          for (var i = 0; i < data.length; i++) {
            data[i].index = i;
          }
          $scope.foundQuizzes = data;
        });
    };

  }]);


