const express = require("express");
const uuid = require("../helpers/uuid");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  //Obtain existing notes then return them to the front end
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error in posting note.");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

//writes new note to database
app.post("/", (req, res) => {
  const { title, text } = req.body;
  const dbNotes = require("./db.json");

  // Variable for the object we will save
  const newNote = {
    title,
    text,
    id: uuid(),
  };

  // Obtain existing notes
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error in posting note.");
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new note
      parsedNotes.push(newNote);

      //Write the new notes back to the db file
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

//Deletes a note
app.delete("/", (req, res) => {
  console.log(req.query.delete_id);

  const idToRemove = req.query.delete_id;

  // Reads the notes db 
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error in deleting note.");
    } else {
      const parsedNotes = JSON.parse(data);

      // This goes through each note and stores the ones that don't match the idToRemove var id 
      const filteredNotes = parsedNotes.filter(
        (note) => note.id !== idToRemove
      );

      //Write the notes back to the file minus the one that was meant to be deleted
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(filteredNotes, null, 3),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated Notes!")
      );

      res.status(204).json("Note deleted");
    }
  });
});

module.exports = app;
