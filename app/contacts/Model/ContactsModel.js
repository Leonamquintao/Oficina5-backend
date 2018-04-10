const connection = require('../../../database/dbconnect');
const cn = connection.connect();

const listAllContactsByUser = (userId, params = null) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM contacts WHERE user_id = ?`;
    cn.query(query, userId, (err, result) => {
      if(!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  })
}

const saveNewContact = (id, dt) => {
  return new Promise((resolve, reject) => {

    let query = `INSERT INTO contacts (user_id, name, birth, phone,
    email, created_at) VALUES (?,?,?,?,?,?)`;

    cn.query(query, [
      id, dt.name, dt.birth, dt.phone, dt.email, new Date(dt.created_at)
    ], (err, result) => {
      if(!err) {
        dt.circle_id = result.insertId;
        resolve(dt);
      } else {
        reject(err);
      }
    })

  })
}

const updateContact = (id, cid, dt) => {
  return new Promise((resolve, reject) => {

  })
}

const deleteContactById = (userId, conId) => {
  return new Promise((resolve, reject) => {
    cn.query('DELETE FROM contacts WHERE id = ? AND user_id = ?', [ conId, userId ], (err, result) => {
      if(!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  listAllContactsByUser,
  saveNewContact,
  updateContact,
  deleteContactById
}
