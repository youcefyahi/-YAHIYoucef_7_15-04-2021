const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RAMDOM_TOKEN_SECRET');
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id invalid';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requete non identifié !')
        });
    }
};