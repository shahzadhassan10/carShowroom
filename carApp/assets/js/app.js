'use strict';

var carShowroom = angular.module('carShowroom', ['ngRoute', 'ui.bootstrap']);
carShowroom.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/newCarSearch.html',
      controller: 'NewCarCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);

carShowroom.controller('NewCarCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
  $scope.allMake = [{make: "All"}];
  $scope.make = "All";
  
  $scope.getAllMakes = function() {
    showRoomService.searchCar('').then(function(response) {
      console.log(response.data);
      $scope.allMake.push.apply($scope.allMake, response.data);
    });
  }
  $scope.getAllMakes();
  
  $scope.allModel = [];  
  $scope.getAllModels = function() {
    $scope.allModel = [];
    if($scope.make == "All"){
      $scope.allModel.push('All');
    }
    else{
      console.log("else");
      for(var i=0; i<$scope.allMake.length; i++){        
         if($scope.make == $scope.allMake[i].make){
          $scope.allModel.push($scope.allMake[i].model);     
         }
      }
    }
    $scope.model = $scope.allModel[0];
  }; 
  
  $scope.getAllModels();
  $scope.makeChanged = function(){
    console.log("changed.");
    $scope.getAllModels();
  };

  $scope.matchedCars = {}; 
  $scope.searchCar = function() {
    var queryMake = ($scope.make == "All") ? '': $scope.make;
    var queryModel = ($scope.model == "All") ? '': $scope.model;

    showRoomService.searchCar(queryMake, queryModel).then(function(response) {
      $scope.matchedCars = response.data;
    });
  }
}]);