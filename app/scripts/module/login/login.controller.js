'use strict';
/* Controllers */
app.controller('loginController', ['$scope','$location','authenticationServices',
  function($scope,$location,authenticationServices) {
	  authenticationServices.clearCredentials();

     $scope.login = function () {
     	$scope.dataLoading = true;
        authenticationServices.Login($scope.username, $scope.password, function(response) {
        	 if(response.success) {
                    authenticationServices.setCredentials($scope.username, $scope.password);
                    $location.path('/customers');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
        });
     	
	 }
  
  }]);
