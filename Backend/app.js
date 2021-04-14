const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const path = require('path');

const db = require('../Backend/config/database'); // IMPORTATION DE LA CONFI DE LA BASSE DE LA CONNEXION DE LA BASE DE DONNER 
const cors = require('cors');
const helmet = require('helmet');



// // TEST DB // //

db.authenticate()
    .then(() => console.log('Connexion a la base reussit'))
    .catch(error => ({ error }))


// // COONEXTION A LA BASSE SQL VIA SEQUELIZE // //

const app = express();

app.use(helmet());
app.use(cors());

//app.get('/', (req, res) => res.send('TEST SERVER 1')); //TEST SERVER  1 // 
//app.use(cors());


//  // GESTION DES ACCES //  //

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




// // CORS PACKAGE // // 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));


app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)


module.exports = app;