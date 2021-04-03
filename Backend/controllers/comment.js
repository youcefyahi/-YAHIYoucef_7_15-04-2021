const Comment = require('../models/Comment');
const fs = require('fs');



// // CREATION DU COMMENTAIRE // //

exports.createComment = (req, res, next) => {

    const commentObject = JSON.parse(req.body.comment);
    const comment = new Comment({
        ...commentObject,
        userId: req["userId"],
        PostId: req.params.id,
        signaled: false


    });

    comment.save()
        .then(() => res.status(201).json({ mesage: "Commentaire enregistré" }))
        .catch(error => res.status(400).json({ error }))

};


// // CREATION DU COMMENTAIRE // //


// // MODIFICATION DU COMMENTAIRE // // 



// // MODIFICATION DU COMMENTAIRE // //

// // SUPPRESION DE COMMENTAIRE // // 

// // SUPPRESSION DE POST // // 
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ error: 'commentaire non trouvé !' });
            }
            comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
                .catch(error => res.status(404).json({ error }));
        })
};


// // SUPPRESION DE COMMENTAIRE // //



// // RECUPERATION D'UN  COMMENTAIRE UNIQUE // //

exports.getOneComment = (req, res, next) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }))
}


// // RECUPERATION D'UN  COMMENTAIRE UNIQUE // //



// // RECUPERATION DE TOUT  COMMENTAIRE  // //

exports.getAllComment = (req, res, next) => {
    Comment.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
};

// // RECUPERATION DE TOUT  COMMENTAIRE

// //  MODIFIER COMMENTAIRE // //


exports.modifyComment = (req, res, next) => {
    const commentObject = {...req.body.comment };
    Comment.update(commentObject, { where: { id: commentObject.id } })
        .then(() => res.status(200).json({ message: 'commentaire modifié avec succès' }))
        .catch(error => res.status(400).json({ error }));
};