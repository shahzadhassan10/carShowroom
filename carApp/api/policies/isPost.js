module.exports = function isPost (req, res, next) {
	if(!req.param('city')){
  	var msg='city';
    res.json({
      success:false,
      errormsg:'Require fields: '+msg
    });

  }else{
    next();
  }
};