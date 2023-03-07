//
//  script ciação / definição modelos e banco de dados
//
const { Sequelize } = require('sequelize');
const debug = require('debug')('sequelize');

//debug( 'connObj =>', connObj );

// enviroment variables
//env.config();

//
//  DEFINIE/CRIA BANCO DE DADOS
//

const sequelize =new Sequelize(
    process.env.DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
        logging: false
});


//
//  DEFINIE/CRIA MODELO/TABELA USUARIOS
//
var User =sequelize.define('usuario', {
 id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
  },       
    nome: Sequelize.STRING(200),
    email:Sequelize.STRING(200),
    senha:Sequelize.STRING(60),
    sexo: Sequelize.INTEGER,
    estado_civil: Sequelize.INTEGER,
    iduf: Sequelize.INTEGER,
    idcidade: Sequelize.INTEGER,
    idade: Sequelize.INTEGER,
    disturbios: Sequelize.STRING(10),           // 0 =depressão, 1= ansiedade, 2=bipolar, etc. 
    desenvolvimento: Sequelize.STRING(10),      // 0 =Já consultou psicoterapeuta ,1 =participa grupo psicoeducativo, 3=Realizado(a) financeiramente?
    forma_contato: Sequelize.INTEGER,           //
    historico: Sequelize.TEXT,                  //
    status: Sequelize.INTEGER,                  // ?
    cod_confirmacao: Sequelize.INTEGER,         // armazena o codigo de verificação enviado via email (modulo esqueceu senha?)
    eneagrama: Sequelize.INTEGER,               // armazena o codigo eneagrama do usuario
},
{   timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'usuario' 
});


//
//  DEFINE/CRIA MODELO/TABELA UF
//
var Uf =sequelize.define('uf', {
 id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
  },      
 uf: {
        type: Sequelize.STRING(3),
        allowNull: false
  },      
  descricao: Sequelize.STRING(200)
},
{   timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'uf' 
});
                         


//
//  DEFINE/CRIA MODELO/TABELA CIDADES
//
var Cidade =sequelize.define('cidade', {
 id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
  },       
    iduf: Sequelize.INTEGER,       
    descricao: Sequelize.STRING(200)
},
{   timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'cidade' 
});
                             


//
//  DEFINE/CRIA MODELO/TABELA FOTO
//
var Foto =sequelize.define('foto', {
 idusuario: {
        type: Sequelize.INTEGER
  },       
  foto1: { 
        type:Sequelize.STRING(255)
  },
  foto2: {
        type:Sequelize.STRING(255)
  },
  foto3: {
        type:Sequelize.STRING(255)
  },
  foto4: { 
        type:Sequelize.STRING(255)
  }
},
{   timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'foto' 
});

//console.log('process.env.NODE_ENV :', process.env.NODE_ENV);

//
// verificar variaveis de ambiente
// process, debug e env
//

/*
    if( process.env.NODE_ENV === 'development' ) {
        sequelize.sync( {force: true} ) 
            .then( () => console.log('Sincronizado.') )
            .catch( (err) => console.log('Houve um erro', err) );
    }
*/

if(! parseInt(process.env.DB_DATABASE_CREATED)) {
    sequelize.sync( {force: true} ) 
        .then( () => console.log('Sincronizado.') )
        .catch( (err) => console.log('Houve um erro', err) );
}

exports.sequelize =sequelize; 
exports.User =User; 
exports.Uf =Uf; 
exports.Cidade =Cidade;
exports.Foto =Foto;
