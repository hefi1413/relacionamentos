
/*
        DESCRIÇÃO DOS TIPOS DE ENEAGRAMA
*/


function findByType(type) {
    for(let e of enneagrams.group ) {
        if( e.type == type ) {
            return e;
        } 
    };
    return null;
}

const enneagrams = {
        group: [

            {   type: 1, 
                description : 'As pessoas que adotaram o Tipo 1 são centradas na ação, têm um senso prático exigente, que dá prioridade às tarefas a serem realizadas. O vício emocional é a Raiva.',
                leftWing: 8,
                rightWing: 9,
            },

            {   type: 8, 
                description : 'As pessoas deste tipo são centradas na ação ou no planejamento, visando reconhecimento.Têm uma visão mercantilista, que os guia na sua perseguição pelo sucesso. O vício emocional é a Vaidade.',
                leftWing: 1,
                rightWing: 9,
            },

            {   type: 9, 
                description : 'As pessoas deste tipo são centradas na emoção, têm uma percepção aguda dos outros, tornando-se conquistadoras, que sabem como conseguir o que querem das pessoas. O vício emocional é o Orgulho.',
                leftWing: 8,
                rightWing: 1,
            },
        ],

        getWings: function( type ) {
            let eneagram = findByType(type);
            let wings = null;
            if( eneagram ) {
                wings = [eneagram.leftWing, eneagram.rightWing];
            }
            return wings;
        },

        getDescription: function( type ) {
            let eneagram = findByType(type);
            let result =null;
            if( eneagram ) {
                result =eneagram.description;
            }
            return result;
        },
    };

module.exports =enneagrams;