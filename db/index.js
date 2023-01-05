const express = require("express");
const dbNotes = require("./db.json")

const app = express();


app.get("/", (req, res) => res.json(dbNotes))


module.exports = app;