const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
//require('dotenv').config({ path: './config/.env' });
const { create } = require('../models/user.model');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 2 * 24 * 60 * 60 * 1000;

// création  d'un token de authentification 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 2 * 24 * 60 * 60 * 1000
    })
}


/**
 * 
 * @param {*} req : la requête doit contenir un email , pseudo , password 
 * @param {*} res : revoyer les informations  de utilisateur si trouvé ,  erreur sinon
 * @doc  : la fonction créé un  utilisateur et le stocke 
 */
module.exports.signUp = async (req, res) => {

    const { pseudo, email, password } = req.body
    console.log(email)
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err) {

        const errors = signUpErrors(err)
        res.status(200).send({ errors });
    }
}

/**
 * 
 * @param {*} req : la requête doit contenir un email,password 
 * @param {*} res : revoyer le user id 
 * @doc  : la fonction créé un token de connexion valabe 3  jours  il sera envoyer vers les cookie du client
 */

module.exports.signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = await createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = signInErrors(error);
        res.status(200).json({ errors });
    }
}

// supprimer le cookie de  authentification
//une seule milli-seconde 
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
} 