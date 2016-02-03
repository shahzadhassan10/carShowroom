'use strict';

var carShowroom = angular.module('carShowroom', ['NewCarCompare','PostAdd', 'ngRoute', 'ui.bootstrap']);
carShowroom.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/newCarSearch.html',
      controller: 'NewCarCtrl'
    })
    .when('/compare', {
      templateUrl: '/templates/newCarCompare.html',
      controller: 'NewCarCompareCtrl',
      caseInsensitiveMatch: true
    }).when('/postForSellCar', {
      templateUrl: '/templates/postForSellCar.html',
      controller: 'PostCtrl',
      caseInsensitiveMatch: true
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);

carShowroom.controller('NewCarCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
  $scope.allMakes = ["All Makes"];
  $scope.make = "All Makes";
  
  $scope.getAllMakes = function() {
    showRoomService.getAllMakes().then(function(response) {
      $scope.allMakes.push.apply($scope.allMakes, response.data);
    });
  }
  $scope.getAllMakes();
  
  $scope.allModels = ['All Models'];  
  $scope.model = $scope.allModels[0];

  $scope.getAllModels = function() {
    showRoomService.getAllModelsByMake($scope.make).then(function(response) {
      if(response.success){
        $scope.allModels = response.data;
      }else{
        $scope.allModels = ['All Models'];
      }
      $scope.model = $scope.allModels[0];
    });
  }; 

  $scope.makeChanged = function(){
    if($scope.make == "All Makes"){
      $scope.allModels = ['All Models'];
      $scope.model = $scope.allModels[0];
    }
    else{
      $scope.getAllModels();
    }
  };

  $scope.priceRange = [1,2,3,4,5,6, 10, 15, 20, 30, 50, 80, 100, 150, 200];
  $scope.basePrice = 100000;
  $scope.priceFrom = "From";
  $scope.priceTo = "To";

  $scope.queriedOnce = false;
  $scope.matchedCars = {}; 
  $scope.searchCars = function() {
    var queryMake = ($scope.make == "All Makes") ? '': $scope.make;
    var queryModel = ($scope.model == "All Models") ? '': $scope.model;
    var queryFrom = ($scope.priceFrom == "From") ? '': $scope.priceFrom;
    var queryTo = ($scope.priceTo == "To") ? '': $scope.priceTo;
    var qF = Number(queryFrom);
    var qT = Number(queryTo);

    if(qF>0 && qT>0 && (qF > qT) ){
      console.log("GREATER");
      var temp = queryFrom;
      queryFrom = queryTo;
      queryTo = temp;
    }

    showRoomService.getAllCarsByMakeModel(queryMake, queryModel, queryFrom, queryTo).then(function(response) {
      if(response.success){ 
        $scope.matchedCars = response.data;
        console.log('cars found :' + $scope.matchedCars.length);
      } else{
        $scope.matchedCars = {};
      }
      $scope.queriedOnce = true;
    });
  }
  
  $scope.resultFound = function(){    
    if($scope.queriedOnce){
      return $scope.matchedCars.length > 0;
    } else {
      return true;
    }
  }

  $scope.imageFound = function(){
    return false;
  }

}]);