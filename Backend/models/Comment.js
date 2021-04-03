const Sequelize = require('sequelize');
const db = require('../config/database');

const Comment = sequelize.define('Comment', {
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
    }



})

module.exports = Comment;