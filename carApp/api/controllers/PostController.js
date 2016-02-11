module.exports = {
/**
   * PostController methods
   */
  addPost: function (req, res) {
  	var params = req.params.all();
    CarService.uploadImages(req,function(resp){
    if(resp.success){ 
    var carObj={
      name:params.make+' '+params.model+' '+params.version,
      isNew:false,
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
          capacity:(params.capacity)?parseInt(params.capacity):null,
          transmission:params.transmission,
          displacement:(params.displacement)?parseInt(params.displacement):null,
          power:(params.power)?parseInt(params.power):null,
          torque:(params.torque)?parseInt(params.torque):null,
          gear:(params.gear)?parseInt(params.gear):null,
          valveMechanism:params.valveMechanism,
          comparationRatio:(params.comparationRatio)?parseFloat(params.comparationRatio):null,
          noOfCylinders:(params.noOfCylinders)?parseInt(params.noOfCylinders):null,
          cylinderConfiguration:params.cylinderConfiguration,
          valvesPerCylinder:(params.valvesPerCylinder)?parseInt(params.valvesPerCylinder):null
      },
      Body:{
          bodyType:params.bodyType,
          exteriorColor:params.exteriorColor,
          length:(params.length)?parseInt(params.length):null,
          width:(params.width)?parseInt(params.width):null,
          height:(params.height)?parseInt(params.height):null,
          kerbWeight:(params.kerbWeight)?parseInt(params.kerbWeight):null,
          seatingCapacity:(params.seatingCapacity)?parseInt(params.seatingCapacity):null,
          noOfDoors:(params.noOfDoors)?parseInt(params.noOfDoors):null,
          wheelType:params.wheelType,
          wheelSize:(params.wheelSize)?parseInt(params.wheelSize):null,
          tyres:(params.tyres)?parseInt(params.tyres):null
      },
      Specification:{
        mileage:(params.mileage)?parseInt(params.mileage):null,
        assembly:params.assembly,
        minimumTurningRadius:(params.minimumTurningRadius)?parseInt(params.minimumTurningRadius):null,
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
          var carId=resp.data.id;
          var userId=req.session.user;
          var d = new Date();
          Post.create({date:d,phoneNumber:params.phoneNumber,city:params.city,cityArea:params.cityArea,cid:carId,uid:userId}).exec(function createCB(err,created){
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
    }else{
      return res.json(resp);
    }
  });
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
  getPostByCity:function(req,res){
    var params=req.params.all();
    var srch={};
    if(params.search.city){
      srch.city=params.search.city+'';
    }
    if(params.search.cityArea){
      srch.cityArea=params.search.cityArea+'';
    }
    Post.find(srch).exec(function findCB(err,posts){
      if(err||!posts||posts==''){
            res.json({
              success:false,
              errormsg:'No Post obj found '+err
            });
        }else{
          CarService.searchUsedCars(posts,params.search,function(resp){
            if(resp.success){
                var selectedPost=[];
                for(i=0;i<resp.data.length;i++){
                    for(j=0;j<posts.length;j++){
                      if(posts[j].cid==resp.data[i].id){
                        selectedPost[i]=posts[j];
                        selectedPost[i].Car=resp.data[i];
                      }
                    }
                }
                res.json({
                success:true,
                data:selectedPost
              });

            }else{
               res.json({
                success:false,
                errormsg:'No Post obj found '+err
                });
            }
          });
      }   
      });
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