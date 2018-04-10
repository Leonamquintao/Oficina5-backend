const router = require('express').Router();
const Contact = require('../../app/contacts/ContactsController');
const auth = require('../../auth');

router.get('/user/:userId/contacts', (request, response) => {
  Contact.listAllContactsByUser(request.params.userId).then((data) => {
    response.status(200).send(data)
  })
})

router.post('/user/:userId/contact', (request, response) => {
  Contact.saveNewContact(request.params.userId, request.body).then((data) => {
    response.status(200).send(data)
  })
})

router.put('/user/:userId/contact/:contactId', auth.authenticate, (request, response) => {
  Contact.updateContact(request.params.userId, request.params.contactId, request.body)
  .then((data) => {
    response.status(200).send(data)
  })
})

router.delete('/user/:userId/contact/:contactId', (request, response) => {
  Contact.deleteContactById(request.params.userId, request.params.contactId).then((data) => {
    response.status(200).send(data)
  })
})

module.exports = router
