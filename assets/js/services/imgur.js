fotoApp.factory('imgur', 
    ['$http', '$window', function($http, $window){
    var imgur = {};
    console.log("IN imgur.js");

    imgur.images = function(album_id) {
        console.log("IN imgur.images function, id: "+album_id)

        return $http.get('/getimages', { params: { "album_id": album_id } }).success(function(data){
            console.log(" SUCCESS imgur.images")
            console.log(data);
        });
    };

    imgur.image = function(id) {
        console.log("IN imgur.image function, id: "+id)

        return $http.get('/getimage', { params: { "id": id } }).success(function(data){
            console.log(" SUCCESS imgur.image")
            console.log(data);
        });
    };

    imgur.upload = function(form) {
        // TODO Remove this function (img upload is now handled bu quizCtrl)
        console.log("IN UPLOAD function, id: "+form.description)

        var formData = new FormData();

        // Transform data to formData (to send it with post)
        for (var key in form) {
          if (form.hasOwnProperty(key)) {
            formData.append(key, form[key]);
          }
        }

        return $http.post('/uploadQuiz', formData, {
                               transformRequest: angular.identity,
                               headers: {'Content-Type': undefined}
                            }).success(function(data){
            console.log(" SUCCESS UPLOAD FILE")
            console.log(data);
        });
    };

    imgur.remove = function(id) {
        console.log("IN REMOVE function, id: "+id)

        return $http.post('/removeImage', { params: { "imageDeletehash": id } }).success(function(data){
            console.log(" SUCCESS REMOVE FILE")
            console.log(data);
        });
    };

    return imgur;

}]);