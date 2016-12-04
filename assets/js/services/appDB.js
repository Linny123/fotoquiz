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
	
	return obj;
}]);