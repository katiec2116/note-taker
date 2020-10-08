// // class for notes


class Note {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }
}

const db = require("./db.json")
// defined functions that read write and delete
const fs = require("fs");
const path = require("path");


createNote = function(req){
    fs.readFile("./db/db.json", 'utf-8', function (err,data) {
        if (err){return console.log(err)}

        console.log(req.body);
        note = {title: req.body.title, text: req.body.text};
        var noteList = JSON.parse(data);
        noteList.push(note)
        console.log(noteList)
        fs.writeFile("./db/db.json", JSON.stringify(noteList, null, 2), "utf8",(err) => {
            if (err) throw err;})
    })
}


getNotes = function(res){
    fs.readFile("./db/db.json", 'utf-8', function (err,data) {
        if (err){return console.log(err)
        }
        return res.json(data)
        
    })
}

deleteNote = function(req){
    fs.readFile("./db/db.json", 'utf-8', function (err,data) {
        if (err){return console.log(err)
        }
        
        
})}



//   function (err, notes) {
//     var notesParse = JSON.parse(notes);
//     console.log(notesParse)
//     var x = JSON.stringify(req.body);
//     console.log(x)
//     // notesParse.push(x)
//     fs.writeFile("./db/db.json", notesParse, 'utf-8',(err) => {
//         if (err) throw err;})
//     // res.json(true) 
//     })

exports.createNote = createNote;
exports.getNotes = getNotes;