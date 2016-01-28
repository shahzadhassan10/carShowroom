module.exports = function isDeleteReq(req, res, next) {
  if(req.method!='DELETE'){
    res.json({
      success:false,
      errormsg:'Require Delete Request Method'
    });

  }else{
    next();
  }
};