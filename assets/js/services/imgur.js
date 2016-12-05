var ClientID = '90f58e42cf3f991';

function addImage(img){
    $.ajax({ 
        url: 'https://api.imgur.com/3/image',
        headers: {
            'Authorization': 'Client-ID ' +ClientID
        },
        type: 'POST',
        data: {
            'image': 'img'
        },
        success: function() { console.log('cool'); }
    });
};

function getImage(id){
    $.ajax({ 
        url: 'https://api.imgur.com/3/image/'+ id,
        headers: {
            'Authorization': 'Client-ID ' +ClientID
        },
        type: 'GET',
        data: {
            'image': 'img'
        },
        success: function() { console.log('cool'); }
    });
};
fotoApp.factory('imgur', 
    ['$http', '$window', function($http, $window){
    var imgur = {};
    console.log("IN imgur.js");

    imgur.displayLink = function (link){
        console.log("Received link: "+link)
    };

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

    imgur.upload = function(file) {
        console.log("IN UPLOAD function, id: "+file)

        return $http.post('/upload', { params: { "file": file } }).success(function(data){
            console.log(" SUCCESS UPLOAD FILE")
            console.log(data);
        });
    };

    return imgur;

}]);