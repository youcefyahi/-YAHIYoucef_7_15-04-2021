const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// // CONTROLLER INSCRIPTION // // 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username,
            });


            user.save()
                .then(() => res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id },
                            'RAMDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )


                    })
                    .catch(error => res.status(500).json({ error }))
                )
                .catch(error => res.status(500).json({ error }))
        });

}

// // CONTROLLER CONNEXION // // 

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouver" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "utilisateur non trouver !" })
                    }
                    return res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id },
                            'RAMDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// // MODIFICATION DU PROFIL // // 
exports.modifyUser = (req, res, next) => {
    const userObject = {...req.body.user };
    User.update(userObject, { where: { id: userObject.id } })
        .then(() => res.status(200).json({ message: 'Compte modifié avec succès' }))
        .catch(error => res.status(400).json({ error }));
}; //


// // RECUPERE UN USER // // 

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json({ user }))
        .catch(error => res.status(400).json({ error }));
};



// // SUPPRESSION D'UN USER // // 

exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouver" });
            }
            user.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Utilisateur  supprimé !' }))
                .catch(error => res.status(404).json({ error }));
        })
};



// recuperer tou kles user 

exports.getAllUser = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(404).json({ error }));
};


exports.getAllUserAdmin = (req, res, next) => {
    User.findAll({ where: { isAdmin: true } })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(404).json({ error }));
};