fotoApp.controller('profileCtrl', ['$scope', '$state', '$stateParams', 'auth', 'appDB',
	function ($scope, $state, $stateParams, auth, appDB) {
		$scope.bodyClass = ''; // not necessary
		$scope.currentUser = auth.currentUser;
		$scope.userProfile = {};
    $scope.selectedQuiz = {};
    $scope.visitBoolean = false;


    // Check to see if user visits it's own profile
    if ($stateParams.username === '') {
      // No username provided so just opening his own
      $scope.userProfile.username = auth.currentUser();
    }
    else {// User can open his own profile, so we need to make sure usernames are different
      if ($stateParams.username !== auth.currentUser()) {
        $scope.visitBoolean = true;
      }
      $scope.userProfile.username = $stateParams.username;
      $stateParams.username = '';
    }

    $scope.visitMode = function(){
      return $scope.visitBoolean;
    }

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
        appDB.removeQuiz(data.id, data.imageDeletehash).success(function (data) {
          $state.reload();
        });
      }
    };

    $scope.selectQuiz = function (data) {
      $scope.selectedQuiz = data;
    };

    $scope.editUserQuiz = function (quiz) {
      $scope.selectedQuiz.content = quiz.content;
        appDB.editUserQuiz($scope.selectedQuiz).success(function () {
          $scope.selectedQuiz = {};
        });
    };

    $scope.selectQuiz = function (data) {
      $scope.selectedQuiz = data;
    };

	  //Initialize the profile shown on the page
    getProfile($scope.userProfile.username);
    getUserQuiz($scope.userProfile.username);

}]);
