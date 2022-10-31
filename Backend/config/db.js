const mongoose = require("mongoose");
require('dotenv').config('./config/.env')
mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@alim.ctavf.mongodb.net/test")
    .then(() => console.log("connected to  MongoDB"))
    .catch((err) => console.log("Failed to  connect to MongoDB", err));

