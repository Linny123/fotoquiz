fotoApp.controller('bodyCtrl', ['$scope', function ($scope) {
	$scope.$on('$stateChangeStart', function(event, toState, toParams) {
        $scope.bodyClass = toState.name + '-page';
    });
}]);