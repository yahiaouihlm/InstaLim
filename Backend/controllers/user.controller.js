const { model } = require("mongoose");
const UserModel = require("../models/user.model"); //  le modele de utilisateur dans la base de données
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}


module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Unknown : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log("ID unknown " + err);

    }).select('-password');

};

//  mettre à  jour les inforamtion de utilisateur 

module.exports.updateUser = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Unknown : ' + req.params.id)

    try {
        await UserModel.findByIdAndUpdate(
            { _id: req.params.id },

            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (error) {
        //return res.status(505).json({ message: error });
    }

};


// suppression  d'un utilisateur 
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Unknown : ' + req.params.id)

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "succefully deleted" })
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}


// lorsque un utlisateur follow un  autre --> ajouter à la liste des follower 
//                                        --> ajouter à  la liste des following 
module.exports.follow = async (req, res) => {

    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('Unknown : ' + req.params.id)

    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upser: true },
            // (err, docs) => {
            //     if (err) res.status(400).json(err);
            // }
        );

        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upser: true },
            (err, docs) => {
                //     console.log(docs);
                //     //        if (!err) res.status(201).json(docs);
                if (!err) res.status(201).json(docs);
                if (err) res.status(400).json(err);
            }
        );


    } catch (error) {

    }


    // try {
    //     await UserModel.findByIdAndUpdate(
    //         req.params.id,
    //         { $addToSet: { following: req.body.idToFollow } },
    //         { new: true, upser: true },
    //         (err, docs) => {
    //             console.log("toto");
    //             if (err) res.status(400).json(err);
    //             if (!err) {
    //                  UserModel.findByIdAndUpdate(
    //                     req.body.idToFollow,
    //                     { $addToSet: { followers: req.params.id } },
    //                     { new: true, upser: true },
    //                     (err, docs) => {
    //                         //     console.log(docs);
    //                         //     //        if (!err) res.status(201).json(docs);
    //                         if (!err) res.status(201).json(docs);
    //                         if (err) res.status(400).json(err);
    //                     }
    //                 );
    //                 res.status(201).json(docs);
    //             }
    //         }
    //     );


















}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow))
        return res.status(400).send('Unknown : ' + req.params.id)



    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upser: true },
            // (err, docs) => {
            //     if (err) res.status(400).json(err);
            //     else res.status(400).json(docs);
            // }
        );
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upser: true },
            (err, docs) => {
                console.log(docs);
                if (!err) res.status(201).json(docs);
                if (err) res.status(400).json(err);
            }
        );

        console.log('am  here  ');


    } catch (error) {

    }
}



