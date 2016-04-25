var app = angular.module('customersApp', ['ngRoute','ngResource','ngAnimate', 'ui.bootstrap']);

app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: 'scripts/module/login/login.template.html'
            })
        .when('/customers',
            {
                controller: 'CustomersController',
                templateUrl: 'scripts/module/customer/customer.template.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/customerorders/:customerID',
            {
                controller: 'CustomerOrdersController',
                templateUrl: 'scripts/module/orders/customer-order.template.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/orders',
            {
                controller: 'OrdersController',
                templateUrl: 'scripts/module/orders/orders.template.html'
            })
         .when('/logout',
            {
                controller: 'logoutController',
                templateUrl: 'scripts/module/login/login.template.html'
            })
        .otherwise({ redirectTo: '/login' });
}]);
app.run(['$rootScope', '$location', function ($rootScope, $location) {
  
  $rootScope.$on('$routeChangeStart', function (event) {
  
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");

    if (!username ||!password ) {
     $location.path('/login');
    }else{
      $rootScope.username = username; 
    }
  });
}]);



