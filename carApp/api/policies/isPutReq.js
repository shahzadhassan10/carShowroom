module.exports = function isPostReq(req, res, next) {
  if(req.method!='PUT'){
    res.json({
      success:false,
      errormsg:'Require PUT Request Method'
    });

  }else{
    next();
  }
};