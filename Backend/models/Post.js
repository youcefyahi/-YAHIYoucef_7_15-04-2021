const Sequelize = require('sequelize');
const db = require('../config/database');


const Post = sequelize.define('Post', {
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
    userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

})

module.exports = Post;