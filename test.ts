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


app.use(express.json());
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
    const newperson = req.body
    await db.read();
    const LastPerson = db.data.persons[db.data.persons.length-1]
    const id = LastPerson ? LastPerson.id + 1 : 1
    db.data.persons.push({id,...newperson,birthdate: -1})
    await db.write()
    res.json(id)
});

//modifier une personne depuis postman
app.patch('/update/:id',async function (req,res){
    const id = parseInt(req.params.id);
    const newperson = req.body
    await db.read();
    const analyse = db.data.persons.find(elem => elem.id === id)
    if (analyse) {
        db.data.persons[id-1] = {...analyse,...newperson}
        await db.write()
        res.json(id)
    } else {
        res.status(404).json({ message: "Personne non trouvée" });
    }
});

//affiche juste une donne en post sur la console
    app.post('/test',async function (req,res){
    const newperson = req.body
    await db.read();
    console.log("newperson",newperson)
});


app.listen(port,() => {
    console.log("on ecoute bien sur le port ", port)
}
);