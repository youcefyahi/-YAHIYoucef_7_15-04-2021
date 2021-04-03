const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const db = require("../config/database")

router.post('/', auth, multer, commentCtrl.createComment) // Création de post

// // LES ROUTE GET // //

router.get('/', auth, commentCtrl.getAllComment); // RENVOIE TOUS LES commentS


router.get('/:id', auth, commentCtrl.getOneComment); // RENVOIE un  commentaire precicd 

// // ROUTES PATCH // //


// // ROUTES DELETE // //

router.delete('/:id', auth, commentCtrl.deleteComment) // SUPPRISION DE comment

// // ROUTES PATCH // //

router.patch('/:id', auth, commentCtrl.modifyComment) // MISE A JOUR DES POST




module.exports = router;