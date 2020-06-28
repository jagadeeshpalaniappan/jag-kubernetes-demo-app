// @ts-nocheck
// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const booksRouter = require("./modules/book/book.route");
const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  "mongodb://jag-mongo-db-service.book-store-ns.svc.cluster.local:27017/books-db";
const DATABASE_URL = process.env.DATABASE_URL || MONGODB_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to MongoDB!", MONGODB_URL));
db.on("error", (err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use("/api/v1/books", booksRouter);
app.listen(PORT, () => console.log(`Book API Server started PORT:${PORT}!`));
