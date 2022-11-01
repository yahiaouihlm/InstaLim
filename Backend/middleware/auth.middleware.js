//  pour la navigation  de utlisateur 
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");


//  tester l'autontification de utlisateur à  durant la navigation  dans le site 
module.exports.checkUser = (req, res, next) => {
    // recupération du  cookie utilisateur  (navigateur) 
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAage: 1 });
                next();
            }
            else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }


}

// authentification de la premier connexion 
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(decodedToken.id);
                next();
            }
        })
    }
    else {
        console.log("No Token ");
    }


}