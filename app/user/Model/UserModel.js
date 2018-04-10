const connection = require('../../../database/dbconnect');
const cn = connection.connect();
const crypto = require('crypto');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

const authUser = (credentials) => {

  return new Promise((resolve, reject) => {

    let query = `SELECT * FROM users WHERE email = ? LIMIT 1;`

    cn.query(query, credentials.email, (err, result) => {
      if(!err && result.length > 0) {

        if(credentials.password === ''){
          reject('Necessário Preencher a Senha')
        }

        if(credentials.password === result[0].password || bcrypt.compareSync(credentials.password, result[0].password)) {
          resolve(result)
        } else {
          reject('Senha incorreta')
        }
      } else {
        reject('E-mail não encontrado')
      }
    })
  })
}

// -------------------------------------------------------------------------- //
const saveNewUser = (credentials) => {

  return new Promise((resolve, reject) => {

    // criação de hash para api_token e hash de password.
    let tk = credentials.email+'-'+credentials.password
    let token = crypto.createHash('md5').update(tk).digest('hex')

    let post = {
      name: credentials.name,
      email: credentials.email,
      password: bcrypt.hashSync(credentials.password, salt),
      api_token: token,
      created_at: new Date()
    }

    let query = `INSERT INTO users
    (name, email, password, api_token, created_at )
    VALUES (?,?,?,?,?)`;

    cn.query(query, [post.name, post.email, post.password, post.api_token, post.created_at], (err, result) => {

      if(!err) {
        authUser(post).then((credentials) => {
          resolve(credentials);
        })
      } else {
        reject(err);
      }
    })
  })
}

// -------------------------------------------------------------------------- //
const validateToken = (token) => {
  return new Promise((resolve, reject) => {
    cn.query(`SELECT COUNT(id) FROM users WHERE api_token = ?`, token, (err, result) => {
      if(!err && result.length > 0) {
        resolve()
      } else {
        reject('Sem autorização de acesso')
      }
    })
  })
}
// -------------------------------------------------------------------------- //

module.exports = { authUser, saveNewUser, validateToken }
