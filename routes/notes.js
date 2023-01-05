const express = require("express");
const path = require("path");


const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
  //readFromFile('../db/db.json').then((data) => {res.json(JSON.parse(data))})
});

app.post("/notes", (req, res) => {
  if (req) {
    console.log(req.body);
    res.statusCode = 200;
  }
});

module.exports = app;
