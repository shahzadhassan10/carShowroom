carShowroom.service('showRoomService', function($http, $q) {
  return {
    'searchCar': function(make, model) {
    var defer = $q.defer();
    $http.post('/car/searchCar', {'make':make, 'model': model}).success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
    },

}});