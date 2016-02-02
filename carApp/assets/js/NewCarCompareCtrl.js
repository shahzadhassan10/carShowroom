var NewCarCompare = angular.module('NewCarCompare', []);

NewCarCompare.controller('NewCarCompareCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
  var _ALL_MAKES = "All Makes";
  var _ALL_MODELS = "All Models";
  var _ALL_VERSIONS = "All Versions";
  var _TOTAL_SLOTS = 3;
  var _NA_STRING = "--";

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
      if(response.success && response.data != null && response.data.length > 0){
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
      if(response.success && response.data != null && response.data.length > 0){
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

  $scope.showInsufData = false;

  $scope.compareCars = function() {
    if(!valuesChanged){
      return;
    }
    valuesChanged = false;
    
    var isValid = $scope.isQueryValid();
    $scope.showInsufData = !isValid;
    
    if(isValid){
     showRoomService.getCarsByJson($scope.querries[0], $scope.querries[1], $scope.querries[2]).then(function(response) {
      $scope.newCompCars = [];
      $scope.tableHeadings = [];
      $scope.queriedOnce = true;

      if(response.success && response.data != null && response.data.length > 0){ 
        $scope.showDetails = true;
        var isSecPresent = hasValueAt(response.data, 1);
        var isThirdPresent = hasValueAt(response.data, 2);
        parseHeadings(response.data, isSecPresent, isThirdPresent);
        parseDisplayData(response.data, isSecPresent, isThirdPresent);
      } else{
        $scope.showDetails = false;
        console.log('Some error occurred.' + response.data.errormsg);
      }
     });
    }
  };
  var hasValueAt = function(data, index){
    return (data.length > index && data[index] != null);
  }
  var parseHeadings = function(cars, isSec, isThird){
    var c1m = cars[0].name;
    var c2m = isSec?cars[1].name: _NA_STRING;
    var c3m = isThird?cars[2].name: _NA_STRING;
    $scope.tableHeadings.push('Specs', c1m, c2m, c3m)
  };

  var parseDisplayData = function(cars, isSec, isThird){
    var kies = [['modelYear', 'Model Year'], 
                ['price', 'Price'], 
                ['registrationCopy', 'Registration Copy'],
                ['description', 'Description'],
                ['make', 'Make']];

    var total = kies.length;
    for (var i = 0; i < total; i++) {
      var specName = kies[i][1];
      var key = kies[i][0];
      var val1 = getNormValue(cars[0], key);
      var val2 = isSec?getNormValue(cars[1], key): _NA_STRING;
      var val3 = isThird?getNormValue(cars[2], key): _NA_STRING;
      $scope.newCompCars.push({'spec':specName, 'val1':val1, 'val2':val2, 'val3':val3});
    }
  };
  var getNormValue = function(car, key){
     var normVal = car[key]!= null?car[key]: _NA_STRING;
     return normVal;
  }

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