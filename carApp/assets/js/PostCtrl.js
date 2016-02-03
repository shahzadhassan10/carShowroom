var PostAdd = angular.module('PostAdd', []);

NewCarCompare.controller('PostCtrl', ['$scope', 'showRoomService', function($scope, showRoomService) {
   $scope.yRange = 77;
   $scope.curYear = new Date().getFullYear();
   $scope.modelYear = "";

   $scope.make = "";
   $scope.allMakes = [];
   $scope.getAllMakes = function(index) {
	    showRoomService.getAllMakes().then(function(response) {
	      $scope.allMakes.push.apply($scope.allMakes.makes, response.data);
	    });
	}();

	
}]);