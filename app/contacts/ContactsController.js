const ContactsModel = require('./Model/ContactsModel');

const Contacts = {
  listAllContactsByUser(id) {
    return new Promise((resolve, reject) => {
      ContactsModel.listAllContactsByUser(id).then((data) => {
        resolve(data)
      })
    })
  },

  saveNewContact (id, data) {
    return new Promise((resolve, reject) => {
      ContactsModel.saveNewContact(id, data).then((res) => {
        resolve(res)
      }).catch((err) => { reject(err) })
    })
  },

  updateContact (id, cid, data) {
    return new Promise((resolve, reject) => {
      ContactsModel.updateContact(id, cid, data).then((res) => {
        resolve(res)
      }).catch((err) => { reject(err) })
    })
  },

  deleteContactById (userId, circleId) {
    return new Promise((resolve, reject) => {
      ContactsModel.deleteContactById(userId, circleId).then((data) => {
        resolve(data)
      })
    })
  },
}

module.exports = Contacts;
