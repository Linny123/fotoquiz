fotoApp.controller('fbCtrl', ['$scope', '$state', '$stateParams','auth', function($scope, $state, $stateParams, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    console.log('before null');
    console.log($stateParams.token);
    console.log('<');
    if($stateParams.token != null){
    	console.log('after null');
    	console.log($stateParams.token);
    	console.log('<');
    	auth.saveToken($stateParams.token);
        $state.go('home');
    };
}]);