module.exports = function isCar (req, res, next) {
	var param=req.params.all();
	if(!param.model||!param.version||!param.make||!param.modelYear||!param.price||!param.mileage||!param.engineType||!param.capacity||!param.transmission){
	  	var msg=(param.model)?'':'model, ';
	  	msg+=(param.version)?'':'version, ';
	  	msg+=(param.make)?'':'make, ';
	  	msg+=(param.modelYear)?'':'modelYear, ';
	  	msg+=(param.price)?'':'price, ';
	  	msg+=(param.mileage)?'':'mileage, ';
	  	msg+=(param.engineType)?'':'engineType, ';
	  	msg+=(param.capacity)?'':'capacity, ';
	  	msg+=(param.transmission)?'':'transmission';
	    res.json({
	      success:false,
	      errormsg:'Require fields: '+msg
	    });

	}else{
	   next();
	 }
  
};