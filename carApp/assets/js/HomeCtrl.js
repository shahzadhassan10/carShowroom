var HomePage = angular.module('HomePage', []);

HomePage.controller('NavCtrl', ['$scope', function($scope){
	$scope.selTab = 0;
	$scope.tabClick = function(tab) {
		$scope.selTab = tab;
	}

	$scope.isActive = function(tab){
		return $scope.selTab == tab; 
	}
}]);