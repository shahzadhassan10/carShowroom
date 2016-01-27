module.exports = function isUser (req, res, next) {
  if(!req.param('name')||!req.param('email')||!req.param('address')||!req.param('phoneNumber')||!req.param('password')){
  	var msg=(req.param('name'))?'':'name, ';
  	msg+=(req.param('email'))?'':'email, ';
  	msg+=(req.param('address'))?'':'address, ';
  	msg+=(req.param('phoneNumber'))?'':'phoneNumber, ';
  	msg+=(req.param('password'))?'':'password';
    res.json({
      status:false,
      errormsg:'Require fields: '+msg
    });

  }else{
    next();
  }
};