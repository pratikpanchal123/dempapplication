app.controller('CustomersController', ['$scope','$window','customersService','fileUpload','$uibModal','$log', function ($scope,$window,customersService,fileUpload,$uibModal,$log) {
   
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
   
    init();

    function init() {
        $scope.customers = customersService.getCustomers();
    }
     $scope.clearInput = function(){
        $scope.search.firstName = "";
     }

    
    $scope.deleteCustomer = function (id) {
       confirmDelete = $window.confirm('Are you sure you want to delete Customer?');
       if(confirmDelete){
        customersService.deleteCustomer(id);
        $scope.alerts=[{
                             message: "Cutomer Deleted Successfully",
                            type: "success"
                    }];
       }
        
    };
    $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'scripts/module/customer/add-customer.template.html',
      controller: 'AddCustomersController',
      scope:$scope
    });

    modalInstance.result.then(function ($customers) {
       // $scope.search.firstName = "";
        var file = $customers.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/fileUpload";
        var promise =fileUpload.uploadFileToUrl(file, uploadUrl);
        promise.then(function(fileResponse){
            console.log(fileResponse);
            if(fileResponse.code === 200){
                var firstName = $customers.firstName;
                var lastName = $customers.lastName;
                var city = $customers.city;
                customersService.insertCustomer(firstName, lastName, city,fileResponse.filename); 
                $scope.alerts=[{
                             message: "Customer Added successfully",
                            type: "success"
                    }];
                    console.log($scope.alerts);
            }else{
                //error goes from here
            }
        },function(err){
            //error response                
        });
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);
app.controller('AddCustomersController', ['$scope','fileUpload','$uibModalInstance','customersService', function ($scope,fileUpload,$uibModalInstance,customersService) {
   
   $scope.ok = function () {
    var file = $scope.newCustomer.myFile;
    var fileTypeCheck = fileUpload.uploadCheck(file);
    if(fileTypeCheck){
        var extCheck = fileUpload.checkFileExt(file);
        if(extCheck){
           $uibModalInstance.close($scope.newCustomer);     
        }else{
             $scope.errorMessage = "Invalid File size. Max size is (5MB)";
        }
    }else{
        $scope.errorMessage = "Invalid File type";
    }

  };
    $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);