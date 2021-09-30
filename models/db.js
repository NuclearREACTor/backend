//db.js

const mongoose = require("mongoose");

const url = `mongodb+srv://new_user1:mdbadminUser@cluster0.futvw.mongodb.net/foodAppDB?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connectDB() {
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
}

module.exports = connectDB;
