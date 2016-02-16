// Custom directive for file upload
carShowroom.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
// CarServices contains function about CarModels and Posts
carShowroom.service('showRoomService', function($http, $q) {
  return {
    'getAllMakes': function() {
    var defer = $q.defer();
    $http.get('/make/getAllMakes').success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getAllModelsByMake': function(make) {
    var defer = $q.defer();
    $http.post('/make/getModelsByMake' , {'make' : make}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },
    
    'getVersionsByMakeAndModels': function(make, model) {
    var defer = $q.defer();

    $http.post('/make/getVersionsByMakeAndModels' , {'make' : make, 'model' : model}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getAllCarsByMakeModel': function(make, model, pFrom, pTo) {
    var defer = $q.defer();  
    $http.post('/car/searchCar' , {'make':make, 'model':model, 'gtPrice':pFrom, 'ltPrice':pTo}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getCarsByJson': function(carObj1, carObj2, carObj3) {
    var defer = $q.defer();  
    $http.post('/car/getCarsByJson' , {'info' : {carObj1, carObj2, carObj3}}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getCities': function() {
    var defer = $q.defer();  
    $http.get('/city/getAllCities').success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getAreasByCity': function(city) {
    var defer = $q.defer();  
    $http.post('/city/getAllCityAreaByCity', {'city' : city}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getEngineTypes': function(city) {
    var defer = $q.defer();  
    $http.post('/city/getAllCityAreaByCity', {'city' : city}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },
    'addPost':function(postData,file){
      var defer = $q.defer();
      var fd = new FormData();
      for (key in postData ) {
        if(angular.isObject(postData[key])){
          for(key2 in postData[key]){
            fd.append(key2, postData[key][key2]);
          }
        }else{
            fd.append(key, postData[key]);
        }
      }
      fd.append('file', file);
      $http.post('/post/addPost' , fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
      }).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addCar':function(carData,file){
      var defer = $q.defer(); 
      var fd = new FormData();
      for (key in carData ) {
        if(angular.isObject(carData[key])){
          for(key2 in carData[key]){
            console.log(" "+key2);
            fd.append(key2, carData[key][key2]);
          }
        }else{
            fd.append(key, carData[key]);
        }
      }
      fd.append('file', file);
      $http.post('/car/addCar', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },

    'getUser':function(user){
      console.log("user "+user.password);
      var defer = $q.defer();  
      $http.post('/user/loginUser' , {'userData':user}).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'logout':function(){
      var defer = $q.defer();  
      $http.get('/user/logout').success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addUser':function(user){
      console.log("user "+user.email);
      var defer = $q.defer();  
      $http.post('/user/addUser' , {'userInfo':user}).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'searchUsedCar':function(srchTerm){
      var defer = $q.defer();  
      $http.post('/post/getPostByCity' , {'search':srchTerm}).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getCarById':function(id1){
      var defer = $q.defer();  
      $http.get('/car/getCar',{params: { id:id1 }}).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }


}});