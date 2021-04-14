//MIGRATION DES POSTS
'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable("posts", {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            imageUrl: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            signaled: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            profilImg: {
                type: Sequelize.STRING,

            },
            username: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,


            },

        })
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.dropTable('posts')
    }
};