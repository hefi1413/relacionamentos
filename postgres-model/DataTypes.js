//
// DEFINIÇÃO DE CONSTANTES UTLIZADAS NO APP
//

const

    DataTypes = 
      {
            'PRIMARY_KEY': 100,
            'STRING': 110,
            'INTEGER':120,
            'SERIAL':130,
            'DATE': 140
      },
      get: function( type ) {
          return null;
      };
      



/*

const Foo = sequelize.define('foo', {
 // instantiating will automatically set the flag to true if not set
 flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
 name: { type: Sequelize.STRING, allowNull: false, defaultValue: "test", size: 50 },
: DataTypes.STRING,
 description: Sequelize.TEXT,
 deadline: Sequelize.DATE
 }
