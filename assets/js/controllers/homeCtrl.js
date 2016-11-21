fotoApp.controller('homeCtrl', ['$scope','auth', function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
}]);