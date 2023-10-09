import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import express from "express";

type Person = {
    "id": number,
    "lastname": string,
    "firstname": string,
    "birthdate": number
}

type Data = {
   persons: Person[]
}

const app = express();
const port = 3000 ; 
const adapter = new JSONFile<Data>("db.json")
const defaultData: Data= { persons: [] }
const db = new Low(adapter, defaultData)



async function run() {
    await db.read()
    console.log(db.data)
}

// run()

//get all person
// app.get('/persons',async function (req,res){
//     await db.read();
//     res.send(JSON.stringify(db.data.persons,null,2));
// });

//get personne by id
app.get('/persons/:id',async function (req,res){
    await db.read(); 
    const id = parseInt(req.params.id);

    const analyse = db.data.persons.find(elem => elem.id === id)
    
    if (analyse) {
        res.json(analyse);
    } else {
        res.status(404).json({ message: "Personne non trouvée" });
    }

});

app.listen(port,() => {
    console.log("on ecoute bien sur le port ", port)
}
);