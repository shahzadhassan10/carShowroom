module.exports = function isId (req, res, next) {
  if(!req.param('id')){
    res.json({
      status:false,
      errormsg:'id require'
    });

  }else if(req.param('id').length<24){
    res.json({
      status:false,
      errormsg:'id length not valid'
    });
  }else{
    next();
  }
};