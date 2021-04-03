const express = require('express');
const multer = require('multer');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth")
const db = require("../config/database")




// // ROUTES TEST // // 

//router.get('/', (req, res) => res.send('TEST ROUTE')); TEST ROUTE 

// // ROUTES TEST // // 
router.post('/signup', userCtrl.signup); // Fonctionnalité d'inscription //Mot de passe de l'utilisatteur chifré  // // 
router.post('/login', userCtrl.login); // Fonctionnalité de connexion //
router.patch('/:id', auth, userCtrl.modifyUser) // Modification du profil
router.get('/:id', auth, userCtrl.getOneUser)
router.delete('/:id', auth, userCtrl.deleteUser)
router.get('/', auth, userCtrl.getAllUser); // RENVOIE TOUS LES User

module.exports = router;