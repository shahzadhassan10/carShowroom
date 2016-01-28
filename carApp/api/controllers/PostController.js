module.exports = {
/**
   * PostController methods
   */
  addPost: function (req, res) {
  	var params = req.params.all();
    var carObj={
      model:params.model,
      version:params.version,
      make:params.make,
      modelYear:params.modelYear,
      registrationCopy:params.registrationCopy,
      price:params.price,
      description:params.description,
      images:null,
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
        if(resp.success){
          var carId=resp.data;
          var userId='345235252';
          Post.create({date:params.date,phoneNumber:params.phoneNumber,address:params.address,cid:carId,uid:userId}).exec(function createCB(err,created){
          if(err||!created){
              CarService.deleteCar(carId,function(resp){
                console.log(resp.success);
              return res.json({
              success:false,
              errormsg:'Post not created '+err});
            });
              
          }else{
           return res.json({
              success:true,
              data:created
              });}
          });
        }else{
          return res.json({
              success:false,
              errormsg:'Car obj not created'+resp.errormsg});
        }

      });

  	/*Post.create({name:params.name,email:params.email,phoneNumber:params.phoneNumber,password:params.password,city:params.city,address:params.address,role:'Post'}).exec(function createCB(err,created){
  		if(err){
  			return res.json({notic:'not created'+err});
  		}
    	return res.json({
      		notice: 'Created Post with name ' +created.name
    	});
  	});*/
    
  },
  getAllPost:function(req,res){
    Post.find({}).exec(function findCB(err,posts){
      if(err||!posts||posts==''){
            res.json({
              success:false,
              errormsg:'No Post obj not found '+err
            });
        }else{
          res.json({
            success:true,
              data:posts
          });
      }   
      });

  },
   getPost: function (req, res) {
  	var params = req.params.all();

    res.send('ok');
  	/*Post.findOne({email:params.email,password:params.password}).exec(function createCB(err,created){
  		if(err||!created||created==''){
  			return res.json({notic:'not found'});
  		}
    	return res.json({
      		notice: 'find Post with name ' +created.id
    	});
  	});*/
    
  },
  deletePost: function (req, res) {
    var objId=require('mongodb').ObjectID;
    Post.findOne({id:[objId(req.param('id'))]}).exec(function(err,post){
      if(err||!post){
        return res.json({
          success:false,
          errormsg:'Post Not Found'
        });
      }else{
        CarService.deleteCar(post.cid,function(resp){ 
          if(resp.success){
          Post.destroy({id :[post.id]}).exec(function(err){
          if(err){
            res.json({
              success:false,
              errormsg:'Post Not deleted'
            });
          }else{
             res.json({
              success:true,
              data:'Requested Post deleted'
            })
          }
          });
          }else{
              res.json(resp);
          }
        });
      }
  });
    
  }
};