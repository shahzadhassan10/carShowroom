var NewCarCompare = angular.module('NewCarCompare', []);

NewCarCompare.controller('NewCarCompareCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
  var _ALL_MAKES = "All Makes";
  var _ALL_MODELS = "All Models";
  var _ALL_VERSIONS = "All Versions";
  var valuesChanged = false;

  $scope.query1 = {make:_ALL_MAKES, model:_ALL_MODELS, version:_ALL_VERSIONS};
  
  $scope.allMakes1 = [_ALL_MAKES];
  
  $scope.getAllMakes1 = function() {
    showRoomService.getAllMakes().then(function(response) {
      $scope.allMakes1.push.apply($scope.allMakes1, response.data);
    });
  }
  $scope.getAllMakes1();
  
  $scope.allModels1 = [_ALL_MODELS];  
  $scope.query1.model = $scope.allModels1[0];

  $scope.getAllModels1 = function() {
    showRoomService.getAllModelsByMake($scope.query1.make).then(function(response) {
      if(response.success){
        $scope.allModels1 = response.data;
      }else{
        $scope.allModels1 = [_ALL_MODELS];
      }
      $scope.query1.model = $scope.allModels1[0];
      $scope.modelChanged1();
    });
  };

  $scope.makeChanged1 = function(){
    if($scope.query1.make == _ALL_MAKES){
      $scope.allModels1 = [_ALL_MODELS];
      $scope.query1.model = $scope.allModels1[0];
 	  $scope.modelChanged1();
    }
    else{
      $scope.getAllModels1();
    }
    valuesChanged = true;
  };

  $scope.allVersions1 = [_ALL_VERSIONS];
  $scope.query1.version = $scope.allVersions1[0];

  $scope.getAllVersions1 = function() {
    showRoomService.getVersionsByMakeAndModels($scope.query1.make, $scope.query1.model).then(function(response) {
      if(response.success){
        $scope.allVersions1 = response.data;
      }else{
        $scope.allVersions1 = [_ALL_VERSIONS];
      }
      $scope.query1.version = $scope.allVersions1[0];
    });
  }; 

  $scope.modelChanged1 = function(){
    if($scope.query1.model == _ALL_MODELS){
      $scope.allVersions1 = [_ALL_VERSIONS];
      $scope.query1.version = $scope.allVersions1[0];
    }
    else{
      $scope.getAllVersions1();
    }
    valuesChanged = true;
  };
//--------------------------------------------------------------- 2
  $scope.query2 = {make:_ALL_MAKES, model:_ALL_MODELS, version:_ALL_VERSIONS};

  $scope.allMakes2 = [_ALL_MAKES];  
  $scope.getAllMakes2 = function() {
    showRoomService.getAllMakes().then(function(response) {
      $scope.allMakes2.push.apply($scope.allMakes2, response.data);
    });
  }
  $scope.getAllMakes2();
  
  $scope.allModels2 = [_ALL_MODELS];  
  $scope.query2.model = $scope.allModels2[0];
  $scope.getAllModels2 = function() {
    showRoomService.getAllModelsByMake($scope.query2.make).then(function(response) {
      if(response.success){
        $scope.allModels2 = response.data;
      }else{
        $scope.allModels2 = [_ALL_MODELS];
      }
      $scope.query2.model = $scope.allModels2[0];
      $scope.modelChanged2();
    });
  }; 

  $scope.makeChanged2 = function(){
    if($scope.query2.make == _ALL_MAKES){
      $scope.allModels2 = [_ALL_MODELS];
      $scope.query2.model = $scope.allModels2[0];
      $scope.modelChanged2();
    }
    else{
      $scope.getAllModels2();
    }
    valuesChanged = true;
  };

  $scope.allVersions2 = [_ALL_VERSIONS];
  $scope.query2.version = $scope.allVersions2[0];

  $scope.getAllVersions2 = function() {
    showRoomService.getVersionsByMakeAndModels($scope.query2.make, $scope.query2.model).then(function(response) {
      if(response.success){
        $scope.allVersions2 = response.data;
      }else{
        $scope.allVersions2 = [_ALL_VERSIONS];
      }
      $scope.query2.version = $scope.allVersions2[0];
    });
  }; 

  $scope.modelChanged2 = function(){
    if($scope.query2.model == _ALL_MODELS){
      $scope.allVersions2 = [_ALL_VERSIONS];
      $scope.query2.version = $scope.allVersions2[0];
    }
    else{
      $scope.getAllVersions2();
    }
    valuesChanged = true;
  };
//----------------------------------------------------- 3
  $scope.query3 = {make:_ALL_MAKES, model:_ALL_MODELS, version:_ALL_VERSIONS};

  $scope.allMakes3 = [_ALL_MAKES];  
  $scope.getAllMakes3 = function() {
    showRoomService.getAllMakes().then(function(response) {
      $scope.allMakes3.push.apply($scope.allMakes3, response.data);
    });
  }
  $scope.getAllMakes3();
  
  $scope.allModels3 = [_ALL_MODELS];  
  $scope.query3.model = $scope.allModels3[0];

  $scope.getAllModels3 = function() {
    showRoomService.getAllModelsByMake($scope.query3.make).then(function(response) {
      if(response.success){
        $scope.allModels3 = response.data;
      }else{
        $scope.allModels3 = [_ALL_MODELS];
      }
      $scope.query3.model = $scope.allModels3[0];
      $scope.modelChanged3();
    });
  }; 

  $scope.makeChanged3 = function(){
    if($scope.query3.make == _ALL_MAKES){
      $scope.allModels3 = [_ALL_MODELS];
      $scope.query3.model = $scope.allModels3[0];
    $scope.modelChanged3();
    }
    else{
      $scope.getAllModels3();
    }
    valuesChanged = true;
  };

  $scope.allVersions3 = [_ALL_VERSIONS];
  $scope.query3.version = $scope.allVersions3[0];

  $scope.getAllVersions3 = function() {
    showRoomService.getVersionsByMakeAndModels($scope.query3.make, $scope.query3.model).then(function(response) {
      if(response.success){
        $scope.allVersions3 = response.data;
      }else{
        $scope.allVersions3 = [_ALL_VERSIONS];
      }
      $scope.query3.version = $scope.allVersions3[0];
    });
  }; 

  $scope.modelChanged3 = function(){
    if($scope.query3.model == _ALL_MODELS){
      $scope.allVersions3 = [_ALL_VERSIONS];
      $scope.query3.version = $scope.allVersions3[0];
    }
    else{
      $scope.getAllVersions3();
    }
    valuesChanged = true;
  };
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
     showRoomService.getCarsByJson($scope.query1, $scope.query2, $scope.query3).then(function(response) {
      $scope.newCompCars = [];
      $scope.tableHeadings = [];
      $scope.queriedOnce = true;

      if(response.success && response.data != null && response.data.length >= 1){ 
        $scope.showDetails = true;
        var isSecPresent = (response.data.length > 1 && response.data[1] != null);
        var isThirdPresent = (response.data.length >2 && response.data[2] != null);
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
  }
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
  }

  $scope.isQueryValid = function() {
    var sel = 0;
    sel += ($scope.query1.make != _ALL_MAKES)? 1 : 0;
    sel += ($scope.query2.make != _ALL_MAKES)? 1 : 0;
    sel += ($scope.query3.make != _ALL_MAKES)? 1 : 0;
    if(sel >= 2){
      sel = 0;
      sel += ($scope.query1.model != _ALL_MODELS)? 1 : 0;
      sel += ($scope.query2.model != _ALL_MODELS)? 1 : 0;
      sel += ($scope.query3.model != _ALL_MODELS)? 1 : 0;
      if(sel >= 2){
        sel = 0;
        sel += ($scope.query1.version != _ALL_VERSIONS)? 1 : 0;
        sel += ($scope.query2.version != _ALL_VERSIONS)? 1 : 0;
        sel += ($scope.query3.version != _ALL_VERSIONS)? 1 : 0;
        return (sel >= 2);     
      }
    }
    return false;
  };

  $scope.showNotFound = function() {
    return ($scope.queriedOnce && !$scope.showDetails);
  };
 }]);