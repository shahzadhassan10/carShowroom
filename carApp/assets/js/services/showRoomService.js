carShowroom.service('showRoomService', function($http, $q) {
  return {
    'getAllMakes': function() {
    var defer = $q.defer();
    $http.get('/car/getAllMakes').success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

    'getAllModelsByMake': function(make) {
    var defer = $q.defer();
    $http.post('/car/getModelsByMake' , {'make' : make}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },
    
    'getVersionsByMakeAndModels': function(make, model) {
    var defer = $q.defer();
    $http.post('/car/getVersionsByMakeAndModels' , {'make' : make, 'model' : model}).success(function(resp){
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

}});