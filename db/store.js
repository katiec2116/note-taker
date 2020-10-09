// // class for notes

const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)


class Store {

    getNotes() {
        return readFileAsync("./db/db.json", 'utf-8')
    };

    writeNotes(note) {
        return writeFileAsync("./db/db.json", JSON.stringify(note))
    };

    appendNote(note) {
        const { title, text } = note;
        const newNote = { title, text, }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote)
    };

    
}

module.exports = new Store();
