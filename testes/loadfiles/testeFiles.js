

var fs =require('fs');
var data = 0;
var arquivos = [ 'content.html', 'index.html'];

function lerArquivo(pathF) {
    //console.log('lerArquivo', 1);
    
    return new Promise((resolve, reject) => {
        //console.log('lerArquivo', 3);
        
        fs.readFile(pathF, (err, data) /* callback */ => {
            //console.log('lerArquivo ' + pathF, 4, err ? 'Erro' : 'Sucesso');
            err ? reject(err) : resolve(data);
        });
    });
}



async function loadFiles() {

    console.log( 'files.log 2');

    const promises = [];
    for (const arquivo of arquivos) {
        promises.push(lerArquivo(arquivo));
    }

    Promise.all(promises)
        .then(conteudoArquivos => {
        //res
        //    .set({ 'Content-Type': 'text/plain' })
        //    .send(conteudoArquivos.join('\n'));
        
            console.log(' arquivo 1 :', conteudoArquivos[0]);
            console.log(' arquivo 2 :', conteudoArquivos[1]);
        
            })
        .catch(err => {
            console.log(' error :', err);
            });

};


    console.log( 'log 1');

    loadFiles();

    console.log( 'log 4');
    