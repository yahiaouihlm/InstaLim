const express = require('express');
const bodyparser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env' });
require("./config/db");
const app = express();



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//routes
app.use('/api/user', userRoutes);



//server
app.listen(process.env.PORT, () => {
    console.log(`Listing on port ${process.env.PORT}`);
})