

var fs =require('fs');
//var arquivos = [ 'content.html' , 'index.html' ];
var files = [ null , null ];
//var data = 0;
var cheerio = require('cheerio');

function lerArquivo( f ) {
    //console.log('lerArquivo', 1);
    
    return new Promise((resolve, reject) => {
        //console.log('lerArquivo', 3);
        
        fs.readFile(f, (err, data)  /* callback */ => {
            //console.log('lerArquivo ' + pathF, 4, err ? 'Erro' : 'Sucesso');
            err ? reject(err) : resolve(data);
        });
    });
}



async function loadFiles() {

    console.log( 'files.log 2');

    const promises = [];
    /*
    for (const arquivo of arquivos) {
        promises.push( lerArquivo( arquivo ) );
    }*/

    promises.push( lerArquivo( 'content.html' ) );

    promises.push( lerArquivo( 'index.html' ) );

    Promise.all(promises)
        .then(conteudoArquivos => {
        //res
        //    .set({ 'Content-Type': 'text/plain' })
        //    .send(conteudoArquivos.join('\n'));
        
            files[0] = cheerio.load( conteudoArquivos[0] , null, false).html();
            files[1] = cheerio.load( conteudoArquivos[1] ).html();
        
            console.log(' arquivo 1 :', files[0] );
        
            console.log(' ****** ');
        
            console.log(' arquivo 2 :', files[1]);
        
            })
        .catch(err => {
            console.log(' error :', err);
            });

};


    console.log( 'log 1');

    loadFiles();

    console.log( 'log 4');
    