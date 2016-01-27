module.exports = function isPostReq(req, res, next) {
  if(req.method!='POST'){
    res.json({
      status:false,
      errormsg:'Require Post Request Method'
    });

  }else{
    next();
  }
};