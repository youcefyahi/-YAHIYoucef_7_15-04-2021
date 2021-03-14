const Post = require('../models/Post');
const fs = require('fs');



// // CREATION DE POST // // 

exports.createPost = (req, res, next) => {

    const postObject = JSON.parse(req.body.post);
    const post = new Post({
        ...postObject,
        userId: req["userId"]

    });
    post.save()
        .then(() => res.status(201).json({ mesage: "post enregistré" }))
        .catch(error => res.status(400).json({ error }))
};


// // MODIFICATION DE POST // // 

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,



    } : {...req.body };
    Post.updateOne({ _id: req.params.id, }, {...postObject, _id: req.params.id })

    .then(() => res.status(200).json({ message: "post mise a jour" }))
        .catch(error => res.status(404).json({ error }));
};



// // SUPPRESSION DE POST // // 

exports.deletePost = (req, res, next) => {
    Post.findOne({
        where: {


            id: req.params.id
        }

    })


    .then((Post) => {
        console.log("tets")
        Post.deleteOne({
            where: {
                id: req.params.id,

            }
        })

        console.log(error)
            .then(() => res.status(201).json({ message: "objet supprimer" }))
            .catch(error => res.status(404).json(error))

    })

    .catch(error => res.status(404).json({ error }))

}


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