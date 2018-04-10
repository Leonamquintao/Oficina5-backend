const user = require('./app/user/Model/UserModel');

exports.authenticate = (request, response, next) => {
  user.validateToken(request.get('Authorization')).then(() => {
    next()
  }, err => response.status(401).send())
}
