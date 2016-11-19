fotoApp.controller('profileCtrl', ['$scope', '$stateParams', 'auth',
	function ($scope, $stateParams, auth, sightings) {
		$scope.currentUser = auth.currentUser;
}]);