fotoApp.controller('commentCtrl', ['$scope', 'auth', 'appDB',
	function ($scope, auth, appDB) {
    	$scope.isLoggedIn = auth.isLoggedIn;
		$scope.commentSection = {};
		$scope.author = auth.currentUser();
		$scope.comment= '';

		var quizID = 'quizID'; // for now quizID is known

		// Get the comment section from DB
		var getCommentSection = function (quizID) {
			appDB.getCommentSection(quizID)
				.success(function (CS) {
					$scope.commentSection = CS;
				})
		};
		
		// Post a comment and update immediately afterwards
		$scope.postComment = function (){
			if ($scope.comment == '') {
				alert('pls write something ^^ ');
			} else {
				appDB.postComment($scope.author, $scope.comment, quizID). 
			    	success(function() {
			    		getCommentSection(quizID);
			    		$scope.comment = '';
		    	});
			   	$scope.comment = ''; // in case something went wrong
		    }
	    };

	    //Initialize the CS ; for now quizID is already known
	    // later get quizID from the quiz itself..
	    getCommentSection(quizID);

}]);