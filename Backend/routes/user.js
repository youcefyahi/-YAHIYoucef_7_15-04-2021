const express = require('express');
const multer = require('multer');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth")




// // ROUTES TEST // // 

//router.get('/', (req, res) => res.send('TEST ROUTE')); TEST ROUTE 

// // ROUTES TEST // // 
router.post('/signup', userCtrl.signup); // Fonctionnalité d'inscription //Mot de passe de l'utilisatteur chifré  // // 
router.post('/login', userCtrl.login); // Fonctionnalité de connexion //
router.patch('/:id', auth, multer, userCtrl.modifyUser) // Modification du profil
router.get('/:id', auth, userCtrl.getOneUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;