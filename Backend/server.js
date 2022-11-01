const express = require('express');
const bodyparser = require('body-parser');
const cookiePaerse = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env' });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();


// perser les informations  qui viennent depuis le  client en  mode json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookiePaerse());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
})
//routes
app.use('/api/user', userRoutes);



//server
app.listen(process.env.PORT, () => {
    console.log(`Listing on port ${process.env.PORT}`);
})