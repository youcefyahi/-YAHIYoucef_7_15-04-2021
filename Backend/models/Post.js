const Sequelize = require('sequelize');
const db = require('../config/database');


const Post = db.define('post', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

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
    videoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    gifUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    }

})

module.exports = Post;