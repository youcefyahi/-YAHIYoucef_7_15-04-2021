const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');


const User = sequelize.define('User', {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,



    },
    username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,


    },

    firstname: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,


    },

    lastname: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,


    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,


    },

    biographie: {
        type: Sequelize.STRING,
        unique: false,


    },

    isAdmin: {
        type: Sequelize.BOOLEAN,


    },
    profilImg: {
        type: Sequelize.STRING,

    },

    createdAt: {
        type: Sequelize.DATE,
    },

    updatedAt: {
        type: Sequelize.DATE,
    },


})


module.exports = User;