const express = require("express");
const app = express();

const path= require('path');
const fs = require('fs');

const PORT = 3001;
// These app.uses connect the back and front end using express

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// This allows the root to be the index.html
app.get('/', (req,res)=>
    res.sendFile(path.join(__dirname , '/public/index.html'))
);
// This allows the /notes page to be the notes.html
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// This shows the db.json notes 
app.get('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json',(err, data)=>{
        if(err){
            throw err;
        }
        res.send(data);
    });
});
//This creates and rewrites the notes in the db.json file when a new one is added
app.post('/api/notes', (req, res)=>{
    fs.readFile('./db/db.json', (err, data)=>{
        if(err){
            throw err;
            }

        let notes =JSON.parse(data);
        let newNote = req.body;
        newNote.id = notes.length + 1; //Makes all the note's ids be increasing incramentally 
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes),(err)=>{
            if(err){
                console.log("this is the problem");
            }
            res.json(newNote);
        });
    });
});

app.listen(PORT, ()=>
     {console.log(`App listening at http://localhost:${PORT}`);
});
