fotoApp.controller('profileCtrl', ['$scope', 'auth', 'appDB',
	function ($scope, auth, appDB) {
		$scope.bodyClass = '';
		$scope.currentUser = auth.currentUser;
		$scope.userProfile = {};
		$scope.userProfile.username = auth.currentUser() // TODO: visitor can visit a users page

		// Get profile from DB and update fields on profile page
		var getProfile = function (username) {
			appDB.getUserProfile(username)
				.success(function (profile) {
					$scope.userProfile = profile;
				})
		};
		
		// Edit profile in DB and update immediately afterwards
		$scope.editProfile = function (profile){
			appDB.editUserProfile(profile).
		    	success(function() {
		    		$scope.userProfile = profile;
	    	});
	    };

	    //Initialize the profile shown on the page
	    getProfile($scope.userProfile.username);

}]);