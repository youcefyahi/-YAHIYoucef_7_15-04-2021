// // COONEXTION A LA BASSE SQL VIA SEQUELIZE // //
const Sequelize = require('Sequelize');
const sequelize = new Sequelize('groupomania', "root", "rootmdp", {
    host: 'localhost',
    dialect: "mysql",
    operatorsAliases: false,


    pool: {
        max: 5,
        min: 0,
        acquires: 3000,
        idle: 10000
    },
});

module.exports = sequelize
global.sequelize = sequelize