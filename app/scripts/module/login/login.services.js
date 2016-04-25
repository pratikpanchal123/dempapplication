'use strict';

/* Services */

app.factory('loginServices', ['$resource',
  function($resource){
    return $resource('scripts/module/login/users.json');
  }])
.factory('authenticationServices',['$location','loginServices',function($location,loginServices){
	var service = {};
	service.Login = function (username, password, callback) {
		var userdata = loginServices.get();
		userdata.$promise.then(function(data) {
			 var response = { success: username=== data.username && password === data.password };
			 if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
		});

	};
	service.setCredentials =function(username,password){
		localStorage.setItem("username", username);
		localStorage.setItem("password", username);
	};
	service.clearCredentials =function(){
		localStorage.clear();
	};
	return service;
}]); 
