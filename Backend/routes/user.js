const express = require('express');
const multer = require('multer');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth")
const db = require("../config/database")




// // ROUTES TEST // // 

//router.get('/', (req, res) => res.send('TEST ROUTE')); TEST ROUTE 

// // ROUTES TEST // // 
router.post('/signup', userCtrl.signup); // Fonctionnalit√© d'inscription //Mot de passe de l'utilisatteur chifr√©  // // 
router.post('/login', userCtrl.login); // Fonctionnalit√© de connexion //
router.patch('/:id', auth, userCtrl.modifyUser) // Modification du profil
router.get('/:id', auth, userCtrl.getOneUser)
router.delete('/:id', auth, userCtrl.deleteUser)
router.get('/', auth, userCtrl.getAllUser); // RENVOIE TOUS LES User

router.get('/isAdmin/:true', auth, userCtrl.getAllUserAdmin); // RECUPERER TOUS LES ADMIN 

module.exports = router;