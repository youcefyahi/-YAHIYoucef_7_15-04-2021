// // COONEXTION A LA BASSE SQL VIA SEQUELIZE // //
const Sequelize = require('Sequelize');
module.exports = new Sequelize('groupomania', "root", "rootmdp", {
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