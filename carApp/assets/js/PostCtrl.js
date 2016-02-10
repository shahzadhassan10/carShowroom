var PostAdd = angular.module('PostAdd', []);

NewCarCompare.controller('PostCtrl', ['$scope', 'showRoomService','util', function($scope, showRoomService,util) {
   // used with range filter in ng-repeat to populate select values. 
   $scope.yRange = 77;
   $scope.curYear = new Date().getFullYear();
   $scope.Car={
          make:"",
          model:"",
          version:"",
          modelYear:"",
          description:"",
          price:"",
          mileage:"",
          engineType:"",
          capacity:"",
          transmission:"",
          exteriorColor:"",
          registrationCopy:"",
          assembly:"",
          city:"",
          cityArea:"",
          phoneNumber:"",
          avatar:null,
          Features: {}
   };
   $scope.allMakes = [];
   $scope.colors=[];
   $scope.engineTypes=[];
   $scope.FeaturesName=[];
   $scope.FeaturesModels=[];
   // iniatalize Components
   util.getAllColors().then(function(response){
      $scope.colors.push.apply($scope.colors, response);
   });
   util.getEngineTypes().then(function(response){
      $scope.engineTypes.push.apply($scope.engineTypes, response);
   });
   util.getAllFeatures().then(function(response){
    
      $scope.FeaturesName=response.FeaturesName;
      $scope.FeaturesModels=response.FeaturesModels;
   });
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
    console.log('make'+$scope.Car.make);
    if($scope.Car.make == undefined){
      console.log('make undefined.');
      $scope.allModels = [];
      $scope.Car.model = "";

      $scope.allVersions = [];
      $scope.Car.version = "";
    }
    else{
      $scope.getAllModels();
    }
   };

   $scope.allModels = [];
   /* 
   Get all models of selected make from db.
   */
   $scope.getAllModels = function() {
    showRoomService.getAllModelsByMake($scope.Car.make).then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allModels = response.data;
      }else{
        $scope.allModels = [];
      }
      $scope.Car.model = "";
    });
   };

   $scope.modelChanged = function(){
    console.log('model changed.');
    if($scope.Car.model == undefined){
      $scope.allVersions = [];
      $scope.Car.version = "";
    }
    else{
      $scope.getAllVersions();
    }
   };

   $scope.allVersions = [];
   $scope.getAllVersions = function() {
    showRoomService.getVersionsByMakeAndModels($scope.Car.make, $scope.Car.model).then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allVersions = response.data;
      }else{
        $scope.allVersions = [];
      }
      $scope.version = "";
    });
   };

   $scope.allCities = [];
   $scope.getAllCities = function() {
    console.log("getting all cities.");
    showRoomService.getCities().then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allCities = response.data;
      }
    });
   }();

   $scope.allAreas = [];
   $scope.cityChanged = function(){
    if($scope.Car.city == undefined){
      console.log('city undefined.');
      $scope.allAreas = [];
      $scope.Car.cityArea = "";
    }
    else {
      showRoomService.getAreasByCity($scope.Car.city).then(function(response) {
        if(response.success && response.data != null && response.data.length > 0){
          $scope.allAreas = response.data;
          $scope.Car.cityArea = "";
        } else {
          $scope.allAreas = [];
          $scope.Car.cityArea = "";
        }
      });
    }
   };
   $scope.allEngineTypes = [];
   $scope.getAllEngineTypes = function() {
    showRoomService.getVersionsByMakeAndModels($scope.Car.make, $scope.Car.model).then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allEngineTypes = response.data;
      }
      $scope.Car.engineType = "";
    });
   };

   $scope.transmissionChanged = function(){
   };

   $scope.ch="";
   $scope.postAdd = function(){
       if ($scope.postAddForm.$valid) {      
          //form is valid
          $scope.postAddForm.submitted=false; 
          console.log("car "+$scope.Car.toString());
          showRoomService.addPost($scope.Car).then(function(response) {
            if(response.success){
              alert("Added "+response.data.toString());
            }else{
              alert("Error: "+response.errormsg);
            }
          });
          //$scope. 
        } else {
            //if form is not valid set $scope.addContact.submitted to true     
            $scope.postAddForm.submitted=true;
            $scope.ch=$scope.Car.Features.airConditioner;    
        };
      console.log("posting form");
   }

}]);