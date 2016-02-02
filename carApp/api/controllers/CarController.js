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
		  		name:params.make+' '+params.model+' '+params.version,
		  		isNew:true,
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
					capacity:(params.capacity)?parseInt(params.capacity):0,
					transmission:params.transmission,
					displacement:(params.displacement)?parseInt(params.displacement):0,
					power:(params.power)?parseInt(params.power):0,
					torque:(params.torque)?parseInt(params.torque):0,
					gear:(params.gear)?parseInt(params.gear):0,
					valveMechanism:params.valveMechanism,
					comparationRatio:(params.comparationRatio)?parseFloat(params.comparationRatio):0,
					noOfCylinders:(params.noOfCylinders)?parseInt(params.noOfCylinders):0,
					cylinderConfiguration:params.cylinderConfiguration,
					valvesPerCylinder:(params.valvesPerCylinder)?parseInt(params.valvesPerCylinder):0
				},
				Body:{
					bodyType:params.bodyType,
					exteriorColor:params.exteriorColor,
					length:(params.length)?parseInt(params.length):0,
					width:(params.width)?parseInt(params.width):0,
					height:(params.height)?parseInt(params.height):0,
					kerbWeight:(params.kerbWeight)?parseInt(params.kerbWeight):0,
					seatingCapacity:(params.seatingCapacity)?parseInt(params.seatingCapacity):0,
					noOfDoors:(params.noOfDoors)?parseInt(params.noOfDoors):0,
					wheelType:params.wheelType,
					wheelSize:(params.wheelSize)?parseInt(params.wheelSize):0,
					tyres:(params.tyres)?parseInt(params.tyres):0
				},
				Specification:{
					mileage:(params.mileage)?parseInt(params.mileage):0,
					assembly:params.assembly,
					minimumTurningRadius:(params.minimumTurningRadius)?parseInt(params.minimumTurningRadius):0,
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