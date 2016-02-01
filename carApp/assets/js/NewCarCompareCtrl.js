var NewCarCompare = angular.module('NewCarCompare', []);

NewCarCompare.controller('NewCarCompareCtrl', ['$scope', '$rootScope', 'showRoomService', function($scope, $rootScope, showRoomService) {
  $scope.allMakes1 = ["All Makes"];
  $scope.make1 = "All Makes";
  
  $scope.getAllMakes1 = function() {
    showRoomService.getAllMakes().then(function(response) {
      $scope.allMakes1.push.apply($scope.allMakes1, response.data);
    });
  }
  $scope.getAllMakes1();
  
  $scope.allModels1 = ['All Models'];  
  $scope.model1 = $scope.allModels1[0];

  $scope.getAllModels1 = function() {
    showRoomService.getAllModelsByMake($scope.make1).then(function(response) {
      if(response.success){
        $scope.allModels1 = response.data;
      }else{
        $scope.allModels1 = ['All Models'];
      }
      $scope.model1 = $scope.allModels1[0];
      $scope.modelChanged1();
    });
  }; 

  $scope.makeChanged1 = function(){
    if($scope.make1 == "All Makes"){
      $scope.allModels1 = ['All Models'];
      $scope.model1 = $scope.allModels1[0];
 	  $scope.modelChanged1();
    }
    else{
      $scope.getAllModels1();
    }
  };

  $scope.allVarsions1 = ['All Varsions'];
  $scope.varsion1 = $scope.allVarsions1[0];

  $scope.getAllVarsions1 = function() {
    showRoomService.getVersionsByMakeAndModels1($scope.make1, $scope.model1).then(function(response) {
      if(response.success){
        $scope.allVarsions1 = response.data;
      }else{
        $scope.allVarsions1 = ['All Varsions'];
      }
      $scope.varsion1 = $scope.allVarsions1[0];
    });
  }; 

  $scope.modelChanged1 = function(){
  	console.log('model changed. Updating versions..');
    if($scope.model1 == "All Models"){
      $scope.allVarsions1 = ['All Varsions'];
      $scope.varsion1 = $scope.allVarsions1[0];
    }
    else{
    	console.log('Getting all version.');
      $scope.getAllVarsions1();
    }
  };

 }]);