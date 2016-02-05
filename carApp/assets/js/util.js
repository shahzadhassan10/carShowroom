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
    var engineTypes=["Beige","Black","Blue","Bronze","Brown","Burgundy","Gold","Green","Grey",
    "Indigo","Magenta","Maroon",
    "Orange","Pink","Purple","Red","Silver","Turquoise","White","Yellow","Unlisted"];
      defer.resolve(engineTypes);
    return defer.promise;
    },
    'getBodyTypes': function() {
    var defer = $q.defer();
    var bodyTypes=["4x4","Compact crossover","Compact hatchback","Compact sedan","Convertible","Coupe","Hatchback","Micro Van","Mini Vehicles",
    "MPV","Off-Road Vehicles","Sedan",
    "Subcompact hatchback","SUV","Truck","Van","Wagon","Turquoise","White","Yellow","Unlisted"];
      defer.resolve(bodyTypes);
    return defer.promise;
    },
    'getAllFeatures':function(){
      var defer = $q.defer();
      var FeaturesData={
        FeaturesName:["Air Conditioner","power Windows","power Steering","AntiLock BrakingSystem",
      "Air Bags","Leather Seats","Cruise Control","Keyless Entry","CD Player","Power DoorLocks",
      'Traction Control',"Immobilizer","Cup Holders","Folding Rear Seat","Rear WashWiper",
      "Alloy Wheels","Tubeless Tyres","Central Locking","Remote BootFuelLid","Steering Adjustment",
      "Tachometer","Front FogLights","Rear Defroster","Defogger","Power Seats",'AM/FM Radio',
      "Cassette Player","Sun Roof",'Cool Box','DVD Player'],
      /*Features:{airConditioner:false,powerWindows:false,powerSteering:false,
        antiLockBrakingSystem:false,
      airBags:false,leatherSeats:false,cruiseControl:false,keylessEntry:false,cdPlayer:false,powerDoorLocks:false,
      tractionControl:false,immobilizer:false,cupHolders:false,foldingRearSeat:false,rearWashWiper:false,
      alloyWheels:false,tubelessTyres:false,centralLocking:false,remoteBootFuelLid:false,
      steeringAdjustment:false,
      tachometer:false,frontFogLights:false,rearDefroster:false,defogger:false,powerSeats:false
      ,AMFMRadio:false,cassettePlayer:false,sunRoof:false,coolBox:false,DVDPlayer:false},*/
      FeaturesModels:["airConditioner","powerWindows","powerSteering",
        "antiLockBrakingSystem",
      "airBags","leatherSeats","cruiseControl","keylessEntry"
      ,"cdPlayer","powerDoorLocks",
      "tractionControl","immobilizer","cupHolders",
      "foldingRearSeat","rearWashWiper",
      "alloyWheels","tubelessTyres","centralLocking"
      ,"remoteBootFuelLid","steeringAdjustment",
      "tachometer","frontFogLights","rearDefroster",
      "defogger","powerSeatse"
      ,"AMFMRadio","cassettePlayer","sunRoof",
      "coolBox","DVDPlayer"]

    };
      defer.resolve(FeaturesData);
    return defer.promise;
    }
}});