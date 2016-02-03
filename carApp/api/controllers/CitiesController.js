module.exports = {

  /**
   * UserController method
   */
  addCities: function (req, res) {
  	var params = req.params.all();
  	Cities.create({city:params.city,cityArea:params.cityArea}).exec(function createCB(err,created){
  		if(err||!created){
  			return res.json({success:false,errormsg:err});
  		}else{
    	return res.json({
          success:true,
          data: 'Created City'
    	});
      }
  	});
    
  },
  getCities:function(req,res){
     Cities.native(function(err,cities){
        cities.find({},{}).toArray(function(err,citys){
        if(err||!citys){
          res.json({
          success:false,
          errormsg:"No City found "+err
          });
        }else{
          res.json({
            success:true,
            data:citys
          });
        }
      });
    });
  },
   getAllCities:function(req,res){
     Cites.native(function(err,cities){
       cities.distinct('city',{isNew:true}, function(err,cities){
        if(err||!cities){
          res.json({
          success:false,
          errormsg:"No City found"
          });
        }else{
        res.json({
          success:true,
          data:cities
        });
        }
      });
    });
  },
   getAllCityAreaByCity:function(req,res){
    var params=req.params.all();
     Cites.native(function(err,cities){
       cities.distinct('cityArea',{city:params.city}, function(err,cities){
        if(err||!cities){
          res.json({
          success:false,
          errormsg:"No cityArea found"
          });
        }else{
        res.json({
          success:true,
          data:cities
        });
        }
      });
    });
  },
  updateCities: function (req, res) {
    var params=req.params.all();
    var userobj={
      name:params.name,
      email:params.email,
      phoneNumber:params.phoneNumber,
      password:params.password,
      city:params.city,
      isActive:true,
      address:params.address,role:'user'
    };
    var objId=require('mongodb').ObjectID;
    User.update({id:[objId(req.param('id'))]},userobj).exec(function afterwards(err, updated){   
    if(err||!updated||updated==''){
        return res.json({
          success:false,
          errormsg:'User not found '+err});
    }
    return res.json({
        success:true,
        data: 'Updated User with name ' +updated[0].name
    });  
    });

  },
  deleteCites: function (req, res) {
    var objId=require('mongodb').ObjectID;
    User.findOne({id:[objId(req.param('id'))]}).exec(function(err,user){
      if(err||!user){
        return res.json({
          success:false,
          errormsg:'User Not Found'
        });
      }else{
        User.destroy({id :[user.id]}).exec(function(err){
        if(err){
          return res.json(
          {
            success:false,
            errormsg:'User Not Deleted'
          });
        }else{
          return res.json(
            {
              success:true,
              data:'User Deleted'
            });
        }
        });
      }
});
    
  }
};