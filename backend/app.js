const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
//this should go in nodemon.json file
/*"MONGO_ATLAS_PASSWORD":"LbbYE48mcjOkUCrX",*/
//
// .connect(
//   "mongodb+srv://tariq:" + process.env.MONGO_ATLAS_PASSWORD+"@tariq-database-clustor-1ny6y.mongodb.net/node-mean-db?retryWrites=true",
//   { useNewUrlParser: true }
// )
mongoose
  .connect(
    "mongodb://localhost:27017/node-mean-db",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch(error => {
    console.log("connection failed" + JSON.stringify(error));
  });

//parse incoming data in body to json
app.use(bodyParser.json());
//request going to /images are farworded to backend/images path is required to construct paths
//by default node stops request going to backend
app.use("/images", express.static(path.join("backend/images")));

//body-parser can also url encoded data extened false means to use only delfault configrtion
//app.use(bodyParser.urlencoded({extened:flase}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
