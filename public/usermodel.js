var postgresModel = require("postgresModel");

var User = postgresModel.model({
    "id":100, 
    "nome":'aaabbb',
    "sexo":1,
    "email":'aaabbb@gmail.com'});

//console.log('user: '+ User);

module.exports = User;