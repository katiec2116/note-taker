
const util = require("util");
const fs = require("fs");
// const { v4: uuidv4 } = require('uuid')
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// holds all functionc
class Store {
    constructor() {
        // start id off at zero
        this.id = 0;
    }

    // read notes from db
    read() {
        return readFileAsync("./db/db.json", "utf8");
    }

    // write individual note 
    write(note) {
        return writeFileAsync("./db/db.json", JSON.stringify(note))
    }

    // get all notes from db as array
    getNotes() {
        // use read notes to get all the notes and then convert to array
        return this.read().then(notes => {
            let allNotes;
            try {
                // create array of note objects
                allNotes = [].concat(JSON.parse(notes));}
            catch (err) {
                allNotes = [];}
            return allNotes;
        })
    }

    // utilizes get notes and write notes function
    addNotes(note) {
        // let noteId = uuidv4();
        // pull data from new note
        const { title, text } = note;
        // new note object to store data from above & adds new ID number
        const newNote = { id: this.id++, title, text }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote)
    }

    // grab id from selected note
    removeNote(id) {
        // use get notes function to acess array of notes
        return this.getNotes()
        // filter through notes array to get all notes besides the one with the matching ID
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            // rewrite db file with new array
            .then(updatedNotes => this.write(updatedNotes))
    }
}

module.exports = new Store();