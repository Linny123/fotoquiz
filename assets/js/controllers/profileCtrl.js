fotoApp.controller('profileCtrl', ['$scope', '$state', 'auth', 'appDB',
	function ($scope, $state, auth, appDB) {
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


    var getUserQuiz = function (username) {
      appDB.getUserQuiz($scope.userProfile.username).success(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].index = i;
        }
        $scope.userQuizzes = data;
      })
    };

    $scope.removeQuiz = function (data) {
      if (confirm('Do you really want to delete?')){
        appDB.removeQuiz(data.id).success(function (data) {
          $state.reload();
        });
      }
    };

	    //Initialize the profile shown on the page
	    getProfile($scope.userProfile.username);
    getUserQuiz($scope.userProfile.username);

}]);
