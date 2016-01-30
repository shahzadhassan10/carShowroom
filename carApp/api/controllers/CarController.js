/**
 * CarController.js
 *
 * @description :: Server-side logic for managing Cars Data.
 */

module.exports = {

  /**
   * add
   */
	addCar: function (req, res) {
		CarService.uploadImages(req,function(resp){
		if(resp.success){	
			console.log(resp.data+'');
		  	var params = req.params.all();
		  	var carObj={
		  		model:params.model,
				version:params.version,
				make:params.make,
				modelYear:params.modelYear,
				registrationCopy:params.registrationCopy,
				price:params.price,
				description:params.description,
				images:resp.data,
				EngineDetails:{
					engineType:params.engineType,
					capacity:params.capacity,
					transmission:params.transmission,
					displacement:params.displacement,
					power:params.power,
					torque:params.torque,
					gear:params.gear,
					valveMechanism:params.valveMechanism,
					comparationRatio:params.comparationRatio,
					noOfCylinders:params.noOfCylinders,
					cylinderConfiguration:params.cylinderConfiguration,
					valvesPerCylinder:params.valvesPerCylinder
				},
				Body:{
					bodyType:params.bodyType,
					exteriorColor:params.exteriorColor,
					length:params.length,
					width:params.width,
					height:params.height,
					kerbWeight:params.kerbWeight,
					seatingCapacity:params.seatingCapacity,
					noOfDoors:params.noOfDoors,
					wheelType:params.wheelType,
					wheelSize:params.wheelSize,
					tyres:params.tyres
				},
				Specification:{
					mileage:params.mileage,
					assembly:params.assembly,
					minimumTurningRadius:params.minimumTurningRadius,
					fuelType:params.fuelType,
					frontSuspension:params.frontSuspension,
					rearSuspension:params.rearSuspension,
					steeringType:params.steeringType,
					powerAssited:params.powerAssited,
					frontBrakes:params.frontBrakes,
					rareBrakes:params.rareBrakes
				},
				Features:{
					airConditioner:(params.airConditioner)?true:false,			 
					powerWindows:(params.powerWindows)?true:false,			 
					powerSteering:(params.powerSteering)?true:false,			 
					antiLockBrakingSystem:(params.antiLockBrakingSystem)?true:false,			 
					airBags:(params.airBags)?true:false, 
					leatherSeats:(params.leatherSeats)?true:false,			 
					cruiseControl:(params.cruiseControl)?true:false,			 
					keylessEntry:(params.keylessEntry)?true:false,			 
					cdPlayer:(params.cdPlayer)?true:false,			 
					powerDoorLocks:(params.powerDoorLocks)?true:false,			 
					tractionControl:(params.tractionControl)?true:false,			 
					immobilizer:(params.immobilizer)?true:false,			 
					cupHolders:(params.cupHolders)?true:false,			 
					foldingRearSeat:(params.foldingRearSeat)?true:false,			 
					rearWashWiper:(params.rearWashWiper)?true:false,			 
					alloyWheels:(params.alloyWheels)?true:false,			 
					tubelessTyres:(params.tubelessTyres)?true:false,			 
					centralLocking:(params.centralLocking)?true:false,			 
					remoteBootFuelLid:(params.remoteBootFuelLid)?true:false,			 
					steeringAdjustment:(params.steeringAdjustment)?true:false,		 
					tachometer:(params.tachometer)?true:false,			 
					frontFogLights:(params.frontFogLights)?true:false,			 
					rearDefroster:(params.rearDefroster)?true:false,			 
					defogger:(params.defogger)?true:false,			 
					powerSeats:(params.powerSeats)?true:false,			 
					AMFMRadio:(params.AMFMRadio)?true:false,			 
					cassettePlayer:(params.cassettePlayer)?true:false,			 
					sunRoof:(params.sunRoof)?true:false,			 
					coolBox:(params.coolBox)?true:false,			 
					DVDPlayer:(params.DVDPlayer)?true:false
				}
		  	};
		  	CarService.addCar(carObj,function(resp){
		  		res.json(resp);
		  	});
		  }else{
		  	return res.json(resp);
		  }
		});
	},
 	getCar: function (req, res) {
	  	CarService.getCar(req.get('id'),function(resp){
	  		res.json(resp);
	  	});
  	},
  	getAllCar: function (req, res) {
	  	CarService.getAllCar(req,function(resp){
	  		res.json(resp);
	  	});
  	},
	searchCar:function(req,res){
  		var params=req.params.all();
  		CarService.searchCar(params,function(resp){
  			res.json(resp);
  		});

  	},
  	getAllMakes:function(req,res){
  		Car.native(function(err,car){
  			car.distinct('make', function(err,makes){
  			if(err||!makes){
  				res.json({
     			success:false,
     			errormsg:"No makes found"
  				});
  			}else{
     		res.json({
     			success:true,
     			data:makes
  			});
  			}
		});
  		});
  	},
  	getModelsByMake:function(req,res){
  		Car.native(function(err,car){
  			car.distinct('model',{ make:req.param('make') }, function(err,models){
  			if(err||!models){
  				res.json({
     			success:false,
     			errormsg:"No models found"
  				});
  			}else{
     			res.json({
     				success:true,
     				data:models
  					});
  			}
  			});
		});
  		
  	},
 	updateCar: function (req, res) {
	  	CarService.updateCar(req,function(resp){
	  		res.json(resp);
	  	});
	},
 	deleteCar: function (req, res) {
	  	CarService.deleteCar(req.param('id'),function(resp){
	  		res.json(resp);
	  	});
  	},
  	upload:function(req,res){
  		var files=req.files;
  		return res.json({data:files});
  	}
};