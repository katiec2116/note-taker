
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid')
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// holds all functionc
class Store {
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
        // Pull all notes from db file, parse out, overwrite into empty array placeholder
        return this.read().then(notes => {
            let allNotes = [];
            // parse out current nores
            var note = JSON.parse(notes);
            // add all notes into empty array
            allNotes = allNotes.concat(note)
            return allNotes;
        })
    }

    // utilizes get notes and write notes function
    addNotes(note) {
        // generate random id each time
        let ID = uuidv4();
        // pull data from new note
        const { title, text } = note;
        // new note object to store data from above & adds new ID number
        const newNote = { id: ID, title, text }
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
            .then(notes => this.write(notes.filter(note => note.id != id)))
    }
}

module.exports = new Store();