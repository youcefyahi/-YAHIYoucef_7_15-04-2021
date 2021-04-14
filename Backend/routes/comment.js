const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require("../middleware/auth")

const db = require("../config/database")

router.post('/', auth, commentCtrl.createComment) // Création de post

// // LES ROUTE GET // //

router.get('/', auth, commentCtrl.getAllComment); // RENVOIE TOUS LES commentS


router.get('/:id', auth, commentCtrl.getOneComment); // RENVOIE un  commentaire precicd 

// // ROUTES PATCH // //


// // ROUTES DELETE // //

router.delete('/:id', auth, commentCtrl.deleteComment) // SUPPRISION DE comment

// // ROUTES PATCH // //

router.patch('/:id', auth, commentCtrl.modifyComment) // MISE A JOUR DES POST

router.get('/commentPost/:postId', auth, commentCtrl.getAllCommentByPostId);

router.get('/signaled/:true', auth, commentCtrl.getAllCommentSignaled);

module.exports = router;