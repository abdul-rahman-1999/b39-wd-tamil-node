// const express = require("express"); // "type": "commonjs" // old type
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from './routes/movies.route.js'
import * as dotenv from 'dotenv'
dotenv.config();
console.log(process.env.MONGO_URL)
const app = express();

const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("MongDB connected");

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 Today is pretty nice day...");
});

app.use(express.json()) // middleware
app.use('/movies', moviesRouter)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export {client}