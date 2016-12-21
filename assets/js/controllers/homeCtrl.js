fotoApp.controller('homeCtrl', ['$scope', '$rootScope', '$state', 'auth', function($scope, $rootScope, $state, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.user = {}; // login/signup form

    // Small helper that will hide error when toggling between login and signup tab
    $scope.errorBoolean = false;
    $scope.errorHideShow = function(){
    	return $scope.errorBoolean;
    };
    $scope.toggleAction = function(){
      $scope.user = {}; // form need also to be refreshed
    	$scope.errorBoolean = false;
    };

    // Authentication: Signup
    $scope.signup = function() {
      auth.signup($scope.user).error(function(error) {
        $scope.errorBoolean = true;
        $scope.error = error;
      }).then(function() {
        $scope.user = {};
        $state.go('home');
      });
    };
	// Authentication: Login
    $scope.login = function() {
      auth.login($scope.user).error(function(error) {
        $scope.errorBoolean = true;
        $scope.error = error;
      }).then(function() {
        $scope.user = {};
        $state.go('home');
      });
    };

    // Set home background Image
    $rootScope.setBackground = function(){
    return {
            'background-image':'url(../../images/backgroundH.jpg)'
        }
    }

    // When leaving the home page remove the background image
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
        $rootScope.setBackground = function(){
        return {
          'background-image':'null'
        }
      }
    })

}]);