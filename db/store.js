// // // class for notes

// const util = require("util");
// const fs = require("fs");
// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile)
// const { v4: uuidv4 } = require('uuid')


// class Store {
//     constructor(){
//         read() {
//         return readFileAsync("./db/db.json", 'utf-8')
//     };

//     write(note) {
//         return writeFileAsync("./db/db.json", JSON.stringify(note))
//     };

//     addNotes(note) {
//         const { title, text } = note;
//         let id = uuidv4();
//         const newNote = {id, title, text, }
//         console.log(newNote)
//         return getNotes()
//             .then(notes => [...notes, newNote])
//             .then(updateNotes => this.write(updateNotes))
//             .then(() => newNote)
//     };

//     getNotes() {
//         return this.readNotes().then(notes => {
//             console.log(notes)
//             let notesArray;
//             try {
//                 notesArray = [].concat(JSON.parse(notes));
//             }
//             catch (err) {
//                 notesArray = [];
//             }
//             return notesArray;
//         })

//     }

//     removeNote(id) {
//         return this.getNotes()
//             .then(notes => notes.filter(note => note.id !== id))
//             .then(updateNotes => this.write(updateNotes))
//     }
//     }
// }

// module.exports = new Store();


const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid')

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
        console.log(note)
        return writeFileAsync("./db/db.json", JSON.stringify(note))
    }
    // get all notes from db as array
    getNotes() {
        return this.read().then(notes => {
            let notesArray;
            try {
                notesArray = [].concat(JSON.parse(notes));}
            catch (err) {
                notesArray = [];}
            return notesArray;
        })

    }
    // utilizes get notes and write notes function
    addNotes(note) {
        let noteId = uuidv4();
        // pull data from new note
        const { title, text } = note;
        // new note object to store data from above & adds new ID number
        const newNote = { id: noteId, title, text }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote)

    }
    // grab id from selected note

}

module.exports = new Store();