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
		  		name:params.carData.make+' '+params.carData.model+' '+params.carData.version,
		  		isNew:true,
		  		model:params.carData.model,
				version:params.carData.version,
				make:params.carData.make,
				modelYear:params.carData.modelYear,
				registrationCopy:params.carData.registrationCopy,
				price:params.carData.price,
				description:params.carData.description,
				images:resp.data,
				EngineDetails:{
					engineType:params.carData.engineType,
					capacity:(params.carData.capacity)?parseInt(params.carData.capacity):null,
					transmission:params.carData.transmission,
					displacement:(params.carData.displacement)?parseInt(params.carData.displacement):null,
					power:(params.carData.power)?parseInt(params.carData.power):null,
					torque:(params.carData.torque)?parseInt(params.carData.torque):null,
					gear:(params.carData.gear)?parseInt(params.carData.gear):null,
					valveMechanism:params.carData.valveMechanism,
					comparationRatio:(params.carData.comparationRatio)?parseFloat(params.carData.comparationRatio):null,
					noOfCylinders:(params.carData.noOfCylinders)?parseInt(params.carData.noOfCylinders):null,
					cylinderConfiguration:params.carData.cylinderConfiguration,
					valvesPerCylinder:(params.carData.valvesPerCylinder)?parseInt(params.carData.valvesPerCylinder):null
				},
				Body:{
					bodyType:params.carData.bodyType,
					exteriorColor:params.carData.exteriorColor,
					length:(params.carData.length)?parseInt(params.carData.length):null,
					width:(params.carData.width)?parseInt(params.carData.width):null,
					
					height:(params.carData.height)?parseInt(params.carData.height):null,
					kerbWeight:(params.carData.kerbWeight)?parseInt(params.carData.kerbWeight):null,
					seatingCapacity:(params.carData.seatingCapacity)?parseInt(params.carData.seatingCapacity):null,
					noOfDoors:(params.carData.noOfDoors)?parseInt(params.carData.noOfDoors):null,
					wheelType:params.carData.wheelType,
					wheelSize:(params.carData.wheelSize)?parseInt(params.carData.wheelSize):null,
					tyres:(params.carData.tyres)?parseInt(params.carData.tyres):null
				},
				Specification:{
					mileage:(params.carData.mileage)?parseInt(params.carData.mileage):null,
					assembly:params.carData.assembly,
					minimumTurningRadius:(params.carData.minimumTurningRadius)?parseInt(params.carData.minimumTurningRadius):null,
					fuelType:params.carData.fuelType,
					frontSuspension:params.carData.frontSuspension,
					rearSuspension:params.carData.rearSuspension,
					steeringType:params.carData.steeringType,
					powerAssited:params.carData.powerAssited,
					frontBrakes:params.carData.frontBrakes,
					rareBrakes:params.carData.rareBrakes
				},
				Features:{
					airConditioner:(params.carData.Features.airConditioner)?true:false,			 
					powerWindows:(params.carData.Features.powerWindows)?true:false,			 
					powerSteering:(params.carData.Features.powerSteering)?true:false,			 
					antiLockBrakingSystem:(params.carData.Features.antiLockBrakingSystem)?true:false,			 
					airBags:(params.carData.Features.airBags)?true:false, 
					leatherSeats:(params.carData.Features.leatherSeats)?true:false,			 
					cruiseControl:(params.carData.Features.cruiseControl)?true:false,			 
					keylessEntry:(params.carData.Features.keylessEntry)?true:false,			 
					cdPlayer:(params.carData.Features.cdPlayer)?true:false,			 
					powerDoorLocks:(params.carData.Features.powerDoorLocks)?true:false,			 
					tractionControl:(params.carData.Features.tractionControl)?true:false,			 
					immobilizer:(params.carData.Features.immobilizer)?true:false,			 
					cupHolders:(params.carData.Features.cupHolders)?true:false,			 
					foldingRearSeat:(params.carData.Features.foldingRearSeat)?true:false,			 
					rearWashWiper:(params.carData.Features.rearWashWiper)?true:false,			 
					alloyWheels:(params.carData.Features.alloyWheels)?true:false,			 
					tubelessTyres:(params.carData.Features.tubelessTyres)?true:false,			 
					centralLocking:(params.carData.Features.centralLocking)?true:false,			 
					remoteBootFuelLid:(params.carData.Features.remoteBootFuelLid)?true:false,			 
					steeringAdjustment:(params.carData.Features.steeringAdjustment)?true:false,		 
					tachometer:(params.carData.Features.tachometer)?true:false,			 
					frontFogLights:(params.carData.Features.frontFogLights)?true:false,			 
					rearDefroster:(params.carData.Features.rearDefroster)?true:false,			 
					defogger:(params.carData.Features.defogger)?true:false,			 
					powerSeats:(params.carData.Features.powerSeats)?true:false,			 
					AMFMRadio:(params.carData.Features.AMFMRadio)?true:false,			 
					cassettePlayer:(params.carData.Features.cassettePlayer)?true:false,			 
					sunRoof:(params.carData.Features.sunRoof)?true:false,			 
					coolBox:(params.carData.Features.coolBox)?true:false,			 
					DVDPlayer:(params.carData.Features.DVDPlayer)?true:false
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
	  	CarService.getCar(req.param('id'),function(resp){
	  		res.json(resp);
	  	});
  	},
  	getAllCar: function (req, res) {
	  	CarService.getAllCar(req,function(resp){
	  		res.json(resp);
	  	});
  	},
  	getAllUsedCar:function (req, res) {
	  	CarService.getAllUsedCar(req,function(resp){
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
  			car.distinct('make',{isNew:true}, function(err,makes){
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
  			var params=req.params.all();
  			car.distinct('model',{ make:params.make+'',isNew:true}, function(err,models){
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
  	getCarByMakeModelAndVersion:function(req,res){
  		var objId=require('mongodb').ObjectID;
  		var params=req.params.all();
  		Car.find({make:params.make+'',model:params.model+'',version:params.version+'',isNew:true}).exec(function findCB(err,car1){
			if(err||!car1||car1==''){
		  			res.json({
		  				success:false,
		  				errormsg:'car obj not found '+err
		  			});
		  	}else{
			    res.json({
			    	success:true,
			      	data:car1[0]
			    });
			}  	
		  	});
  	},
  	getCarsByJson:function(req,res){
  		var params=req.params.all();
  		var srchTerm={};
  		if(params.info.carObj1&&params.info.carObj2&&params.info.carObj3){
  			srchTerm={model:[params.info.carObj1.model+'',params.info.carObj2.model+'',params.info.carObj3.model+''],
  			make:[params.info.carObj1.make+'',params.info.carObj2.make+'',params.info.carObj3.make+''],
  			version:[params.info.carObj1.version+'',params.info.carObj2.version+'',params.info.carObj3.version+''],
  			isNew:true
  		};
  		}else if(params.info.carObj1&&params.info.carObj2&&!params.info.carObj3){
  			srchTerm={model:[params.info.carObj1.model+'',params.info.carObj2.model+''],
  			make:[params.info.carObj1.make+'',params.info.carObj2.make+''],
  			version:[params.info.carObj1.version+'',params.info.carObj2.version+''],isNew:true
  		};
  		}
  		if(srchTerm){
	  		Car.find(srchTerm).exec(function findCB(err,car1){
				if(err||!car1||car1==''){
			  			res.json({
			  				success:false,
			  				errormsg:'car obj not found '+err
			  			});
			  	}else{
				    res.json({
				    	success:true,
				      	data:car1
				    });
				}  	
			  	});
  		}else{
  			res.json({
			  	success:false,
			  	errormsg:'car obj not found '+err
			 });
  		}
  	},
  	getVersionsByMakeAndModels:function(req,res){
  		Car.native(function(err,car){
  			var params=req.params.all();
  			car.distinct('version',{ make:params.make+'',model:params.model+'',isNew:true}, function(err,versions){
  			if(err||!versions){
  				res.json({
     			success:false,
     			errormsg:"No Such Versions found"
  				});
  			}else{
     			res.json({
     				success:true,
     				data:versions
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