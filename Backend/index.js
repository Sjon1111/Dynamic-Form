import express from 'express';
import mongoose from 'mongoose';
import { ClientEncryption, MongoClient } from "mongodb";
import router from "./routes/route.js";
import cors from 'cors';

const app = express();
app.use(cors());

const connection_String = "mongodb://127.0.0.1:27017/Form";

mongoose.connect(connection_String)
  .then(() => { console.log("connection successfull") })
  .catch(() => { console.log("connection failed") })

app.use(express.json());
app.use('/Form', router)
app.listen((8000), () => {
  console.log("server is runnung")
})
