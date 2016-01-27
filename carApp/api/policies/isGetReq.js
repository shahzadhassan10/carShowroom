module.exports = function isPostReq(req, res, next) {
  if(req.method!='GET'){
    res.json({
      status:false,
      errormsg:'Require GET Request Method'
    });

  }else{
    next();
  }
};