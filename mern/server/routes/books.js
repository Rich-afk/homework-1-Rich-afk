import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("books");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("books");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Book not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).send("Error fetching book");
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
    };
    const collection = await db.collection("books");
    const result = await collection.insertOne(newBook);
    res.status(201).send(result);
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book");
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
      },
    };

    const collection = await db.collection("books");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection("books");
    const result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

export default router;
