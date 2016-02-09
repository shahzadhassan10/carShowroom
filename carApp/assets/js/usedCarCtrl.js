carShowroom.controller('usedCarCtrl', ['$scope', '$rootScope','$cookieStore','showRoomService','util', function($scope, $rootScope,$cookieStore, showRoomService,util) {
  $scope.priceRange = [1,2,3,4,5,6, 10, 15, 20, 30, 50, 80, 100, 150, 200];
  $scope.basePrice = 100000;
  $scope.CapacityBase=[];
  $scope.CapacityRange=[600,800,1000,1200,1400,1600,1800,2000,4000,6000,8000,10000];
  $scope.yRange = 77;
  $scope.curYear = new Date().getFullYear();
  $scope.colors=[];
  $scope.engineTypes=[];
  $scope.allCities = [];
  $scope.bodyTypes=[];
  $scope.allAreas = [];
  $scope.searhTerm={
        city:"",
        cityArea:"",
        name:"",
        engineType:"",
        bodyType:"",
        bodyColor:"",
        ltPrice:"",
        gtPrice:"",
        transmission:"",
        assembly:"",
        capacityFrom:"",
        capacityTo:"",
        mileageFrom:"",
        mileageTo:"",
        yearFrom:"",
        yearTo:"",
        reistrationCopy:""
  };
   util.getAllColors().then(function(response){
      $scope.colors.push.apply($scope.colors, response);
   });
   util.getEngineTypes().then(function(response){
      $scope.engineTypes.push.apply($scope.engineTypes, response);
   });
   util.getBodyTypes().then(function(response){
      $scope.bodyTypes.push.apply($scope.bodyTypes, response);
   });

   $scope.getAllCities = function() {
    console.log("getting all cities.");
    showRoomService.getCities().then(function(response) {
      if(response.success && response.data != null && response.data.length > 0){
        $scope.allCities = response.data;
      }
    });
   }();
   $scope.cityChanged = function(){
    if($scope.searhTerm.city == undefined){
      console.log('city undefined.');
      $scope.allAreas = [];
      $scope.searhTerm.cityArea = "";
    }
    else {
      showRoomService.getAreasByCity($scope.searhTerm.city).then(function(response) {
        if(response.success && response.data != null && response.data.length > 0){
          $scope.allAreas = response.data;
          $scope.searhTerm.cityArea = "";
        } else {
          $scope.allAreas = [];
          $scope.searhTerm.cityArea = "";
        }
      });
    }
   };
   $scope.show=false;
   $scope.showHide=function(){
      if($scope.show)
        $scope.show=false;
      else
        $scope.show=true;
      return $scope.show;

   };
   $scope.resultData=[];
   $scope.resultFound=true;
   $scope.searhCar=function(){
      showRoomService.searchUsedCar($scope.searhTerm).then(function(response) {
        if(response.success&&response.data.length>0){
          $scope.resultData=response.data;
          $scope.resultFound=true;
        }else{
             $scope.resultFound=false;
             alert("No found");
        }
      });
   };
  
}]);