//
// SCRIPT ROTEIA APP
//
var express = require('express');
var router = express.Router();

var homeControll = require('../controllers/homeControle');
var registrarControll = require('../controllers/registrarControle');
var loginControll = require('../controllers/loginControle');
var contatoControll = require('../controllers/contatoControle');

//  router main
router.get("/" , homeControll.index ); 
router.get("/registrar" , homeControll.registrar );
router.get("/login" , homeControll.login );
router.get("/contato" , homeControll.contato );

//  router index

//  router registrar
router.get('/registrar', registrarControll.registrar );
router.get('/registrar_salvar', registrarControll.registrar_salvar );

//  router login
router.get('/login', loginControll.registrar );
router.get('/login_entrar', loginControll.login_entrar );

//  router contato
router.get('/contato', contatoControll.contato );
router.get('/contato_enviar', contatoControll.contato_enviar );
