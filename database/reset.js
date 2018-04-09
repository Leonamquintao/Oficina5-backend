const mysql = require('mysql');
require('dotenv').config();

const reset = (() => {
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  })

  connection.query('DROP DATABASE IF EXISTS `'+ process.env.DB_NAME +'`', (error, result) => {
    if(error) {
      console.log('Erro na remoção do banco! ', error)
    } else {
      console.log('Banco removido com sucesso!')
    }
  });

  connection.query('CREATE DATABASE IF NOT EXISTS `'+ process.env.DB_NAME +'`', (error, result) => {
    if(error) {
      console.log('Erro na criação do banco! ', error)
    } else {
      console.log('Banco criado com sucesso!\n')
    }
  });

  connection.end();
})

reset();
