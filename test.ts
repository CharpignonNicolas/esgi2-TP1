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
    console.log(db.data.persons[1].lastname)
}

run()

//get all person
// app.get('/persons',async function (req,res){
//     await db.read();
//     res.send(JSON.stringify(db.data.persons,null,2));
// });

//get personne by id
app.get('/',async function (req,res){
    await db.read();
    res.json(db.data.persons[1].birthdate);
});

app.listen(3000,() => {
    console.log("on ecoute bien sur le port 3000")
}
);