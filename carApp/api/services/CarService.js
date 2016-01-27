module.exports = {
//////////  CarService functions
	addCar:function(car,next){
		Car.create(car).exec(function createCB(err,created){
  		if(err||!created){
  			next({
  				status:false,
  				errormsg:"Car obj Not created"
  			});
  		}
    	next({
    		status:true,
      		data:created.id
    	});
  		});
	},
	getCar:function(id,next){
		var objId=require('mongodb').ObjectID;
		if(!id){
			next({
	  				status:false,
	  				errormsg:'Require Id'
	  			});
		}else{
		  	Car.find({id:[objId(id)]}).exec(function findCB(err,car1){
			if(err||!car1||car1==''){
		  			next({
		  				status:false,
		  				errormsg:'car obj not found '+err
		  			});
		  	}else{
			    next({
			    	status:true,
			      	data:car1[0]
			    });
			}  	
		  	});
	  }
	},
	getAllCar:function(req,next){
		Car.find({}).exec(function findCB(err,car1){
			if(err||!car1||car1==''){
		  			next({
		  				status:false,
		  				errormsg:'No car obj not found '+err
		  			});
		  	}else{
			    next({
			    	status:true,
			      	data:JSON.stringify(car1)
			    });
			}  	
		  	});
	},
	searchCar:function(srch,next){
		if(!srch){
			next({
				status:false,
	  			errormsg:'Require search Criteria'
			});
		}else{
			Car.find(srch).exec(function(err,found){
				if(err||!found){
					next({
						status:false,
		  				errormsg:'Not found'
					});
				}else{
					next({
						status:true,
		  				data:found
					});
				}
			});
		}

	},
	updateCar:function(req,next){
		if(!req.param('id')){
			next({
	  				status:false,
	  				errormsg:'Require Id'
	  			});
		}else{
			this.getCar(req.param('id'),function(resp){
				if(resp.status){
					//////////// Update Car ////////////
					var params = req.params.all();
					var carObj={
				  		model:(params.model)?params.model:resp.data.model,
						version:(params.version)?params.version:resp.data.version,
						make:(params.make)?params.make:resp.data.make,
						modelYear:(params.modelYear)?params.modelYear:resp.data.modelYear,
						registrationCopy:(params.registrationCopy)?params.registrationCopy:resp.data.registrationCopy,
						price:(params.price)?params.price:resp.data.price,	
						description:(params.description)?params.description:resp.data.description,
						images:null,
						EngineDetails:{
							engineType:(params.engineType)?params.engineType:resp.data.engineType,
							capacity:(params.capacity)?params.capacity:resp.data.capacity,
							transmission:(params.transmission)?params.transmission:resp.data.transmission,
							displacement:(params.displacement)?params.displacement:resp.data.displacement,
							power:(params.power)?params.power:resp.data.power,
							torque:(params.torque)?params.torque:resp.data.torque,
							gear:(params.gear)?params.gear:resp.data.gear,
							valveMechanism:(params.valveMechanism)?params.valveMechanism:resp.data.valveMechanism,
							comparationRatio:(params.comparationRatio)?params.comparationRatio:resp.data.comparationRatio,
							noOfCylinders:(params.noOfCylinders)?params.noOfCylinders:resp.data.noOfCylinders,
							cylinderConfiguration:(params.cylinderConfiguration)?params.cylinderConfiguration:resp.data.cylinderConfiguration,
							valvesPerCylinder:(params.valvesPerCylinder)?params.valvesPerCylinder:resp.data.valvesPerCylinder
						},
						Body:{
							bodyType:(params.bodyType)?params.bodyType:resp.data.bodyType,
							exteriorColor:(params.exteriorColor)?params.exteriorColor:resp.data.exteriorColor,
							length:(params.length)?params.length:resp.data.length,
							width:(params.width)?params.width:resp.data.width,
							height:(params.height)?params.height:resp.data.height,
							kerbWeight:(params.kerbWeight)?params.kerbWeight:resp.data.kerbWeight,
							seatingCapacity:(params.seatingCapacity)?params.seatingCapacity:resp.data.seatingCapacity,
							noOfDoors:(params.noOfDoors)?params.noOfDoors:resp.data.noOfDoors,
							wheelType:(params.wheelType)?params.wheelType:resp.data.wheelType,
							wheelSize:(params.wheelSize)?params.wheelSize:resp.data.wheelSize,
							tyres:(params.tyres)?params.tyres:resp.data.tyres
						},
						Specification:{
							mileage:(params.mileage)?params.mileage:resp.data.mileage,
							assembly:(params.assembly)?params.assembly:resp.data.assembly,
							minimumTurningRadius:(params.minimumTurningRadius)?params.minimumTurningRadius:resp.data.minimumTurningRadius,
							fuelType:(params.fuelType)?params.fuelType:resp.data.fuelType,
							frontSuspension:(params.frontSuspension)?params.frontSuspension:resp.data.frontSuspension,
							rearSuspension:(params.rearSuspension)?params.rearSuspension:resp.data.rearSuspension,
							steeringType:(params.steeringType)?params.steeringType:resp.data.steeringType,
							powerAssited:(params.powerAssited)?params.powerAssited:resp.data.powerAssited,
							frontBrakes:(params.frontBrakes)?params.frontBrakes:resp.data.frontBrakes,
							rareBrakes:(params.rareBrakes)?params.rareBrakes:resp.data.rareBrakes
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
					/////////////////////////////////////	
					var objId=require('mongodb').ObjectID;

				  	Car.update({id:[objId(req.param('id'))]},carObj).exec(function afterwards(err, updated){
				 	if(err||!updated||updated==''){
				  			return next({
				  				status:false,
				  				errormsg:'Car obj not updated '+err
				  			});
				  	}
				    return next({
				    	status:true,
				      	data: 'update car obj with name ' +updated[0].model
				    });  
					});
			  	}else{
			  		next(resp);
			  	}
			});
	  }
	},
	deleteCar:function(id,next){
		var objId=require('mongodb').ObjectID;
    	Car.findOne({id:[objId(id)]}).exec(function(err,car){
      		if(err||!car){
        		return next({
          			status:false,
          			errormsg:'Car obj Not Found'
        			});
      		}else{
		  		Car.destroy({id :[car.id]}).exec(function(err){
		  		if(err){
		  			next({
		  				status:false,
		  				errormsg:'CAR obj Not deleted'
		  			});
		  		}else{
		  			next({
		  				status:true,
		  				data:'Requested Car obj deleted'
		  			})
		  		}
		  		});
		  	}
		});
  		
	}
};