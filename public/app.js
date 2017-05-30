var demoApp = angular.module('demoApp', ['ngMaterial', 'md.data.table', 'ui.router']);

demoApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller: 'dashboardcount'
        })
        
        .state('newFriends', {
            url: '/newFriends',
            templateUrl: 'newFriends.html',
            controller: 'SimpleController'
        })
        
        .state('viewFriends', {
            url: '/viewFriends',
            templateUrl: 'viewFriends.html',
            controller: 'dData'
        })
        
        .state('addNotes', {
            url: '/addNotes',
            templateUrl: 'addNotes.html',
            controller: ''
        })
        
        .state('viewNotes', {
            url: '/viewNotes',
            templateUrl: 'viewNotes.html',
            controller: ''
        })
        
});


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

controllers.dashboardcount = function($scope, $http){
        $http.get('/dashboard')
      .then(function(res){
          $scope.friendscount = res.data;      
          console.log(res.data);
        });
}

controllers.SimpleController = function($scope, $http, $mdDialog){
        
    $scope.newCustomer = {
      name: '',
      phone: '',
      email: '',
      home: '',
      face: ''
    };
    $scope.addCustomer = function(){
        
            console.log($scope.newCustomer);
            
            $http.post("/save", $scope.newCustomer).then(function(err, res){
                if(err) console.log(err);
                    console.log(res);            
            });
    $mdDialog.show(
    $mdDialog.alert()
    .title('Congratulation!')
    .content('You got a new Friend')
    .ariaLabel('Success Alert')
    .ok('Got it!')
   );
    }
    }
    
controllers.Deleter = function($scope, $http, $mdDialog){
        
        
    $scope.deleteCustomer = function(){
        var confirm = $mdDialog.confirm()
        .title('Delete this friend from your life')
        .textContent('Friend will be deleted permanently.')
        .ariaLabel('Success Alert')
        .ok('Yes')
        .cancel('No');
        
                $mdDialog.show(confirm).then(function() {
                $http.post('/remove', $scope.cust).then(function(err, res) {
                if(err) console.log(err);
                console.log(res);
                console.log("Delete delete n delelte plzzzzzzzzzz");

            
/*             $http.post("/remove", $scope.delCustomer).then(function(err, res){
                if(err) console.log(err);
                    console.log(res);            
                    });*/
            

    })
    })
    
        
    }
}
controllers.Edit = function($scope, $mdDialog){

}

controllers.Updater = function($scope, $http, $mdDialog){

    $scope.upCustomer = function(){
      $mdDialog.show({

                  clickOutsideToClose: true,
                  scope: $scope,
                  preserveScope: true,           
                  templateUrl:'/popup_edit.html',
                //   controller: 'Edit'
                  controller: function dData($scope,  $http, $mdDialog) {
                      $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    
    $scope.editData = function(){
         $http.post("/update", $scope.cust).then(function(err, res){
                     if(err) console.log(err);
                     console.log(res);
    })
    }
     /*                $http.post("/update", $scope.updateCustomer).then(function(err, res){
                     if(err) console.log(err);
                     console.log(res);            
            });
     */                }
                  })
            //   })
    //  $mdDialog.show({
    // //   controller: DialogController,
    //   templateUrl: 'dialog1.tmpl.html',
    // //   parent: angular.element(document.body),
    // //   targetEvent: ev,
    //   clickOutsideToClose:true
    // //   fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    // })  
            // console.log($scope.delCustomer);
            
/*            $http.post("/update", $scope.updateCustomer).then(function(err, res){
                if(err) console.log(err);
                    console.log(res);            
            });*/
    }
    }

        demoApp.controller(controllers);