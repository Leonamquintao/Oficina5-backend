const UserModel = require('./Model/UserModel');

const Users = {
  authUser (credentials) {
    return new Promise((resolve, reject) => {
      UserModel.authUser(credentials).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  saveNewUser (credentials) {
    return new Promise((resolve, reject) => {
      UserModel.saveNewUser(credentials).then((data) => {
        resolve(data)
      }).catch((err) => {
        if(err.code = 'ER_DUP_ENTRY'){
          reject("Já existe um usuário cadastrado com o e-mail informado.")
        }
        reject('Ocorreu um erro ao salvar usuário, tente novamente mais tarde.')
      })
    })
  },
}

module.exports = Users;
