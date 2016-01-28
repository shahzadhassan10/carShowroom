module.exports = function isPostReq(req, res, next) {
  if(req.method!='POST'){
    res.json({
      success:false,
      errormsg:'Require Post Request Method'
    });

  }else{
    next();
  }
};