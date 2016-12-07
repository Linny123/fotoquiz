fotoApp.controller('imgurCtrl',
  ['$scope', '$state', 'imgur',
  function($scope, $state, imgur){
    $scope.images = {};
    $scope.form = {};
    console.log("IN imgurCtrl");

    $scope.images = function() {
        console.log("function call: data");
      imgur.images("tFkhZ").error(function(error) {
        $scope.error = error;
      }).then(function(images) {
        console.log("GetImages OK");
        console.log(images.data);
        $scope.images = images.data;
      });
    };

    $scope.getImage = function(id) {
        console.log("function call: Get Image by ID: "+id);
      imgur.image(id).error(function(error) {
        $scope.error = error;
      }).then(function(image) {
        console.log("GetImage OK");
        console.log(image.data);
        $scope.imageLink = image.data;
      });
    };


    $scope.upload = function() {
        // TODO Remove this function (img upload is now handled bu quizCtrl)
        console.log("function call: upload");
        var file = document.getElementById('uploadImage').files[0]
        console.log(file)
        $scope.form.file = file
        console.log($scope.form)
        imgur.upload($scope.form).error(function(error) {
          $scope.error = error;
        }).then(function(image) {
          console.log("upload OK");
          var obj = image.data
          console.log(obj);
          $scope.imageData = obj;
        });
          
    };

    $scope.removeImage = function(id) {
      console.log("function call: remove Image by deletehash: "+id);
      imgur.remove(id).error(function(error) {
        $scope.error = error;
      }).then(function(image) {
        console.log("RemoveImage OK");
        console.log(image.data);
      });
    };


    //$scope.removeImage('CM1VAEkGAJtjzMJ');

    $scope.getImage('2kvoi3p');


    
}]);