fotoApp.controller('rankingCtrl', ['$scope', '$state', 'appDB',
	function ($scope, $state, appDB) {
		// Step 1: Compute ranking for every user on the server
		var computeRanking = function () {
		appDB.computeRanking().success(function () {
				//	
			})
		};
		// Step 2: Populate table with values from user db
		var getAllProfiles = function () {
		appDB.getAllProfiles().success(function (profiles) {
					$scope.profiles = profiles;
			})
		};

		computeRanking();
		getAllProfiles();
}]);
