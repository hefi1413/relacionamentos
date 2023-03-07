//
// LEITURA ASINCRONA DE 'N' ARQUIVOS
//
// ---------------------------------- //
var fs = require('fs');
var winston =require('../../config/winston');

const promises = [];
const readyFiles = [];

function fileLoad( fileName ) {
    winston.log( 'debug', 'fileLoad' );
       
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data)  /* callback */ => {
            err ? reject(err) : resolve( {'name': fileName, 'content': data} );
        })
    });
}

var load = async function( files, func ) {
    winston.log( 'debug', 'LoadAsyncFiles.load()');
    // 
    let fileName;
    let file; 
    let n =files.length - 1;
    for (let i = 0; i <= n; i++) {
        fileName =files[i];
        file =readyFiles.find( (file) => { 
                return file.name === fileName }
                                 );

        //winston.log( 'debug', 'file: '+ file);
        if( ! file ) {
            promises.push( fileLoad( fileName ) );
        }
    };
    Promise.all(promises)
        .then( filesContent => {
                filesContent.forEach( function( fileContent ) { 

                    //console.log( 'content:', content);

                    readyFiles.push( fileContent ) 
                } );
                //  notify loded files
                //
                func( null, readyFiles ); 
        } )
        .catch( err => {
            func( err, null )
        });
};

var getFiles = function ( fileName ) {
    winston.log( 'debug', 'LoadAsyncFiles.getFiles()');

    let file =readyFiles.find( (file) => { 
            return file.name === fileName } );

    return file;
};

var unLoad = function( fileNames ) {
};

// ---------------------------------- //

exports.load = load;
exports.getFiles = getFiles;