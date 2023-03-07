//
// SCRIPT POSTGREMODEL
//

var Pool = require('pg').pool;
var db = require('../config/db');

var postgresmodel = {
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
    save: function( func ) {
        //
        if(conn==null) {
            //
            // func( error, null);
            //
            return false;
        };
        //  verifica se é um model
        if( this.hasOwnProperty('id') ) {
            
            let _id =this.id;
            let sql ='';

            if( _id>0 ) {       // o registro já existe

                sql =`update usuarios set() where id=${_d};`;

            } else {            // novo registro

                sql =`insert into usuarios values();`;

            };
            //
            conn.query(sql, (err, res) => {
                if( func ) {
                    func( err );
                };
            });
        }
        //
        return true;
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
        let sql =`select * from where `+ _where( { 'id': id } );
        let user =null;
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
        let sql = '';
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
        sql =`select * from usuarios where `+ _where( params );
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

module.exports = postgresmodel;