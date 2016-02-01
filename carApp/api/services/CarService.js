module.exports = {
//////////  CarService functions
	addCar:function(car,next){
		Car.create(car).exec(function createCB(err,created){
  		if(err||!created){
  			next({
  				success:false,
  				errormsg:"Car obj Not created"
  			});
  		}
    	next({
    		success:true,
      		data:created
    	});
  		});
	},
	uploadImages:function(req,next){
		req.file('avatar').upload({
  			dirname:  '../../assets/images',
  			maxBytes: 10485760
			},function (err, uploadedFiles) {
  			if (err) {
  				next({
  					success:false,
  					errormsg:err.message
  				});
  			}else{
  				var imgArray=[];
  				for(i=0;i<uploadedFiles.length;i++){
  					var path=uploadedFiles[i].fd+'';
  					path=path.split('\\');
  					imgArray[i]=path[path.length-1]+'';
  				}
  				next({
    				success:true, 
    				data:imgArray
  				});
  			}
		});
	},
	getCar:function(id,next){
		var objId=require('mongodb').ObjectID;
		if(!id){
			next({
	  				success:false,
	  				errormsg:'Require Id'
	  			});
		}else{
		  	Car.find({id:[objId(id)]}).exec(function findCB(err,car1){
			if(err||!car1||car1==''){
		  			next({
		  				success:false,
		  				errormsg:'car obj not found '+err
		  			});
		  	}else{
			    next({
			    	success:true,
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
		  				success:false,
		  				errormsg:'No car obj not found '+err
		  			});
		  	}else{
			    next({
			    	success:true,
			      	data:car1
			    });
			}  	
		  	});
	},
	searchCar:function(srch,next){
		var srchTerm={},model1=[],make1=[];
		if(srch.model){
			var val=srch.model+'';
			val=val.split(',');
			for(i=0;i<val.length;i++){
				model1[i]=val[i]+'';
			}
		}
		if(srch.make){
			var val=srch.make+'';
			val=val.split(',');
			for(i=0;i<val.length;i++){
				make1[i]=val[i]+'';
			}
		}
		if(srch.model&&srch.make&&srch.gtPrice&&srch.ltPrice){
			srchTerm={model:model1,make:make1,price:{'>=':parseInt(srch.gtPrice),'<=':parseInt(srch.ltPrice)}};
		}else if(srch.model&&srch.make&&srch.gtPrice){
			srchTerm={model:model1,make:make1,price:{'>=':parseInt(srch.gtPrice)}};
		}else if(srch.model&&srch.make&&srch.ltPrice){
			srchTerm={model:model1,make:make1,price:{'<=':parseInt(srch.ltPrice)}};
		}else if(srch.model&&srch.make){
			srchTerm={model:model1,make:make1};
		}else if(!srch.model&&!srch.make&&!srch.gtPrice&&!srch.ltPrice){
			srchTerm={};
		}else if(srch.model&&!srch.gtPrice&&!srch.ltPrice){
			srchTerm={model:model1};
		}else if(srch.make&&!srch.gtPrice&&!srch.ltPrice){
			srchTerm={make:make1};
		}else if(srch.gtPrice&&srch.ltPrice){
			srchTerm={price:{'>=':parseInt(srch.gtPrice),'<=':parseInt(srch.ltPrice)}};
		}else if(srch.gtPrice){
			srchTerm={price:{'>=':parseInt(srch.gtPrice)}};
		}else if(srch.ltPrice){
			srchTerm={price:{'<=':parseInt(srch.ltPrice)}};
		}
		Car.find(srchTerm).exec(function(err,found){
			if(err||!found||found==''){
				next({
					success:false,
	  				errormsg:'No Car found'
				});
			}else{
				next({
					success:true,
	  				data:found
				});
			}
		});
	},
	searchUsedCars:function(posts,params,next){
		var srchTerm={};
		var ids=[];
		var objId=require('mongodb').ObjectID;
		for(i=0;i<posts.length;i++){
			ids[i]=objId(posts[i].cid);
		}
		//console.log('ids '+ids.toString());
		if(params.gtPrice&&params.ltPrice){
			srchTerm.price={'>=':parseInt(params.gtPrice),'<=':parseInt(params.ltPrice)};
		}else if(params.gtPrice){
			srchTerm.price={'>=':parseInt(params.gtPrice)};
		}else if(params.ltPrice){
			srchTerm.price={'<=':parseInt(params.ltPrice)};
		}
		if(params.name){
			srchTerm.name=params.name+'';
		}
		if(params.engineType){
			srchTerm.EngineDetails={};
			srchTerm.EngineDetails.engineType=params.engineType+'';
		}
		if(params.capacityFrom&&params.capacityTo){
			srchTerm.EngineDetails.capacity={'>=':parseInt(params.capacityFrom),'<=':parseInt(params.capacityTo)};
		}else if(params.capacityFrom){
			srchTerm.EngineDetails.capacity={'>=':parseInt(params.capacityFrom)};
		}else if(params.capacityTo){
			srchTerm.EngineDetails.capacity={'<=':parseInt(params.capacityTo)};
		}
		if(params.yearFrom&&params.yearTo){
			srchTerm.modelYear={'>=':parseInt(params.yearFrom),'<=':parseInt(params.yearTo)};
		}else if(params.yearFrom){
			srchTerm.modelYear={'>=':parseInt(params.yearFrom)};
		}else if(params.yearTo){
			srchTerm.modelYear={'<=':parseInt(params.yearTo)};
		}
		/*if(params.name&&params.gtPrice&&params.ltPrice){
			srchTerm={id:ids,isNew:false,name:params.name,price:{'>=':parseInt(params.gtPrice),'<=':parseInt(params.ltPrice)}};
		}else if(params.name&&params.gtPrice&&!params.ltPrice){
			srchTerm={id:ids,isNew:false,name:params.name,price:{'>=':parseInt(params.gtPrice)}};
		}else if(params.name&&params.ltPrice&&!params.gtPrice){
			srchTerm={id:ids,isNew:false,name:params.name,price:{'<=':parseInt(params.ltPrice)}};
		}else if(!params.name&&params.gtPrice&&params.ltPrice){
			srchTerm={id:ids,isNew:false,price:{'>=':parseInt(params.gtPrice),'<=':parseInt(params.ltPrice)}};
		}else if(params.name&&!params.gtPrice&&!params.ltPrice){
			srchTerm={id:ids,isNew:false,name:params.name};
		}else if(!params.name&&params.gtPrice&&!params.ltPrice){
			srchTerm={id:ids,isNew:false,price:{'<=':parseInt(params.ltPrice)}};
		}else if(!params.name&&!params.gtPrice&&params.ltPrice){
			srchTerm={id:ids,isNew:false,price:{'>=':parseInt(params.gtPrice)}};
		}else{
			srchTerm={id:ids,isNew:false};
		}*/
		//console.log('ids '+JSON.stringify(srchTerm));
		srchTerm.id=ids;
		srchTerm.isNew=false;
		Car.find(srchTerm).exec(function(err,found){
			if(err||!found||found==''){
				next({
					success:false,
	  				errormsg:'No Car found'
				});
			}else{
				next({
					success:true,
	  				data:found
				});
			}
		});
	},
	updateCar:function(req,next){
		if(!req.param('id')){
			next({
	  				success:false,
	  				errormsg:'Require Id'
	  			});
		}else{
			this.getCar(req.param('id'),function(resp){
				if(resp.success){
					//////////// Update Car ////////////
					var params = req.params.all();
					var carObj={
						name:((params.make)?params.make:resp.data.make)+' '+((params.model)?params.model:resp.data.model)+' '+((params.version)?params.version:resp.data.version),
						isNew:resp.data.isNew,
				  		model:(params.model)?params.model:resp.data.model,
						version:(params.version)?params.version:resp.data.version,
						make:(params.make)?params.make:resp.data.make,
						modelYear:(params.modelYear)?params.modelYear:resp.data.modelYear,
						registrationCopy:(params.registrationCopy)?params.registrationCopy:resp.data.registrationCopy,
						price:(params.price)?params.price:resp.data.price,	
						description:(params.description)?params.description:resp.data.description,
						images:null,
						EngineDetails:{
							engineType:params.engineType,
							capacity:(params.capacity)?parseInt(params.capacity):parseInt(params.capacity),
							transmission:params.transmission,
							displacement:(params.displacement)?parseInt(params.displacement):0,
							power:(params.power)?parseInt(params.power):0,
							torque:(params.torque)??parseInt(params.torque):0,
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
							minimumTurningRadius:(params.minimumTurningRadius)?parseInt(params.,minimumTurningRadius):0,
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
				  				success:false,
				  				errormsg:'Car obj not updated '+err
				  			});
				  	}
				    return next({
				    	success:true,
				      	data:updated[0]
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
          			success:false,
          			errormsg:'Car obj Not Found'
        			});
      		}else{
		  		Car.destroy({id :[car.id]}).exec(function(err){
		  		if(err){
		  			next({
		  				success:false,
		  				errormsg:'CAR obj Not deleted'
		  			});
		  		}else{
		  			next({
		  				success:true,
		  				data:'Requested Car obj deleted'
		  			})
		  		}
		  		});
		  	}
		});
  		
	}
};