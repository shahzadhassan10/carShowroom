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
    'addPost':function(postData){
      var defer = $q.defer();  
      $http.post('/post/addPost' , {'postData':postData}).success(function(resp){
      defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },


}});