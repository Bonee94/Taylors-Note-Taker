const express = require("express");
const dbNotes = require("./db.json");
const uuid = require("../helpers/uuid");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => res.json(dbNotes));

app.post("/", (req, res) => {
  const { title, text } = req.body;

  // Variable for the object we will save
  const newNote = {
    title,
    text,
    id: uuid(),
  };

  // Obtain existing reviews
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error in posting note.");
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new note
      parsedNotes.push(newNote);

      //Write the new notes back to the file
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(parsedNotes, null, 3),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated Notes!")
      );
    }
  });

  const response = {
    status: "Success",
    body: newNote,
  };

  res.status(201).json(response);
});

module.exports = app;
