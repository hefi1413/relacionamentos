//
// SCRIPT POSTGREMODEL
//

//var Pool = require('pg').pool;

const { Client } = require('pg');
var db = require('../config/db');
var debug = require('debug');
var dataTypes = require('./DataTypes');

// var FieldsProperties = require('FieldsProperties');  IMPLEMENTAR TIPOS PARA AS PROPERTIES .model()

var postgres_model = {
    //
    conn: null,
    //
    model: function( obj ) {
        
        console.log( 'postgres-model.model: ');

        if( obj ) {
            for(var prop in obj) {
                this[prop] =obj[prop];
            }
        };
        return this;
    },
    connect: function( fsuccess, ferror ) {
        
        console.log('postgres-model.connect: ');
        //
        if(this.conn!=null) {
            fsuccess();     //  ja conectado
            return true;
        };
        this.conn =new Client( db.connObj );
        
        let promiss = this.conn.connect();
        
        promiss
            .then( fsuccess )
            .catch( err => {
            
                this.conn =null;

                if( ferror ) {
                    ferror( err );
                }
        });
    },
    disConnect: function() {
        
        console.log( 'postgres-model.desConnect: ');
        
        this.conn.end();
        
        this.conn =null;
        
        return;
    },
    getConnection: function() {
        
        console.log( 'postgres-model.getConnection: ');
        
        return this.conn;
    },
    findById: function(id = null, func =null) {
        
        console.log( 'postgres-model.findById: ');
        //
        let user =null ;
        if( id ) {
            user =this.find( { 'id': id }, func );
        } else {
            user =this.find( null, func );
        };
        //
        return user; 
    },
    findAll: function( func ) {
        console.log( 'postgres-model.findAll: ');
        //
        if(this.conn==null) {
            //
            func( new Error('postgres-model: desconectado.'), null);
            //
            return false;
        };
        //
        let sql =_select( null, null );
        let users =null;
        //
        this.conn.query(sql[0], sql[1], (err, res) => {
            
            if( !err ) {
                users =res.rows;
            };
            //console.table(users);
            
            if( func ) {
                func( err, users );
            };
        });
        //
        return users; 
    },
    find: function( params, func ) {
        
        console.log( 'postgres-model.find: ');
        //
        if(this.conn==null) {
            //
            func( new Error('postgres-model: desconectado.'), null);
            //
            return false;
        };
        //
        let sql =_select( this, params );
        let users =null;
        //
        this.conn.query(sql[0], sql[1], (err, res) => {
            
            if( !err ) {
                users =res.rows;
            };
            
            //console.table(users);
            
            if( func ) {
                func( err, users );
            };
        });
        //
        return users; 
    },
    save: function( func ) {
        
        console.log( 'postgres-model.save: ');
        //
        if(this.conn==null) {
            //
            func( new Error('postgres-model: desconctado.'), null);
            //
            return false;
        };
        //  verifica se é um model
        let result =false;
        if( this.hasOwnProperty('id') ) {
            
            let _id =this.id;
            let sql =['sql', 'values'];

            if( _id>0 ) {
                
                sql =_update( this );       // o registro já existe
                
            } else {            
                
                sql =_insert( this );       // novo registro
            };
            //
            this.conn.query(sql[0], sql[1], (_err, _res) => {
                
                result =!_err;
                
                if( func ) {
                    func( _err, result );
                }
            });
        };
        //
        return result;
    },
    delete: function( params =null, func =null ) {
        
        console.log( 'postgres-model.delete: ');
        //
        if(this.conn==null) {
            //
            func( new Error('postgres-model: desconectado.'), null);
            //
            return false;
        };
        let sql = _delete( this, params);
        //
        this.conn.query(sql[0], sql[1], (err, res) => {
            if( func ) {
                func( err, null );
            }
        });
        //
        return true; 
    }
};


function _property( value ) {

    let result =null;
    
    if( !value ) {
        return false;
    };
    
    if( typeof( value ) === 'integer') {            // simple value 
        result =DataTypes.values().find( value );
    }
    else  if( typeof( value ) === 'object') {       // object value

        let keys= value.keys();
        if( keys.find( 'type' ) ) {                 // DataTypes object

            // procura/cria outros atributos dos **campos**

            result['name'] ='value.type';
            result['type'] =value.type;
            result['allowNull'] =( keys.find( 'allowNull' ) ?value.allowNull :null );
            result['size'] =( keys.find( 'size' ) ?value.size :0 );
            result['default'] =( keys.find( 'default' ) ?value.default :null );
        }
    };
    return result;
}

function _get_property( dataType, data) {
    
    return;
}

function _select( _user, params ) {

    console.log( '_select: ');
    
    let values =[];
    let instrucao = `select * from usuarios`;
    let sql ='';
    
    if( params ) {

        let i= 0;
        sql += ' where';
        
        for(var param in params) {
            
            sql += ' '+ param +' =$'+ ++i +' AND ';
            values.push( params[param] );
        };
        
        let len =sql.length - 5;
        sql = sql.substring(0, len );
        
    } else if( _user ) {
        
        if( _user.hasOwnProperty('id') ) {

            let _id =_user.id;
            sql +=` where id =$1;`;

            values.push( _id );
        }
    };
    instrucao += sql;
    
    console.log('[ sql, values] ->', [ instrucao, values] );
    
    return [ instrucao, values];
}

function _insert( _user ) {
    
    console.log( '_insert: ');
    
    let instrucao = `insert into usuarios `;  // (nome, email) values($1, $2);`;
    let fields =[];
    let values =[];
    let params =[];
    let i =0;
    
    for(var prop in _user) {
        
        let _f =_property( _user[prop] );
        if( _f ) {
           
            fields.push( type.NAME );
            values.push( '$' + ++i );
            params.push( _get_postgre_property( _user[prop] ));
        }
    };
    instrucao += '('+ fields.toString() +') values('+ values.toString() + ') RETURNING id;' ;
    
    console.log('[ sql, params] ->', [ instrucao, params] );
    
    return [ instrucao, params];
}

function _update( _user ) {

    console.log( '_update: ');

    let instrucao = `update usuarios `;           //set nome= $1, email= $2 where id= $30;`;
    let values =[];
    let params =[];
    let i =0;

    for(var prop in _user) {
    
        if( typeof(_user[prop]) != 'function' && typeof(_user[prop]) != 'object' ) {
            values.push( `${prop}= $` + ++i );
            params.push( _user[prop] );
        }
    }
    instrucao += 'set '+ values.toString() +` where id= $`+ ++i;

    params.push( _user['id'] );
    
    console.log('[ sql, params] ->', [ sql, params]);
    
    return [ sql, params];
}

function _delete( _user, params ) {

    console.log( '_delete: ');
    
    let instrucao =`delete from usuarios where `;
    let sql ='';
    let values =[];
    
    if( params ) {
        
        var i=0;
        for(var param in params) {
            
            sql += ' '+ param +' =$'+ ++i +' AND ';
            
            values.push( params[param] );
        };
        
        let len =sql.length - 5;
        sql = sql.substring(0, len );
    
    } else {
        
        let _id =( _user.hasOwnProperty('id') ?_user.id :0 );
        
        if( _id ) {
            
            sql =` id =$1;`;
            
            values.push( _id );
        }
    };
    instrucao += sql;
    
    console.log('[ sql, values] ->', [ instrucao, values] );
    
    return [ instrucao, values];
};

module.exports = postgres_model;