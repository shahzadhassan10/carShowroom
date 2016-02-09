module.exports = function isUser (req, res, next) {
  var params = req.params.all();
  if(!params.userInfo.name||!params.userInfo.email||!params.userInfo.address||!params.userInfo.phoneNumber||!params.userInfo.password){
  	var msg=(params.userInfo.name)?'':'name, ';
  	msg+=(params.userInfo.email)?'':'email, ';
  	msg+=(params.userInfo.address)?'':'address, ';
  	msg+=(params.userInfo.phoneNumber)?'':'phoneNumber, ';
  	msg+=(params.userInfo.password)?'':'password';
    res.json({
      success:false,
      errormsg:'Require fields: '+msg
    });

  }else{
    next();
  }
};