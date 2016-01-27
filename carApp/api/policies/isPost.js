module.exports = function isPost (req, res, next) {
  if(!req.param('date')){
  	var msg=(req.param('date'))?'':'date, ';
    res.json({
      status:false,
      errormsg:'Require fields: '+msg
    });

  }else{
    next();
  }
};