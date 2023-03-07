const createError = require('http-errors');
const express = require('express');

var bodyParser= require('body-parser');
var { User, Foto, Sequelize } = require('../sequelize/sequelize');
var logger = require('morgan');
var debug = require('debug')('app');
var utils = require('../controllers/utils');

const app = express();
const port = 3000;

// Automatically parses form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

debug('Testing %o', 'app' );
debug('--------------------------');

app.get('/', (req, res) => {
    res.redirect('/test');
});

app.get('/test', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    let result = 'Teste ORM Sequelize ';
        result += '<br>--------------------------';
        result += '<br>- Mostra metodos do app: /test';
        result += '<br>- Consultar TODOS registros -> /test/find';
        result += '<br>- Consultar por ID -> /test/find/id/xxx';
        result += '<br>- Consultar por EMAIL -> /test/find/email/xxx';
        result += '<br>- Consultar status da base de dados -> /test/status';
        result += '<br>- Salvar registro -> /test/save';
        result += '<br>- Deletar registro -> /test/delete/id:xxx';
    
    res.send( result );
    
});

app.get('/test/status', (req, res) => {

    debug(req.method + ' ' + req.url);

    console.log('Checking database connection...');
    try {
        sequelize.authenticate();

        console.log('Connection has been established successfully.');
        
        res.send('<br><br>sucesso na conexão. ' );
        
    } catch (error) {

        console.error('Unable to connect to the database:', error);
        
        res.send('<br><br>falha na conexão. ' + err );
        
    };

    return;
});
        
app.post('/test/save', (req, res, next) => {

    debug(req.method + ' ' + req.url);

    let _req ={};
    let _foto ={};

    Object.assign( _req, req.body );

    let id =_req.id;

    if( _req.senha ) {
        _req.senha =utils.createHash(_req.senha);
    };

    
    if(id==0) {        // insert
    
        console.log( 'User.insert' );
        
        delete _req.id;
        
        User.create( _req )
            .then( function(result) {
            
                        _foto.idusuario =result.id;
                        _foto.foto1 = "imagens/social-male.png";
                        _foto.foto2 = "imagens/social-male.png";
                        _foto.foto3 = "imagens/social-male.png";
                        _foto.foto4 = "imagens/social-male.png";
            
                        console.log( 'result.id :', result.id );

                        // atualiza entidade foto
                        Foto.create( _foto )
                            .then( function() {
                                
                                res.send(`usuário: ${_req.email} inserido com sucesso!!`) 
                            })
                            .catch( err => {
                                console.log( 'err:', err );

                                next ( err );
                            });
            })
            .catch( err => {
                console.log( 'err:', err );

                next ( err );
            });

    } else {           // update


        console.log( 'User.update' );
        
        User.update( _req, {where: { 'id': id} } )
            .then( function() {
                        // atualiza entidade foto
                        Foto.update( _req, {where: { 'id': id} } )
                            .then( res.send(`usuário: ${_req.email} alterado com sucesso!!`) )
                            .catch( err => {
                                console.error( 'err:', err );

                                next ( err );
                            });
            })
            .catch( err => {
                console.error( 'err:', err );

                next ( err );
            });
    };

    return true;
});

app.get('/test/find/email/:email', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    let _email =req.params.email;
    
    let results =User.findOne( { where: { 'email': _email }, raw: true} );
    
    results
        .then( user => {
            
            console.log( user );
        
            let _result ='<br> registro selecionado :';
            _result += `<br><br>------------------------<br>`;
            _result += JSON.stringify(user, null, 4);
        
            res.send( _result );
        })
        .catch( err => {
            console.log('Not found!');

            res.send( '<br>' + err );
        });

    return;
    
});

app.get('/test/find/id/:id', (req, res) => {

    debug(req.method + ' ' + req.url);
    
    let _id = req.params.id;

    let results = User.findOne( { where: { 'id': _id }, raw: true} );
    
    results
        .then( user => {
            
            console.log( user );
        
            let _result ='<br> registro selecionado :';
            _result += `<br><br>------------------------<br>`;
            _result += JSON.stringify(user, null, 4);
        
            res.send( _result );
        
        })
        .catch( err => {
            console.log('Not found!');

            res.send( '<br>' + err );
        
        });

    return;
});

app.get('/test/find', (req, res) => {

    debug(req.method + ' ' + req.url);

    let results = User.findAll({raw: true});
    
    results
        .then( users => {
            
            console.table( users );

            let _result ='<br> registros selecionados :'+ users.length ;
            _result +='<br><br> usuários ';

            users.forEach(_user => {
                
                /*
                _result += `<br>------------------------<br>id:  ${_user.id} <br>nome:  ${_user.nome} <br>email:  ${_user.email} <br>sexo: ${_user.sexo}  <br>senha: ${_user.senha}`; */
                
                _result += `<br><br>------------------------<br>`;
                _result += JSON.stringify(_user, null, 4);
                
                
            });
        
            res.send( _result );
        
        })
        .catch( err => {
            console.log('Not found!');

            res.send( '<br>' + err );
        
        });
    
    
    return;
});

app.delete('/test/delete/id/:id', (req, res) => {
    debug(req.method + ' ' + req.url);
    
    //console.log(req.method + ' ' + req.url);

    let _id = req.params.id;
    if( ! _id ){
        _id = req.body.id;
    }

    let results = User.destroy( { where: { 'id': _id }, raw: true} );
    
    results
        .then( user => {
            
            console.log( user );
        
            let _result ='<br> registro removido :';
            _result +='<br><br> usuários ';

            _result += `<br>------------------------<br>id:  ${user.id} <br>nome:  ${user.nome}`;
        
            res.send( _result );
        
        })
        .catch( err => {
            console.error('erro: ', err);

            next( err );
        
        });
    
});

app.get('/test/disconnect', (req, res) => {
    debug(req.method + ' ' + req.url);
    
    //console.log(req.method + ' ' + req.url);
    
    res.send('<br><br>' + ( User.disConnect() ? 'conectado' :'desconectado') );
    
});

app.use(function(req, res, next) {                  //  catch 404 and forward to error handler
  next(createError(404));
});

app.use(function(err, req, res, next) {             //  error handler
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send 500 error page
  let fileName = 'c:/nodejs/node-express4/views/error_500.html';
    
  res.status(err.status || 500);
  //res.render('error_500');
    
  //res.set('Content-Type', "text/html; charset=utf-8");
  res.sendFile(fileName, null, function (err) {
        if (err) {
            next(err);
        }
    });

});

app.listen(port, () => {
    
    //debug(req.method + ' ' + req.url);
    
    debug(`App listening at http://localhost:${port}`);
    
    
})