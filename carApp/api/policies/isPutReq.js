module.exports = function isPostReq(req, res, next) {
  if(req.method!='PUT'){
    res.json({
      status:false,
      errormsg:'Require PUT Request Method'
    });

  }else{
    next();
  }
};