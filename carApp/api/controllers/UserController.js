module.exports = {

  /**
   * UserController method
   */
  addUser: function (req, res) {
  	var params = req.params.all();
  	User.create({name:params.userInfo.name,email:params.userInfo.email,phoneNumber:params.userInfo.phoneNumber,password:params.userInfo.password,city:params.userInfo.city,address:params.userInfo.address,role:'user',isActive:true}).exec(function createCB(err,created){
  		if(err||!created){
  			return res.json({success:false,errormsg:err});
  		}else{
      req.session.role=created.role;
      req.session.user=created.id; 
    	return res.json({
          success:true,
          data: 'Created user with name ' +created.name
    	});
      }
  	});
    
  },
  getUserById:function (req, res){
    var objId=require('mongodb').ObjectID;
    User.native(function(err,user){
        user.find({_id:new objId(req.get('id'))},{password: false}).toArray(function(err,user1){
        if(err||!user1){
          res.json({
          success:false,
          errormsg:"No User found "+user1.length
          });
        }else{
          res.json({
            success:true,
            data:user1[0]
          });
        }
      });
    });
    /*User.find({id:[objId(req.get('id'))]}).exec(function(err,user){
      if(err||!user||user==''){
            res.json({
              success:false,
              errormsg:'User obj not found '+err
            });
        }else{
          res.json({
            success:true,
            data:user[0]
          });
        }   
    });*/
  },
  loginUser: function (req, res) {
  	var params = req.params.all();
  	User.findOne({email:params.userData.email,password:params.userData.password}).exec(function createCB(err,found){
  		if(err||!found||found==''||!(found.isActive)){
  			return res.json({
          success:false,
          errormsg:'User not found'});
  		}else{
        req.session.role=found.role;
        req.session.user=found.id;
    	return res.json({
          success:true,
      		data:found.role+''
    	});
    }
  	});
    
  },
  logout:function(req,res){
      req.session.destroy(function(err){
        if(err){
            res.json({
          success:false,
          data:'Logout fail'
        });
        }else{
          res.json({
          success:true,
          data:'Successfully logout'
        });
        }
      });
  },
   getAllUser:function(req,res){
     User.native(function(err,user){
        user.find({},{}).toArray(function(err,user1){
        if(err||!user1){
          res.json({
          success:false,
          errormsg:"No User found "+err
          });
        }else{
          res.json({
            success:true,
            data:user1
          });
        }
      });
    });
  },
  updateUser: function (req, res) {
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
  deleteUser: function (req, res) {
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