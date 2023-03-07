var postgres_model = require("postgres-model");
var dataTypes = require('./DataTypes');

var User = postgres_model.model(
    {
    'id': { type: dataTypes.SERIAL }, 
    'nome': dataTypes.STRING,
    'sexo':dataTypes.INTEGER,
    'email':dataTypes.STRING
    } );

module.exports = User;