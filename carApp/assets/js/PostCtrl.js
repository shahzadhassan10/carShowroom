var PostAdd = angular.module('PostAdd', []);

NewCarCompare.controller('PostCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
   $scope.years = [2016, 2015, 2014, 2013, 2012];
   $scope.modelYear = $scope.years[0];

}]);