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
            trim: true,
        },

        password: {
            type: String,
            require: true,
            max: 1024,
            min: 6
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



//filtrages des données avant les enregistré dans la base des données 
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// création  d'un objet utlisateur avec plein de données 
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;


