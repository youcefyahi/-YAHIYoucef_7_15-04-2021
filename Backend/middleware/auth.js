const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];



        const decodedToken = jwt.verify(token, 'RAMDOM_TOKEN_SECRET');


        const userId = decodedToken.userId


        if (req.body.userId && req.body.userId !== userId) {
            console.log("nique")
            throw 'User Id invalid';
        } else {

            req["userId"] = userId
            next();
        }
    } catch {
        console.log("nique")
        res.status(401).json({

            error: new Error()

        });


    }
};