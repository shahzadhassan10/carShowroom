module.exports = {

  /**
   * UserController method
   */
  addMakes: function (req, res) {
    var params = req.params.all();
    Makes.create({make:params.make,model:params.model,version:params.version}).exec(function createCB(err,created){
      if(err||!created){
        return res.json({success:false,errormsg:err});
      }else{
      return res.json({
          success:true,
          data: 'Created Makes'
      });
      }
    });
    
  },
  getMakes:function(req,res){
     Makes.native(function(err,make){
        make.find({},{}).toArray(function(err,makes){
        if(err||!makes){
          res.json({
          success:false,
          errormsg:"No Makes found "+err
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
   getAllMakes:function(req,res){
      Makes.native(function(err,make){
        make.distinct('make',{}, function(err,makes){
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
      Makes.native(function(err,make){
        var params=req.params.all();
        make.distinct('model',{ make:params.make+''}, function(err,models){
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
    getVersionsByMakeAndModels:function(req,res){
      Makes.native(function(err,make){
        var params=req.params.all();
        make.distinct('version',{ make:params.make+'',model:params.model+''}, function(err,versions){
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
    }

};