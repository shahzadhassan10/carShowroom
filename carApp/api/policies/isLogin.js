module.exports = function isLogin (req, res, next) {
  if(!req.session||!req.session.user){
    res.json({
      success:false,
      errormsg:'Login require'
    });
  }else{
    next();
  }
};