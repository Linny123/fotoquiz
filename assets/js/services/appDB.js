// This services handle communication with the server.
// Every get, post, put and delete request will be written here.

fotoApp.factory('appDB',
	['$http', '$window', 'auth', function($http, $window, auth){
	var obj = {};

	obj.getUserProfile = function (username) {
		return $http({
	        method: 'GET',
	        url: '/profile/',
	        params: {username: username},
	        headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
		});
	};

	obj.editUserProfile = function(userProfile){
		return $http({
	        method: 'PUT',
	        url: '/profile/',
	        params: {
				username: userProfile.username,
				firstName: userProfile.firstName,
				lastName: userProfile.lastName,
				email: userProfile.email
			},
	        headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
		});
	};

    obj.createQuiz = function(quiz){
		console.log("-> appDB.createQuiz")
    	console.log(quiz)

        // Transform data to formData (to send it with post)
        var formData = new FormData();
        for (var key in quiz) {
          if (quiz.hasOwnProperty(key)) {
            formData.append(key, quiz[key]);
          }
        }

      return $http.post(
      		'/quiz',
      		formData,
      		{ transformRequest: angular.identity, // So that angular does not change request
          	  headers: {'Content-Type': undefined}
        }).success(function(data){
        	console.log("-> appDB.createQuiz: succesfully added quiz: data:")
            console.log(data);
      });
    };

    obj.getQuiz = function () {
      return $http.get('/quiz');
    };


    obj.getUserQuiz = function (username) {
      return $http.get('/profile/quiz', {
        params: {
          "username": username
        }
      });
    };


    obj.removeQuiz = function (quizID) {
      return $http.delete('/profile/quiz', {
        params: {
          "id": quizID
        }
      });
    };


	obj.getCommentSection = function (quizID) {
		return $http({
	        method: 'GET',
	        url: '/comment/',
	        params: {quizID: quizID}
		});
	};

	obj.postComment = function(author, comment, quizID){
		return $http({
	        method: 'POST',
	        url: '/comment/',
	        params: {
				author: author,
				content: comment,
				quizID: quizID
			}
		});
	};

	return obj;
}]);
