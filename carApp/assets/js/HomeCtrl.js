var HomePage = angular.module('HomePage', []);

HomePage.controller('NavCtrl', ['$scope', function($scope){
	$scope.selTab = 0;
	$scope.users;
	
	$scope.tabClick = function(tab) {
		$scope.selTab = tab;
	}

	$scope.isActive = function(tab){
		return $scope.selTab == tab; 
	}
	$scope.isUser=function(){
		if($scope.users&&$scope.users.attr=='user')
		{
			return true;
		}else
			return false;
	};
	$scope.isAdmin=function(){
		if($scope.users&&$scope.users.role=='admin')
		{
			return true;
		}else
			return false;
	};
	$scope.user={};
  	$scope.ch="";
   	$scope.userAdd = function(){
       if ($scope.adduser.$valid) {      
          //form is valid
          $scope.adduser.submitted=false;
          //$scope. 
          console.log("user+ "+$scope.user);
        } else {
            //if form is not valid set $scope.addContact.submitted to true     
            $scope.adduser.submitted=true;    
        };
      console.log("posting Car Form");
   	};
   	$scope.loginUser = function(){
       if ($scope.loguser.$valid) {      
          //form is valid
          $scope.loguser.submitted=false;
          $scope.users.attr="user";
          console.log("user+ "+$scope.user);
        } else {
            //if form is not valid set $scope.addContact.submitted to true     
            $scope.loguser.submitted=true;    
        };
    console.log("posting Car Form");
   }


}]);