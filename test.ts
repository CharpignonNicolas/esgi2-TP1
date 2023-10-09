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



// async function run() {
//     await db.read()
//     console.log(db.data)
// }

// run()

//get all person
app.get('/',async function (req,res){
    await db.read();
    res.send(JSON.stringify(db.data.persons,null,2));
});

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

//creé une personne depuis localhost
app.post('/create',async function (req,res){
    const entre : Pick<Person, "firstname"|"lastname"> = req.body
    await db.read();
    const LastPerson = db.data.persons[db.data.persons.length-1]
    const id = LastPerson ? LastPerson.id + 1 : 1
    db.data.persons.push({id, ...entre,birthdate: -1})
    await db.write()
    res.json(db.data.persons[id])

});

app.listen(port,() => {
    console.log("on ecoute bien sur le port ", port)
}
);