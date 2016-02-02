module.exports = function isUserItSelf (req, res, next) {
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
  }else if(req.session.role=='user'&&req.session.user!=req.param('id')){
    res.json({
      success:false,
      errormsg:'Admin OR your own login require'
    });
  }else{
  	next();
  }
};