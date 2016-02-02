var NewCarCompare = angular.module('NewCarCompare', []);

NewCarCompare.controller('NewCarCompareCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
  var _ALL_MAKES = "All Makes";
  var _ALL_MODELS = "All Models";
  var _ALL_VERSIONS = "All Versions";
  var _TOTAL_SLOTS = 3;

  var valuesChanged = false;

  $scope.querries = [{make:_ALL_MAKES, model:_ALL_MODELS, version:_ALL_VERSIONS},
                      {make:_ALL_MAKES, model:_ALL_MODELS, version:_ALL_VERSIONS},
                      {make:_ALL_MAKES, model:_ALL_MODELS, version:_ALL_VERSIONS}];

  $scope.listData = [{makes:[_ALL_MAKES], models:[_ALL_MODELS], versions:[_ALL_VERSIONS]},
                      {makes:[_ALL_MAKES], models:[_ALL_MODELS], versions:[_ALL_VERSIONS]},
                      {makes:[_ALL_MAKES], models:[_ALL_MODELS], versions:[_ALL_VERSIONS]}];
  
  $scope.getAllMakes = function(index) {
    showRoomService.getAllMakes().then(function(response) {
      $scope.listData[index].makes.push.apply($scope.listData[index].makes, response.data);
      $scope.querries[index].make = $scope.listData[index].makes[0];
    });
  }
  var initialize = function(){
    for(var i=0; i<_TOTAL_SLOTS; i++){
      $scope.getAllMakes(i);
      $scope.querries[i].model = $scope.listData[i].models[0];    
      $scope.querries[i].version = $scope.listData[i].versions[0];
    }
  }
  initialize();

  $scope.getAllModels = function(index) {
    showRoomService.getAllModelsByMake($scope.querries[index].make).then(function(response) {
      if(response.success){
        $scope.listData[index].models = response.data;
      }else{
        $scope.listData[index].models = [_ALL_MODELS];
      }
      $scope.querries[index].model = $scope.listData[index].models[0];
      $scope.modelChanged(index);
    });
  };

  $scope.makeChanged = function(index){
    if($scope.querries[index].make == _ALL_MAKES){
      $scope.listData[index].models = [_ALL_MODELS];
      $scope.querries[index].model = $scope.listData[index].models[0];
      $scope.modelChanged(index);
    }
    else{
      $scope.getAllModels(index);
    }
    valuesChanged = true;
  };

  $scope.makeChanged = function(index){
    if($scope.querries[index].make == _ALL_MAKES){
      $scope.listData[index].models = [_ALL_MODELS];
      $scope.querries[index].model = $scope.listData[index].models[0];
 	    $scope.modelChanged(index);
    }
    else{
      $scope.getAllModels(index);
    }
    valuesChanged = true;
  };

  $scope.getAllVersions = function(index) {
    showRoomService.getVersionsByMakeAndModels($scope.querries[index].make, $scope.querries[index].model).then(function(response) {
      if(response.success){
        $scope.listData[index].versions = response.data;
      }else{
        $scope.listData[index].versions = [_ALL_VERSIONS];
      }
      $scope.querries[index].version = $scope.listData[index].versions[0];
    });
  }; 

  $scope.modelChanged = function(index){
    if($scope.querries[index].model == _ALL_MODELS){
      $scope.listData[index].versions = [_ALL_VERSIONS];
      $scope.querries[index].version = $scope.listData[index].versions[0];
    }
    else{
      $scope.getAllVersions(index);
    }
    valuesChanged = true;
  };
  
  $scope.varsionChanged = function(index){
    valuesChanged = true;
  }

  $scope.newCompCars = [];
  $scope.tableHeadings = [];
  $scope.showDetails = false;
  $scope.queriedOnce = false;

  $scope.compareCars = function() {
    if(!valuesChanged){
      return;
    }
    valuesChanged = false;
    
    var isValid = $scope.isQueryValid();
    if(isValid){
     showRoomService.getCarsByJson($scope.querries[0], $scope.querries[1], $scope.querries[2]).then(function(response) {
      $scope.newCompCars = [];
      $scope.tableHeadings = [];
      $scope.queriedOnce = true;

      if(response.success && response.data != null && response.data.length >= 1){ 
        $scope.showDetails = true;
        var isSecPresent = (response.data.length > 1 && response.data[1] != null);
        var isThirdPresent = (isSecPresent && response.data.length >2 && response.data[2] != null);
        parseHeadings(response.data, isSecPresent, isThirdPresent);
        parseDisplayData(response.data, isSecPresent, isThirdPresent);
      } else{
        $scope.showDetails = false;
        console.log('Some error occurred.' + response.data.errormsg);
      }
     });
    } else {
      $scope.showDetails = false;
   }

  };
  var parseHeadings = function(cars, isSec, isThird){
    var c1m = cars[0].make + ' ' + cars[0].model + ' ' + cars[0].version;
    var c2m = isSec?cars[1].make + ' ' +  cars[1].model + ' ' + cars[1].version: '--';
    var c3m = isThird?cars[2].make + ' ' +  cars[2].model + ' ' + cars[2].version: '--';
    $scope.tableHeadings.push('Specs', c1m, c2m, c3m)
  };

  var parseDisplayData = function(cars, isSec, isThird){
    var val2 = isSec?cars[1].modelYear:'--';
    var val3 = isThird?cars[2].modelYear:'--';
    $scope.newCompCars.push({'key':'Model Year', 'val1':cars[0].modelYear, 'val2':val2, 'val3':val3});

    var val2 = isSec?cars[1].price:'--';    
    val3 = isThird?cars[2].price:'--';
    $scope.newCompCars.push({'key':'Price', 'val1':cars[0].price, 'val2':val2, 'val3':val3});

    var val2 = isSec?cars[1].EngineDetails.engineType:'--';    
    val3 = isThird?cars[2].EngineDetails.engineType:'--';
    $scope.newCompCars.push({'key':'Engine Type', 'val1':cars[0].EngineDetails.engineType, 'val2':val2, 'val3':val3});
  };

  $scope.isQueryValid = function() {
    var sel = 0;
    sel += ($scope.querries[0].version != _ALL_VERSIONS)? 1 : 0;
    sel += ($scope.querries[1].version != _ALL_VERSIONS)? 1 : 0;
    sel += ($scope.querries[2].version != _ALL_VERSIONS)? 1 : 0;
    return (sel >= 2);     
  };

  $scope.showNotFound = function() {
    return ($scope.queriedOnce && !$scope.showDetails);
  };
 }]);