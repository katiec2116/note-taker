const db = require("../db/db.json")
const store = require("../db/store")
const fs = require("fs");
const path = require("path");

// body parsing middleware
module.exports = function (app) {
    // app.use(express.urlencoded({ extended: true }));
    // app.use(express.json());


    app.post("/api/notes", function (req, res) {
        store.createNote(req);
    });

    app.get("/api/notes", function (req, res) {
        store.getNotes(res);

    });


};





// GET route
// call function from store.js to get a note

// POST route
// call function from store.js to write a note

// DELETE route
// call function from store.js to delete a note