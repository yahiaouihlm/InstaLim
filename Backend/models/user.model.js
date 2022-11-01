
// Model de base de données 
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trimp: true,
        },
        email: {
            type: String,
            require: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            require: true,
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,
            default: './uploads/profil/random-user.png'
        },
        bio: {
            type: String,
            max: 1024,
        },

        followers: {
            type: [String]
        },

        following: {
            type: [String],
        },

        likes: {
            type: [String],
        },


    },
    {
        timestamps: true,
    }
);



// cryptage de mot de  passe 
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// decryptage de mot de passe pour la phase de authentification 
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error("incorrect password");
    }
    throw Error("incorrect email");

}


// création  d'un objet utlisateur avec plein de données 
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;


