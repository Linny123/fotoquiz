fotoApp.controller('fbCtrl', ['$scope', '$state', '$stateParams','auth', function($scope, $state, $stateParams, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    if($stateParams.token != null){
    	auth.saveToken($stateParams.token);
        $state.go('home');
    };
}]);