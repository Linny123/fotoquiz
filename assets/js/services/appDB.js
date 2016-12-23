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

    obj.updateQuizLocation = function(quizID, lat, lng){
      console.log("-> appDB.updateQuizlocation")

      return $http({
          method: 'PUT',
          url: '/quiz/',
          params: {
            id: quizID,
            lat: lat,
            lng: lng
          },
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
      });
    };

    obj.getQuiz = function () {
      return $http.get('/quiz', 
        { headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() } });
    };


    obj.getUserQuiz = function (username) {
      return $http.get('/profile/quiz', {
        params: {
          "username": username
        },
        headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
      });
    };


    obj.removeQuiz = function (quizID, imageDeletehash) {
      return $http.delete('/profile/quiz', {
        params: {
          "id": quizID,
          "imageDeletehash" : imageDeletehash
        },
        headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
      });
    };


    obj.editUserQuiz = function(quiz){
        return $http.put('/profile/quiz', {
          params: {
            "id": quiz.id,
            "content": quiz.content
          },
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
        });
    };


	obj.getCommentSection = function (quizID) {
		return $http({
	        method: 'GET',
	        url: '/comment/',
	        params: {quizID: quizID},
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
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
    			},
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
		});
	};

  obj.addPoints = function (username, points) {
    return $http({
          method: 'PUT',
          url: '/profile/points',
          params: {
            username: username,
            points: points
          },
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };

  obj.addQuizDone = function (username, quizID) {
    return $http({
          method: 'PUT',
          url: '/profile/quizzes',
          params: {
            username: username,
            quizID: quizID
          },
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };

  obj.hasDoneQuiz = function (username, quizID) {
    return $http({
          method: 'GET',
          url: '/profile/hasdonequiz',
          params: {
            username: username,
            quizID: quizID
          },
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };


  obj.generalQuizSearch = function (general) {
    return $http.get('/quizsearch/generalQuizSearch', {
      params: {
        "general": general
      },
      headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };


  obj.generalProfileSearch = function (general) {
    return $http.get('/quizsearch/generalProfileSearch', {
      params: {
        "general": general
      },
      headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };

  obj.computeRanking = function () {
    return $http({
          method: 'PUT',
          url: '/profile/ranking/',
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };

  obj.getAllProfiles = function () {
    return $http({
          method: 'GET',
          url: '/profile/all/',
          headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }
    });
  };

	return obj;
}]);
