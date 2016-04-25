'use strict';
/* Controllers */
app.controller('logoutController', ['$location','$scope','$window',
  function($location,$scope,$window) {
 	$window.localStorage.clear();
    $location.path('/');
  }]);
