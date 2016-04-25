app.directive('header', ['$location','$window',function($location,$window) {
   var HeaderDirFunction = function (scope, element, attrs) {
		scope.logout = function(){
			localStorage.clear();
    		$location.path('/login');	
		}
   } ;

  return {
  	restrict: 'E',
    templateUrl: 'scripts/module/header/header.template.html',
    link : HeaderDirFunction,

  };
}]);