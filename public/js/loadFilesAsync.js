//
// LEITURA ASINCRONA DE 'N' ARQUIVOS
//

var fs = require('fs');

const promises = [];
const readyFiles = [];

function fileLoad( fileName ) {
    console.log( 'fileLoad' );
       
    return new Promise((resolve, reject) => {
        //console.log('lerArquivo', 3);
        
        fs.readFile(f, (err, data)  /* callback */ => {
            //console.log('lerArquivo ' + pathF, 4, err ? 'Erro' : 'Sucesso');
            err ? reject(err) : resolve( {'name': fileName, 'content': data} );
        })
    });
}

var LoadAsyncFiles = {

    readyFiles: [],
    
    load: async function( files, func ) {
        console.log( 'LoadAsyncFiles.load()');
        // 
        let n =files.lenght-1;
        for (i = 0 to n ) {
            let fileName = files[i];
            let file =readyFiles.find( (file) => { 
                    return file.name === fileName }
                                     );

            if( ! file ) {
                promises.push( fileLoad( file.name ) );
            }
        };
        // 
        Promise.all(promises)
            .then( contents => {
                    contents.forEach( function( content ) { 
                        readyFiles.push( content ) } );
                    };
                    //
                    //  notify loded files
                    //
                    func( null, readyFiles ); )
            .catch( err => {
                //console.log(' error :', err);
                func( err, null )
            });
    },

    getFiles: function ( fileName ) {
        console.log( 'LoadAsyncFiles.getFiles()');

        let file =readyFiles.find( (file) => { 
                return file.name === fileName } );
        return file;
    },
    
    unLoad: function() {
    }
};

exports.LoadAsyncFiles = LoadAsyncFiles;