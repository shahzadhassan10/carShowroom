var PostAdd = angular.module('PostAdd', []);

NewCarCompare.controller('PostCtrl', ['$scope', 'showRoomService', function($scope, showRoomService) {
   // used with range filter in ng-repeat to populate select values. 
   $scope.yRange = 77;
   $scope.curYear = new Date().getFullYear();
   $scope.modelYear = "";

   $scope.allMakes = [];
   $scope.make = "";

   /* 
   Get all makes from db
   */
   $scope.getAllMakes = function() {
	    showRoomService.getAllMakes().then(function(response) {
	      $scope.allMakes.push.apply($scope.allMakes, response.data);
	    });
	}();
	
   /* 
   Fired when make's value is updated on page. It fetches selected makes models from db.
   */
   $scope.makeChanged = function(){
    if($scope.make == undefined){
      console.log('make undefined.');
      $scope.allModels = [];
      $scope.model = "";

      $scope.allVersions = [];
      $scope.version = "";
    }
    else{
      $scope.getAllModels();
    }
   };

   $scope.allModels = [];
   $scope.model = "";
   /* 
   Get all models of selected make from db.
   */
   $scope.getAllModels = function() {
    showRoomService.getAllModelsByMake($scope.make).then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allModels = response.data;
      }else{
        $scope.allModels = [];
      }
      $scope.model = "";
    });
   };

   $scope.modelChanged = function(){
    console.log('model changed.');
    if($scope.model == undefined){
      $scope.allVersions = [];
      $scope.version = "";
    }
    else{
      $scope.getAllVersions();
    }
   };

   $scope.allVersions = [];
   $scope.version = "";

   $scope.getAllVersions = function() {
    showRoomService.getVersionsByMakeAndModels($scope.make, $scope.model).then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allVersions = response.data;
      }else{
        $scope.allVersions = [];
      }
      $scope.version = "";
    });
   };

   $scope.city = "";
   $scope.allCities = [];
   $scope.getAllCities = function() {
    console.log("getting all cities.");
    showRoomService.getCities().then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allCities = response.data;
        console.log('total :' + $scope.allCities);
      }
    });
   }();

   $scope.area = "";
   $scope.allAreas = [];
   $scope.cityChanged = function(){
    if($scope.city == undefined){
      console.log('city undefined.');
      $scope.allAreas = [];
      $scope.area = "";
    }
    else {
      showRoomService.getAreasByCity($scope.city).then(function(response) {
        if(response.success && response.data != null && response.data.length > 0){
          $scope.allAreas = response.data;
          $scope.area = "";
        } else {
          $scope.allAreas = [];
          $scope.area = "";
        }
      });
    }
   };

   $scope.mileage;
   $scope.price;

   $scope.engineType = "";
   $scope.allEngineTypes = [];
   $scope.getAllEngineTypes = function() {
    showRoomService.getVersionsByMakeAndModels($scope.make, $scope.model).then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allEngineTypes = response.data;
      }
      $scope.engineType = "";
    });
   };

   $scope.engineCapacity;
   $scope.transmission;

   $scope.transmissionChanged = function(){
    console.log("changed to : " + $scope.transmission);
   }

   $scope.postAdd = function(){
       if ($scope.postAddForm.$valid) {      
          //form is valid
        } else {
            //if form is not valid set $scope.addContact.submitted to true     
            $scope.postAddForm.submitted=true;    
        };
      console.log("posting form");
   }

}]);