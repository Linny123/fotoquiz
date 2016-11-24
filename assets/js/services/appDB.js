// This services handle communication with the server.
// Every get, post, put and delete request will be written here.

fotoApp.factory('appDB', 
	['$http', '$window', function($http, $window){
	var obj = {};

	obj.getUserProfile = function (username) {
		return $http.get('/profile/', {
			params: {
				"username": username
			}
		});
	};

	obj.editUserProfile = function(userProfile){
	return $http.put('/profile', {
			params: {
				"username": userProfile.username,
				"firstName": userProfile.firstName,
				"lastName": userProfile.lastName,
				"email": userProfile.email
			}
		});
	};
	
	return obj;
}]);