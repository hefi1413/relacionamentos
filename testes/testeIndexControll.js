var fs = require('fs');
const util = require('util');
var cheerio = require('cheerio');
const promises = [];

let files = [ null, null ];

//
// SCRIPT CONTROLE INDEX
//

function fileLoad( f ) {
    //console.log('lerArquivo', 1);

    console.log( 'log 3');
       
    return new Promise((resolve, reject) => {
        //console.log('lerArquivo', 3);
        
        fs.readFile(f, (err, data)  /* callback */ => {
            //console.log('lerArquivo ' + pathF, 4, err ? 'Erro' : 'Sucesso');
            err ? reject(err) : resolve(data);
        });
    });
}

async function loadFiles() {

    console.log( 'log 2');

    promises.push( ( files[0] != null ) ? null : fileLoad( 'content.html' ) );
    promises.push( ( files[1] != null ) ? null : fileLoad( 'index.html' ) );

};


var testeIndexControll = {
    
    // --------------------------
    render: function(req, res, next) {
        
        console.log("testeIndexControll.render");

        console.log(req.method + ' ' + req.url);
        
        //  - utilizar domparser: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
        //  - utilizar cheerio: https://www.npmjs.com/package/cheerio
        
        //  - testar se main page ja foi carregada
        //  - se negativo, então, carregar a main page (from pug engine | html file )
        //  - testar se conteúdo ja foi carregado
        //  - se negativo, então, carregar o **conteudo** da main page (from pug engine | html file )
        //  - se não carregou main page identificar o elemento 'content-html' na main page
        //  - se não carregou adicionar o conteudo na main page
        //  - enviar o html

        if (req.url == '/') {
            
            files = [ null, null ];
        }
        
        loadFiles();

        Promise.all(promises)
            .then( conteudoArquivos => {
            //res
            //    .set({ 'Content-Type': 'text/plain' })
            //    .send(conteudoArquivos.join('\n'));

                let html ='';
                let content ='';
                if( ! files[0] ) {
                    files[0] = cheerio.load( conteudoArquivos[0] , null, false);
                }
                content =files[0].html();
                html =content;
            
                if( ! files[1] ) {
                    files[1] = cheerio.load( conteudoArquivos[1] );
                    files[1]('#html-content').html( content );
                    html =files[1].html();
                }
                //
                console.log(' html :', html );

                res.send( html );

                })
            .catch(err => {
                console.log(' error :', err);
            });

        
        console.log('log 4');
        
        return null;
        
    }
    
};

//testeIndexControll.render();

module.exports = testeIndexControll;