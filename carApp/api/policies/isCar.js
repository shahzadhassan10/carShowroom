module.exports = function isCar (req, res, next) {
	var param=req.params.all();
	if(!param.carData.model||!param.carData.version||!param.carData.make||!param.carData.modelYear||!param.carData.price||!param.carData.mileage||!param.carData.engineType||!param.carData.capacity||!param.carData.transmission){
	  	var msg=(param.carData.model)?'':'model, ';
	  	msg+=(param.carData.version)?'':'version, ';
	  	msg+=(param.carData.make)?'':'make, ';
	  	msg+=(param.carData.modelYear)?'':'modelYear, ';
	  	msg+=(param.carData.price)?'':'price, ';
	  	msg+=(param.carData.mileage)?'':'mileage, ';
	  	msg+=(param.carData.engineType)?'':'engineType, ';
	  	msg+=(param.carData.capacity)?'':'capacity, ';
	  	msg+=(param.carData.transmission)?'':'transmission';
	    res.json({
	      success:false,
	      errormsg:'Require fields: '+msg
	    });

	}else{
	   next();
	 }
  
};