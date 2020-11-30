var uniqid = require("uniqid");
var fs = require("fs");
var notesdb = require("../db/db.json");


// routing
module.exports = function(app) {
  // API GET Requests JSON file
  app.get("/api/notes", function(req, res) {
    res.json(notesdb);
  });

  // API POST 
  app.post("/api/notes", function(req, res) {
    
    // npm i uniqid ======= install dependencies
    let noteJ = {
      id: uniqid("BB-"), //i added "BB" as identifier for my uniqid. you will get something like"BBkdjkjflkdj9890dkn09"
      title: req.body.title,
      text: req.body.text
    }

    //  read file and parse
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let newD = JSON.parse(data);
      
      // Push new record into noteJ Array
      newD.push(noteJ);

      // Write file 
      fs.writeFile("./db/db.json", JSON.stringify(newD), (err) => {
        if (err) throw err;
      notesdb = newD;
      res.send(notesdb);
      });

    });
  });

  // API Delete 
  app.delete("/api/notes/:id", function(req, res) {
    let deleteID = req.params.id;

    // read file and parse 
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let newD = JSON.parse(data);

      // ID record to delete and splice
      for (let i=0; i< newD.length; i++) {
        if (newD[i].id === deleteID) {
          newD.splice(i,1);
        }
      }  

     
      // re-write file
      fs.writeFile("./db/db.json", JSON.stringify(newD), (err) => {
        if (err) throw err;
      notesdb = newD;
      res.send(notesdb);
      });
    });
  });

  
};