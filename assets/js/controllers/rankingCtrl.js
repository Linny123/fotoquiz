fotoApp.controller('rankingCtrl', ['$scope', '$state', 'appDB',
	function ($scope, $state, appDB) {
		// Returns all profiles sorted by rank  (which is updated serverside) 
		var getAllProfiles = function () {
		appDB.getAllProfiles().success(function (profiles) {
					$scope.profiles = profiles;
			})
		};

		getAllProfiles();
}]);
