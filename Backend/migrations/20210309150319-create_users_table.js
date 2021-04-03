'use strict';


// _serse


module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
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
            profilImg: {
                type: Sequelize.STRING,

            },

            isAdmin: {
                type: Sequelize.BOOLEAN,


            },

            createdAt: {
                type: Sequelize.DATE,
            },

            updatedAt: {
                type: Sequelize.DATE,
            },

        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('users')
    }
};