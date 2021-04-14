const Post = require('../models/Post');
const fs = require('fs');




// // CREATION DE POST // // 

exports.createPost = (req, res, next) => {

    const postObject = JSON.parse(req.body.post);
    const post = new Post({
        ...postObject,
        userId: req["userId"],
        signaled: false,




    });




    post.save()
        .then(() => res.status(201).json({ mesage: "post enregistré" }))
        .catch(error => res.status(400).json({ error }))

};


// // MODIFICATION DE POST // // 

exports.modifyPost = (req, res, next) => {
    const postObject = {...req.body.post };
    Post.update(postObject, { where: { id: postObject.id } })
        .then(() => res.status(200).json({ message: 'post modifié avec succès' }))
        .catch(error => res.status(400).json({ error }));
};



// // SUPPRESSION DE POST // // 
exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post non trouvé !' });
            }
            post.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(404).json({ error }));
        })
};


// // RECUPERATION D'UN  POST UNIQUE // //

exports.getOnePost = (req, res, next) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }))
}

// // RECUPERATION DE TOUT  POST UNIQUE // //

exports.getAllPost = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
};


// // RECUPERATION DE TOUT  POST SIGNALED // //
exports.getAllSignaledPost = (req, res, next) => {

    Post.findAll({ where: { signaled: true } })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json({ error }));
};