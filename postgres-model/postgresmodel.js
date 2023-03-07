//
// SCRIPT POSTGREMODEL
//

var Pool = require('pg').pool;
var db = require('../config/db');

var postgres_model = {
    //
    conn: null,
    //
    model: function( obj ) {
        if( obj ) {
            for(var prop in obj) {
                this[prop] =obj[prop];
            }
        };
        return this;
    },
    delete: function( params =null, func =null ) {
        //
        if(conn==null) {
            //
            // func( error, null);
            //
            return false;
        };
        //
        let sql =`delete from usuarios where `+ _where( params );
        
        /*
        if( obj ) {
            let key =Object.entries(obj)[0][0];
            let value =Object.entries(obj)[0][1];
            
            sql =`delete from usuarios where ${key} = ${value}`;
        } else {
            
            let _id =( this.hasOwnProperty('id') ?this.id :0 );

            if(_id==0) {
                //
                // func( error, null);
                //
                return false;
            };
            sql =`delete from usuarios where id=${_id};`;
        };
        */
        //
        
        conn.query(sql, (err, res) => {
            if( func ) {
                //
                // 
                //
                func( err, null );
            }
        });
        //
        return true; 
    },
    save: function(req, res, func) {
        //
        if(conn==null) {
            //
            // func( error, null);
            //
            return false;
        };
        
        //  verifica se é um model
        let result =false;
        if( this.hasOwnProperty('id') ) {
            
            let _id =this.id;
            let sql =['sql', 'values'];

            if( _id>0 ) {       // o registro já existe

                sql = _update( req );

            } else {            // novo registro

                sql = _insert( req );

            };
            //
            conn.query(sql[0], sql[1], (_err, _res) => {
                
                result = ! _err;
                
                if( func ) {
                    func( _err );
                }
            });
        };
        //
        return result;
    },
    findById: function(id = null, func =null) {
        //
        if(conn==null) {
            //
            // func( error, null);
            //
            return null;
        };
        /*
        let _id =( this.hasOwnProperty('id') ?this.id :id );
        let user =null;
        
        if( _id==null ) {
            //
            // func( error, null);
            //
            return null;
        };
        */
        //
        let sql ='';
        let user =null;
        if( id ) {
            sql =`select * from where `+ _where( { 'id': id } );
        } else {
            sql =`select * from where `+ _where( null );
        };
        
        conn.query(sql, (err, res) => {
            if( !err ) {
                user =res.rows[0];
            };
            if( func ) {
                func( err, user );
            };
        });
        //
        return user; 
    },
    find( params ) {
        //
        if(conn==null) {
            //
            // func( error, null);
            //
            return false;
        };
        //
        let sql =`select * from usuarios where `+ _where( params );
        let users =null;
        /*
        if( obj ) {
            
            for(var prop in obj) {
                sql += ' ' +prop +  ' = ' + obj[prop] + ' AND ';
            };
            let len =sql.length - 5;
            sql = sql.substring(0, len );
            
        } else {
            let _id =( this.hasOwnProperty('id') ?this.id :null );

            if( _id==null ) {
                //
                // func( error, null);
                //
                return null;
            };
            sql =`id =${_id} `;
        };
        */
        //
        conn.query(sql, (err, res) => {
            
            if( !err ) {
                users =res.rows;
            };
            if( func ) {
                func( err, users );
            };
        });
        //
        return users; 
    },
    connect: function(fsuccess, ferror) {
        //
        if(conn!=null) {
            return true;
        };
        conn =new Client( db.connObj );
        
        conn
        .connect()
        .then( fsuccess )
        .catch( err => ferror( err ) );
    },
    getConnection: function() {
        return this.conn;
    }
};

function _insert( req ) {
    
    const sql = `insert into usuarios(nome, email) values($1, $2) RETURNING *;`;
    const values = [req.param('nome'), req.param('email')];
    
    return [ sql, values];
    
}

function _update( req ) {

    const sql = `update usuarios 
                  set nome= $1, email= $2 
                  where id= $30;`;
    const values = [req.param('nome'), req.param('email')];
    
    return [ sql, values];
    
}

function _where( params ) {
    
    let sql ='';
    if( params ) {

        for(var prop in paramsj) {
            sql += ' ' +prop +  ' = ' + params[prop] + ' AND ';
        };
        
        let len =sql.length - 5;
        sql = sql.substring(0, len );
    
    } else {
        
        let _id =( this.hasOwnProperty('id') ?this.id :0 );
        
        if( _id ) {
            
            sql = ` id=${_id};`;
            
        }
    };
    return sql;
};

module.exports = postgres_model;