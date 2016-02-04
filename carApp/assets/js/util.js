carShowroom.service('util', function($http, $q) {
  return {
    'getEngineTypes': function() {
    var defer = $q.defer();
    var colors=["CNG","Diesel","Hybrid","Petrol","LPG"];
    defer.resolve(colors);
    return defer.promise;
    },
    'getAllColors': function() {
    var defer = $q.defer();
    var engineTypes=["Beige","Black","Blue","Bronze","Brown","Burgundy","Gold","Green","Grey","Indigo","Magenta","Maroon",
                      "Orange","Pink","Purple","Red","Silver","Turquoise","White","Yellow","Unlisted"];
      defer.resolve(engineTypes);
    return defer.promise;
    }
}});