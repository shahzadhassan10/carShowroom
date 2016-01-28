module.exports = {

  /**
   * UserController method
   */
  addUser: function (req, res) {
  	var params = req.params.all();
  	User.create({name:params.name,email:params.email,phoneNumber:params.phoneNumber,password:params.password,city:params.city,address:params.address,role:'user'}).exec(function createCB(err,created){
  		if(err){
  			return res.json({success:false,errormsg:err});
  		}else{
        req.session.role=found.role;
        req.session.user=found.id; 
    	return res.json({
          success:true,
          data: 'Created user with name ' +created.name
    	});
      }
  	});
    
  },
  getUserById:function (req, res){
    var objId=require('mongodb').ObjectID;
    User.find({id:[objId(req.get('id'))]}).exec(function(err,user){
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
    });
  },
  loginUser: function (req, res) {
  	var params = req.params.all();
  	User.findOne({email:params.email,password:params.password}).exec(function createCB(err,found){
  		if(err||!found||found==''){
  			return res.json({
          success:false,
          errormsg:'User not found'});
  		}else{
        req.session.role=found.role;
        req.session.user=found.id;
    	return res.json({
          success:true,
      		data: 'find user with name ' +found.name
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
    User.find({}).exec(function findCB(err,users){
      if(err||!users||users==''){
            res.json({
              success:false,
              errormsg:'No User obj not found '+err
            });
        }else{
          console.log(req.session.role);
          res.json({
            success:true,
              data:users
          });
      }   
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