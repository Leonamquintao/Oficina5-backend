const user = require('./app/user/Model/UserModel');

exports.authenticate = function(req,res,next) {
  user.validateToken(req.get('Authorization'))
  .then(() =>{
    next()
  }, e => res.status(401).send())
}
