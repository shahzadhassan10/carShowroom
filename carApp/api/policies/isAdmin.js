module.exports = function isAdmin (req, res, next) {
  if(!req.session||req.session.role!='Admin'){
    res.json({
      success:false,
      errormsg:'Admin Login require'
    });
  }else{
    next();
  }
};