module.exports = function isId (req, res, next) {
  if(!req.param('id')){
    res.json({
      success:false,
      errormsg:'id require'
    });

  }else if(req.param('id').length<24){
    res.json({
      success:false,
      errormsg:'id length not valid'
    });
  }else{
    next();
  }
};