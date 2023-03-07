
const saltRounds =10;

var bCrypt = require('bcrypt');
var winston =require('../config/winston');

exports.createHash = function createHash(password){
    winston.log('debug' ,'utils.createHash');
    
    let salt =bCrypt.genSaltSync(saltRounds);
    return bCrypt.hashSync(password ,salt);
}

exports.getPassword = function getPassword(password, hash){
    winston.log('debug' ,'utils.getPassword');
     
    return bCrypt.compareSync(password, hash);
}