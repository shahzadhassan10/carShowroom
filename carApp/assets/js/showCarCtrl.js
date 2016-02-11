carShowroom.controller('showCarCtrl', ['$scope','$route','$routeParams','$cookieStore','showRoomService', function($scope,$route,$routeParams,$cookieStore,showRoomService){
	$scope.car={};
  $scope.images=['00b39c69-0020-43ad-a314-7f3d1b7775bc.jpg','87b3165c-02f0-4783-91f9-0cbddb7f30ed.jpg',
  'b848d57a-49e1-468d-a1f1-bf1e2174ce4c.jpg'];
	$scope.error=false;
	showRoomService.getCarById($routeParams.cid).then(function(res){
		if(res.success){
			$scope.car=res.data;
		}else{

			$scope.error=res.errormsg;
			alert($scope.error);
		}
	});
	$scope.isObject = function(value) {
        return angular.isObject(value);
    };
    $scope.label="More Details";
    $scope.show=false;
   $scope.showHide=function(){
      if($scope.show){
        $scope.show=false;
        $scope.label="More Details";
    }else{
        $scope.show=true;
        $scope.label="Less Details";
    }
      return $scope.show;

   };
   $scope.labelF="More Details";
    $scope.showF=false;
   $scope.showHideF=function(){
      if($scope.showF){
        $scope.showF=false;
        $scope.labelF="More Details";
    }else{
        $scope.showF=true;
        $scope.labelF="Less Details";
    }
      return $scope.showF;

   };

}]);