var PostAdd = angular.module('PostAdd', []);

NewCarCompare.controller('PostCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
   $scope.yRange = 77;
   $scope.curYear = new Date().getFullYear();
   $scope.modelYear = "";
}]);