// Gestion  des erreurs 
// inscription
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }


    if (err.message.includes('pseudo'))
        errors.pseudo = "Nickname Incorrect Or Already Taken "

    if (err.message.includes('email'))
        errors.email = 'incorrect Email'

    if (err.message.includes('password'))
        err.password = 'The Password Must Have At Less 6 characters';


    if (err.code === 11000 && (Object.keys(err.keyValue)[0].includes['pseudo']))
        errors.pseudo = 'NikeName Already Registered';

    if (err.code === 11000 && (Object.keys(err.keyValue)[0].includes['email']))
        errors.email = 'Email Already Registered';

    return errors;

};

// connexion 
module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }
    console.log(err);
    if (err.message.includes('email'))
        errors.email = 'Unkonwn Email Or Email ';

    if (err.message.includes('password'))
        errors.password = 'Unkonwn passord Or Email ';
    return errors;
}
