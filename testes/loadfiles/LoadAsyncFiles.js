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
        
        fs.readFile(fileName, (err, data)  /* callback */ => {
            //console.log('lerArquivo ' + pathF, 4, err ? 'Erro' : 'Sucesso');
            err ? reject(err) : resolve( {'name': fileName, 'content': data} );
        })
    });
}

var load = async function( files, func ) {
        console.log( 'LoadAsyncFiles.load()');
        // 
        let fileName;
        let file; 
        let n =files.length - 1;
        for (let i = 0; i <= n; i++) {
            fileName =files[i];
            file =readyFiles.find( (file) => { 
                    return file.name === fileName }
                                     );

            //console.log( 'file:', file);
            if( ! file ) {
                promises.push( fileLoad( fileName ) );
            }
        };
        // 
        Promise.all(promises)
            .then( filesContent => {
                    filesContent.forEach( function( fileContent ) { 
                        
                        //console.log( 'content:', content);
                        
                        readyFiles.push( fileContent ) 
                    } );
                    //
                    //  notify loded files
                    //
                    func( null, readyFiles ); 
            } )
            .catch( err => {
                //console.log(' error :', err);
                func( err, null )
            });
    };

var getFiles = function ( fileName ) {
    console.log( 'LoadAsyncFiles.getFiles()');

    let file =readyFiles.find( (file) => { 
            return file.name === fileName } );
    
    return file;
};

exports.load = load;
exports.getFiles = getFiles;