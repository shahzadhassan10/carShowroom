var HomePage = angular.module('HomePage', []);

HomePage.controller('NavCtrl', ['$scope','$cookieStore','showRoomService', function($scope,$cookieStore,showRoomService){
	$scope.selTab = 0;
	$scope.users;
	
	$scope.tabClick = function(tab) {
		$scope.selTab = tab;
	}

	$scope.isActive = function(tab){
		return $scope.selTab == tab; 
	}
	$scope.isUser=function(){
		if($cookieStore.get('user'))
		{
			return true;
		}else
			return false;
	};
	$scope.isAdmin=function(){
		if($cookieStore.get('user')=='Admin')
		{
			return true;
		}else
			return false;
	};
	$scope.logout=function(){
      showRoomService.logout().then(function(res){
        if(res.success)
          $cookieStore.remove('user');
        else
          alert('logout failed');

      })
       
   };



}]);