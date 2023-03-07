
var path = require('path');
var cheerio = require('cheerio');
var loadAsync = require('./LoadAsyncFiles');
var files = [ null , null];

    files[0] =loadAsync.getFiles('content.html');
    files[1] =loadAsync.getFiles('index.html');

    if ( files[0] && files[1] ) {
        indexContent();
        return;
    };

    function index() {
        
        //  - utilizar domparser: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
        //  - utilizar cheerio: https://www.npmjs.com/package/cheerio
        //  - testar se main page ja foi carregada
        //  - se negativo, então, carregar a main page (from pug engine | html file )
        //  - testar se conteúdo ja foi carregado
        //  - se negativo, então, carregar o **conteudo** da main page (from pug engine | html file )
        //  - se não carregou main page identificar o elemento 'content-html' na main page
        //  - se não carregou adicionar o conteudo na main page
        //  - enviar o html
    
        let html ='';
        let content =cheerio.load( files[0] , null, false).html();
        let index =cheerio.load( files[1] );

        index('#html-content').html( content );

        html =index.html();

        console.log('html : ', html);
    };

    function indexContent() {

        let content =cheerio.load( files[0] , null, false).html();
        let html =content;

        console.log('html : ', html);
    };

    loadAsync.load( ['content.html', 'index.html' ] , function(err, readyFiles) {

        //console.log('readyFiles: ', readyFiles);

        if( err ) {
            console.log('error 5005 : ', err);
            
            return false;
        };

        files[0] = readyFiles[0].content;
        files[1] = readyFiles[1].content;

        indexContent();
        return;
    });
