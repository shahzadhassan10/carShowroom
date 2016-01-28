module.exports = function isCar (req, res, next) {
	if(!req.param('model')||!req.param('version')||!req.param('make')||!req.param('modelYear')||!req.param('price')||!req.param('mileage')||!req.param('engineType')||!req.param('capacity')||!req.param('transmission')){
	  	var msg=(req.param('model'))?'':'model, ';
	  	msg+=(req.param('version'))?'':'version, ';
	  	msg+=(req.param('make'))?'':'make, ';
	  	msg+=(req.param('modelYear'))?'':'modelYear, ';
	  	msg+=(req.param('price'))?'':'price, ';
	  	msg+=(req.param('mileage'))?'':'mileage, ';
	  	msg+=(req.param('engineType'))?'':'engineType, ';
	  	msg+=(req.param('capacity'))?'':'capacity, ';
	  	msg+=(req.param('transmission'))?'':'transmission';
	    res.json({
	      success:false,
	      errormsg:'Require fields: '+msg
	    });

	}else{
	   next();
	 }
  
};