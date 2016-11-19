fotoApp.controller('navCtrl', ['$scope', '$state', 'auth',
	function ($scope, $state, auth) {
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logout;
}]);