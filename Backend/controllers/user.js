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
                .then(() => res.status(200).json({ message: 'Utilisateur crée' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

// // CONTROLLER CONNEXION // // 

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
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
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
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
    const userObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    } : {...req.body };
    User.updateOne({ _id: req.params.id, }, {...userObject, _id: req.params.id })

    .then(() => res.status(200).json({ message: "profil mise a jour" }))
        .catch(error => res.status(404).json({ error }));
};


// // RECUPERE UN USER // // 

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};



// // SUPPRESSION D'UN USER // // 

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                User.deleteOne({ _id: req.params.id })
                    .then(() => res.status(201).json({ message: "Utillisatteur  supprimer" }))
                    .catch(error => res.status(404).json({ error }))

            });


        })
}