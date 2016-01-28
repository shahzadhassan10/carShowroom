module.exports = function isPostReq(req, res, next) {
  if(req.method!='GET'){
    res.json({
      success:false,
      errormsg:'Require GET Request Method'
    });

  }else{
    next();
  }
};