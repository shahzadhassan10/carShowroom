module.exports = function isDeleteReq(req, res, next) {
  if(req.method!='DELETE'){
    res.json({
      status:false,
      errormsg:'Require Delete Request Method'
    });

  }else{
    next();
  }
};