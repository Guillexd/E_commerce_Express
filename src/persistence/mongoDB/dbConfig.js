import mongoose from "mongoose";
import obj from "../../config.js";

const URL_MONGO = obj.uri_mongodb;

mongoose.connect(URL_MONGO)
    .then((response)=>console.log("Succesfully connected to mongoDB"))
    .catch(err => console.log(err));