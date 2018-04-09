const router = require('express').Router()
const User = require('../../app/user/UserController')
const auth = require('../../auth')

router.post('/user',(request, response) => {
  User.authUser(request.body).then((data) => {
    response.status(200).send(data)
  }).catch(err => response.status(401).send(err))
})

router.post('/users', (request, response) => {
  User.saveNewUser(request.body).then((data) => {
    response.status(200).send(data)
  })
  .catch(err => response.status(412).send(err))
})

module.exports = router
