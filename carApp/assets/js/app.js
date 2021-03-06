'use strict';
// Create app module and config routes. At the end Define Two controller
// named NewCarCtrl and UserCtrl
var carShowroom = angular.module('carShowroom', ['NewCarCompare','PostAdd','HomePage', 'ngRoute', 'ui.bootstrap','ngCookies']);
carShowroom.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/templates/homePage.html',
    }).when('/Login', {
      templateUrl: '/templates/Login.html',
      controller: 'UserCtrl'
    }).when('/SignUP', {
      templateUrl: '/templates/SignUP.html',
      controller: 'UserCtrl'
    })
    .when('/NewSearch', {
      templateUrl: '/templates/newCarSearch.html',
      controller: 'NewCarCtrl'
    }).when('/UsedSearch', {
      templateUrl: '/templates/searchUsedCars.html',
      controller: 'usedCarCtrl'
    }).when('/showCar/:cid', {
      templateUrl: '/templates/showCar.html',
      controller: 'showCarCtrl'
    })
    .when('/compare', {
      templateUrl: '/templates/newCarCompare.html',
      controller: 'NewCarCompareCtrl',
      caseInsensitiveMatch: true
    }).when('/postForSellCar', {
      templateUrl: '/templates/postForSellCar.html',
      controller: 'PostCtrl'
    }).when('/addNewCar', {
      templateUrl: '/templates/addNewCar.html',
      controller: 'addNewCarCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);
/////////  Define NewCarCtrl for searching new Cars.
carShowroom.controller('NewCarCtrl', ['$scope', '$rootScope','$cookieStore','showRoomService', function($scope, $rootScope,$cookieStore, showRoomService) {
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
    // call to service function to get All Cars matched criteria
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
// Define UserCtel that handles user related functionality like sign up and login
carShowroom.controller('UserCtrl', ['$scope', '$rootScope','$cookieStore','$window', 'showRoomService', function($scope, $rootScope,$cookieStore,$window, showRoomService) {
  
  $scope.user={
    email:"",
    password:"",
    name:"",
    city:"",
    address:"",
    phoneNumber:""
  };
    $scope.ch="";
    $scope.userAdd = function(){
       if ($scope.adduser.$valid) {      
          //form is valid
          $scope.adduser.submitted=false;
          //$scope. 
          console.log("user+ "+$scope.user.email);
          showRoomService.addUser($scope.user).then(function(response) {
              if(response.success){
                  $cookieStore.put('user',response.data);
                  $window.location.href = '/#/';
              }else{
                alert(response.errormsg);
              }
          });
        } else {
            //if form is not valid set $scope.addContact.submitted to true     
            $scope.adduser.submitted=true;    
        };
      console.log("posting User Form");
    };
    $scope.loginUser = function(){
       if ($scope.loguser.$valid) {      
          //form is valid
          $scope.loguser.submitted=false;
          console.log("user "+$scope.user.email);
          showRoomService.getUser($scope.user).then(function(response) {
              if(response.success){
                  $cookieStore.put('user',response.data);
                  $window.location.href = '/#/';
              }else{
                alert(response.errormsg);
              }
          });
        } else {
            //if form is not valid set $scope.addContact.submitted to true     
            $scope.loguser.submitted=true;    
        };
    console.log("posting User Form");
   };
  }]);