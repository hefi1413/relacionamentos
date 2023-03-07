//
// SCRIPT CONTROLE REGISTRAR
//

const { User, Foto, sequelize } = require('../sequelize/sequelize');
const path = require('path');
const bCrypt = require('bcrypt');
const saltRounds =10;
const winston =require('../config/winston');

function createHash(password){
    winston.log('debug' ,'preferControll.createHash');

    let salt =bCrypt.genSaltSync(saltRounds);
    return bCrypt.hashSync(password ,salt);
}
function getPassword(password, hash){
    winston.log('debug' ,'preferControll.getPassword');

    return bCrypt.compareSync(password, hash);
}

const registrarControll = {
    // --------------------------
    registrar: async function(req, res, next) {
        let fileName = 'c:/nodejs/node-express4/public/includes/registrar.html';
        
        res.set('Content-Type', "text/html; charset=utf-8");
        res.sendFile(fileName, null, function (err) {
            if (err) {
                // 
                // error 500
                //
                next(err);
            }
        });
        return null;
    },
    save: async function(req, res, next) {
        let { nome, email, senha }  =req.body;
        
        // verifica existencia do usuario na base
        let results = await User.findOne( { where: { 'email': email }, raw: true} );

        //console.log('nome', nome);
        //console.log('email', email);
        if( results ) {
            res.send( {'message': `O email ${email} já esta registrado na base !` ,'err' : true} );
            return;
        };
        // usuário não existe e pode ser reistrado
        const imagepreview =process.env.APP_IMAGE_PREVIEW;
        const disturbios ='0';      // depressão
        const desenvolvimento ='0'; // ja consultou psicoterapeuta
        
        // start transaction
        const t = await sequelize.transaction();
        try {
            const user =await User.create( { 
                'nome':nome, 
                'email':email, 
                'senha':createHash(senha),
                'desenvolvimento':desenvolvimento,
                'disturbios':disturbios} );
            
            //console.log('user:', user.id);
            
            await Foto.create( {'idusuario':user.id ,'foto1':imagepreview ,'foto2':imagepreview ,'foto3':imagepreview ,'foto4':imagepreview} );
            
            //
            // ENVIA EMAIL CONFIRMAÇÃO
            //
            
            // finalize transaction
            await t.commit();
            
            res.send( { 'message': `usuário: ${email} registrado com sucesso!!`, 'err': false} )
        }
        catch( err ) {
            await t.rollback();
            //
            winston.log('error', err.message );
            console.log('error:', err);
            res.send( { 'message': `houve algum problema ao registrar o usuário ${email}.`, 'err': true} );
        };
    }
};

module.exports =registrarControll;