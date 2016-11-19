fotoApp.controller('authCtrl',
  ['$scope', '$state', 'auth',
  function($scope, $state, auth){
    $scope.user = {};

    // How to handle a user signing up
    $scope.signup = function() {
      auth.signup($scope.user).error(function(error) {
        // If error show it on the page
        $scope.error = error;
      }).then(function() {
        // When done go to the "Ufo Sightings" page
        $state.go('profile');
      });
    };

    // How to handle a user logging in
    $scope.login = function() {
      auth.login($scope.user).error(function(error) {
        // If error show it on the page
        $scope.error = error;
      }).then(function successCallback() {
        // When done go to the "Ufo Sightings" page
        $state.go('profile');
      });
    };
}]);