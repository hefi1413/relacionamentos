const express = require('express');

var bodyParser= require('body-parser');
//var User = require("../model/usermodel");
var { User, sequelize } = require('../model/sequelize');
var logger = require('morgan');
var debug = require('debug')('app');

const app = express();
const port = 3000;

// Automatically parses form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


debug('Testing %o', 'app' );
debug('--------------------------');

app.get('/test', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    let result = 'TESTE do APP: NODE-EXPRESS4 ';
        result += '<br>--------------------------';
        result += '<br>- Mostra metodos do app: /test';
        result += '<br>- Consultar TODOS registros -> /test/find';
        result += '<br>- Consultar por ID -> /test/find/id:xxx';
        result += '<br>- Conectar com base de dados -> /test/connect';
        result += '<br>- Consultar status da base de dados -> /test/status';
        //result += '- Consultar por campo especifico -> \test\xxx:xxx';
        result += '<br>- Salvar registro -> /test/save';
        result += '<br>- Deletar registro -> /test/delete';
        //result += '- Deletar registro -> \test\delete\id');
    
    res.send( result );
    
});

app.get('/test/connect', (req, res) => {

    debug(req.method + ' ' + req.url);

    //console.log(req.method + ' ' + req.url);
    
    console.log('Checking database connection...');
    try {
        sequelize.authenticate();

        console.log('Connection has been established successfully.');
        
        res.send('<br><br>sucesso na conexão. ' );
        
    } catch (error) {

        console.error('Unable to connect to the database:', error);
        
        res.send('<br><br>falha na conexão. ' + err );
        
    }

    /*
    User.connect( 
        function() {
            res.send('<br><br>sucesso na conexão. ' );
        },
        function( err ) {
            res.send('<br><br>falha na conexão. ' + err );
        } );
    */
    return;
});
        
app.post('/test/save', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    User.id = req.body.id;
    User.nome = req.body.nome;
    User.email = req.body.email;
    User.sexo = req.body.sexo;

    User.save( function( err, result ) {

        if( err ) {
            
            res.send('houve algum problema ao registrar. ' + err );
            
            return false;
        }
    });
    
    res.send(`usuário: ${User.email} salvo com sucesso!!`);

    return true;
});

app.get('/test/find/email/:email', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    //console.log(req.method + ' ' + req.url);

    let email = req.params.email;
    
    var params = {'email':email};

    
    let user = User.findOne({ where: params });
    if (user === null) {
      console.log('Not found!');
    } else {
      console.log(user instanceof User); // true
      console.log(user.nome); // 'Nome usuario'
    }    
    
    /*
    User.findOne( params,  function( err, result ) {

        if( err ) {
            
            res.send('<br>' + err);
            
        } else {
            
            let _result ='<br> registros selecionados :'+ result.length ;
                _result +='<br><br> usuários ';
            
                result.forEach(_user => {
                    //console.log(`Id: ${row.id} Name: ${row.name} Price: ${row.price}`);
                    _result += `<br>------------------------<br>id:  ${_user.id} <br>nome:  ${_user.nome} <br>email:  ${_user.email} <br>sexo:  ${_user.sexo}`;
                });
            
            
            res.send( _result );
            
            return true;
            
        }

    } );*/


    return;
    
});

app.get('/test/find/id/:id', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    let id = req.params.id;

    User.findById( id,  function( err, result ) {

        if( err ) {
            
            res.send('<br>' + err);

            return false;
            
        };
        
        let _result ='<br> registros selecionados :'+ result.length ;
            _result +='<br><br> usuários ';

            result.forEach(_user => {
                //console.log(`Id: ${row.id} Name: ${row.name} Price: ${row.price}`);
                _result += `<br>------------------------<br>id:  ${_user.id} <br>nome:  ${_user.nome} <br>email:  ${_user.email} <br>sexo:  ${_user.sexo}`;
            });

        res.send( _result );

    } );
    
    return;
});

app.get('/test/find', (req, res) => {

    debug(req.method + ' ' + req.url);
    

    let users = User.findAll();
    if (users === null) {
        console.log('Not found!');
        
        res.send('<br>' + err);

        return false;
        
    } else {
        let _result ='<br> registros selecionados :'+ users.length ;
            _result +='<br><br> usuários ';

            users.every(_user => {
                //console.log(`Id: ${row.id} Name: ${row.name} Price: ${row.price}`);
                _result += `<br>------------------------<br>id:  ${_user.id} <br>nome:  ${_user.nome} <br>email:  ${_user.email} <br>sexo:  ${_user.sexo}`;
            });

        res.send( _result );
    }    
        
    /*
    User.findAll( function( err, result ) {

        if( err ) {
            
            res.send('<br>' + err);

            return false;
            
        };
            
        let _result ='<br> registros selecionados :'+ result.length ;
            _result +='<br><br> usuários ';

            result.forEach(_user => {
                //console.log(`Id: ${row.id} Name: ${row.name} Price: ${row.price}`);
                _result += `<br>------------------------<br>id:  ${_user.id} <br>nome:  ${_user.nome} <br>email:  ${_user.email} <br>sexo:  ${_user.sexo}`;
            });


        res.send( _result );

        return result;
            
    } );
    
    */
    
    return;
});

app.get('/test/delete/:id', (req, res) => {
    debug(req.method + ' ' + req.url);
    
    //console.log(req.method + ' ' + req.url);

    let id ={ 'id':req.params.id };
    
    res.send('<br><br>' + ( User.delete( id ) ? 'conectado' :'desconectado') );
    
});

app.get('/test/status', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    //console.log(req.method + ' ' + req.url);
    
    res.send('<br><br>' + ( User.getConnection() ? 'conectado' :'desconectado') );
    
});

app.get('/test/disconnect', (req, res) => {
    debug(req.method + ' ' + req.url);
    
    //console.log(req.method + ' ' + req.url);
    
    res.send('<br><br>' + ( User.disConnect() ? 'conectado' :'desconectado') );
    
});
    


// connect to DB
function connect() {
    
  console.log('Checking database connection...');
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    //process.exit(1);
  }
}

app.listen(port, () => {
    
    //debug(req.method + ' ' + req.url);
    
    debug(`App listening at http://localhost:${port}`);
    
    
})