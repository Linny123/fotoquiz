fotoApp.controller('rankingCtrl', ['$scope', '$state', 'appDB',
	function ($scope, $state, appDB) {

		// Step 1: Compute ranking for every user on the server
		// Step 2: Populate table with values from user db
		
		var getAllProfiles = function () {
		appDB.getAllProfiles().success(function (profiles) {
					$scope.profiles = profiles;
			})
		};

		var computeRanking = function () {
		appDB.computeRanking().success(function (data) {
				//	evrey user in DB has an up to date rank 
				//  we can now get 
				getAllProfiles(); 
			})
		};

		computeRanking(); 
}]);
