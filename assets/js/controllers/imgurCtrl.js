fotoApp.controller('imgurCtrl',
  ['$scope', '$state', 'imgur',
  function($scope, $state, imgur){
    $scope.images = {};
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
        console.log("function call: upload");

        console.log($scope.title)
        
    };

    $scope.getImage('2kvoi3p');


    
}]);