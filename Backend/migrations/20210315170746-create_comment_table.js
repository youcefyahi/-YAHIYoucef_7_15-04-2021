'use strict';
// // Migration  Commentaire // //
module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.createTable("comments", {
            id: {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
            },

            updatedAt: {
                type: Sequelize.DATE,
            },
            userId: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            postId: {
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
        return queryInterface.dropTable('comments')
    }
};