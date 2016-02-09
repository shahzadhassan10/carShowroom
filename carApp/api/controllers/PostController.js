module.exports = {
/**
   * PostController methods
   */
  addPost: function (req, res) {
  	var params = req.params.all();
    console.log("data "+params.postData);
    CarService.uploadImages(req,params.postData.avatar,function(resp){
    if(resp.success){ 
    var carObj={
      name:params.postData.make+' '+params.postData.model+' '+params.postData.version,
      isNew:false,
      model:params.postData.model,
      version:params.postData.version,
      make:params.postData.make,
      modelYear:params.postData.modelYear,
      registrationCopy:params.postData.registrationCopy,
      price:params.postData.price,
      description:params.postData.description,
      images:resp.data,
      EngineDetails:{
          engineType:params.postData.engineType,
          capacity:(params.postData.capacity)?parseInt(params.postData.capacity):0,
          transmission:params.postData.transmission,
          displacement:(params.postData.displacement)?parseInt(params.postData.displacement):0,
          power:(params.postData.power)?parseInt(params.postData.power):0,
          torque:(params.postData.torque)?parseInt(params.postData.torque):0,
          gear:(params.postData.gear)?parseInt(params.postData.gear):0,
          valveMechanism:params.postData.valveMechanism,
          comparationRatio:(params.postData.comparationRatio)?parseFloat(params.postData.comparationRatio):0,
          noOfCylinders:(params.postData.noOfCylinders)?parseInt(params.postData.noOfCylinders):0,
          cylinderConfiguration:params.postData.cylinderConfiguration,
          valvesPerCylinder:(params.postData.valvesPerCylinder)?parseInt(params.postData.valvesPerCylinder):0
      },
      Body:{
          bodyType:params.postData.bodyType,
          exteriorColor:params.postData.exteriorColor,
          length:(params.postData.length)?parseInt(params.postData.length):0,
          width:(params.postData.width)?parseInt(params.postData.width):0,
          height:(params.postData.height)?parseInt(params.postData.height):0,
          kerbWeight:(params.postData.kerbWeight)?parseInt(params.postData.kerbWeight):0,
          seatingCapacity:(params.postData.seatingCapacity)?parseInt(params.postData.seatingCapacity):0,
          noOfDoors:(params.postData.noOfDoors)?parseInt(params.postData.noOfDoors):0,
          wheelType:params.postData.wheelType,
          wheelSize:(params.postData.wheelSize)?parseInt(params.postData.wheelSize):0,
          tyres:(params.postData.tyres)?parseInt(params.postData.tyres):0
      },
      Specification:{
        mileage:(params.postData.mileage)?parseInt(params.postData.mileage):0,
        assembly:params.postData.assembly,
        minimumTurningRadius:(params.postData.minimumTurningRadius)?parseInt(params.postData.minimumTurningRadius):0,
        fuelType:params.postData.fuelType,
        frontSuspension:params.postData.frontSuspension,
        rearSuspension:params.postData.rearSuspension,
        steeringType:params.postData.steeringType,
        powerAssited:params.postData.powerAssited,
        frontBrakes:params.postData.frontBrakes,
        rareBrakes:params.postData.rareBrakes
      },
      Features:{
        airConditioner:(params.postData.Features.airConditioner)?true:false,       
        powerWindows:(params.postData.Features.powerWindows)?true:false,       
        powerSteering:(params.postData.Features.powerSteering)?true:false,       
        antiLockBrakingSystem:(params.postData.Features.antiLockBrakingSystem)?true:false,       
        airBags:(params.postData.Features.airBags)?true:false, 
        leatherSeats:(params.postData.Features.leatherSeats)?true:false,       
        cruiseControl:(params.postData.Features.cruiseControl)?true:false,       
        keylessEntry:(params.postData.Features.keylessEntry)?true:false,       
        cdPlayer:(params.postData.Features.cdPlayer)?true:false,       
        powerDoorLocks:(params.postData.Features.powerDoorLocks)?true:false,       
        tractionControl:(params.postData.Features.tractionControl)?true:false,       
        immobilizer:(params.postData.Features.immobilizer)?true:false,       
        cupHolders:(params.postData.Features.cupHolders)?true:false,       
        foldingRearSeat:(params.postData.Features.foldingRearSeat)?true:false,       
        rearWashWiper:(params.postData.Features.rearWashWiper)?true:false,       
        alloyWheels:(params.postData.Features.alloyWheels)?true:false,       
        tubelessTyres:(params.postData.Features.tubelessTyres)?true:false,       
        centralLocking:(params.postData.Features.centralLocking)?true:false,       
        remoteBootFuelLid:(params.postData.Features.remoteBootFuelLid)?true:false,       
        steeringAdjustment:(params.postData.Features.steeringAdjustment)?true:false,     
        tachometer:(params.postData.Features.tachometer)?true:false,       
        frontFogLights:(params.postData.Features.frontFogLights)?true:false,       
        rearDefroster:(params.postData.Features.rearDefroster)?true:false,       
        defogger:(params.postData.Features.defogger)?true:false,       
        powerSeats:(params.postData.Features.powerSeats)?true:false,       
        AMFMRadio:(params.postData.Features.AMFMRadio)?true:false,       
        cassettePlayer:(params.postData.Features.cassettePlayer)?true:false,       
        sunRoof:(params.postData.Features.sunRoof)?true:false,       
        coolBox:(params.postData.Features.coolBox)?true:false,       
        DVDPlayer:(params.postData.Features.DVDPlayer)?true:false
      }
      };
      CarService.addCar(carObj,function(resp){
        if(resp.success){
          var carId=resp.data.id;
          var userId="56aa97a3572fc6940e080786";//req.session.user;
          var d = new Date();
          Post.create({date:d,phoneNumber:params.postData.phoneNumber,city:params.postData.city,cityArea:params.postData.cityArea,cid:carId,uid:userId}).exec(function createCB(err,created){
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