const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const db = require("../config/database")

router.post('/', auth, multer, postCtrl.createPost) // Création de post

// // LES ROUTE GET // //

router.get('/', auth, postCtrl.getAllPost); // RENVOIE TOUS LES POSTS


router.get('/:id', auth, postCtrl.getOnePost); // RENVOIE TOUS LES POSTS

// // ROUTES PATCH // //

router.patch('/:id', auth, multer, postCtrl.modifyPost) // MISE A JOUR DES POST

// // ROUTES DELETE // //

router.delete('/:id', auth, postCtrl.deletePost) // SUPPRISION DE POST

router.get('/:id', auth, postCtrl.getOnePost) // RENVOIR UN POST PRECIS


module.exports = router;