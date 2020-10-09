const express = require("express");
const app = express();
const notes = require("../db/db.json")
const Store = require("../db/store")
// const fs = require("fs");
// const path = require("path");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        Store.getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
        });

    app.post("/api/notes", function (req, res) {
        Store.writeNotes(req.body)
        .then(notes => (res.json(notes)))
        .catch(err => res.status(500).json(err))
        });


    app.delete("/api/notes/:id"), function(req,res){
        Store.deleteNote(req.params.id)
        .then(() => res.json({okay: "true"}))
        .catch(err => res.status(500).json(err))
        }
    
}





// GET route
// call function from store.js to get a note

// POST route
// call function from store.js to write a note

// DELETE route
// call function from store.js to delete a note