        var demoApp = angular.module('demoApp', []);
        var controllers={};
    /*    controllers.SimpleController = function ($scope) {
            $scope.customers = ['Himanshu', 'Piyush'];
        };*/

controllers.dData = function($scope, $http) {
  $http.get('/search')
      .then(function(res){
          $scope.customers = res.data;      
          console.log(res.data);
        });
}

controllers.SimpleController = function($scope, $http){
        
        
    $scope.addCustomer = function(){
        
            console.log($scope.newCustomer);
            
            $http.post("/save", $scope.newCustomer).then(function(err, res){
                if(err) console.log(err);
                    console.log(res);            
            });
            
    }
    }
    
controllers.Deleter = function($scope, $http){
        
        
    $scope.deleteCustomer = function(){
        
            console.log($scope.delCustomer);
            
            $http.post("/remove", $scope.delCustomer).then(function(err, res){
                if(err) console.log(err);
                    console.log(res);            
            });
            
    }
    }

controllers.Updater = function($scope, $http){
        
        
    $scope.upCustomer = function(){
        
            console.log($scope.delCustomer);
            
            $http.post("/update", $scope.updateCustomer).then(function(err, res){
                if(err) console.log(err);
                    console.log(res);            
            });
            
    }
    }

        demoApp.controller(controllers);
