"use strict";
/* interface Person {
    FirstName: string;
    LastName: string ;
}
const myPerson = {
    FirstName: "Nicolas",
    LastName: "CHARPIGNON"
}

function greeter (person:Person){
    return "hello , " + person.FirstName + " voici ton nom de famille " + person.LastName;
}


console.log(greeter(myPerson));

*/
exports.__esModule = true;
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
// Créez un adaptateur pour votre fichier JSON de base de données
var adapter = new FileSync_1["default"]('db.json');
// Créez une instance de la base de données
var db = lowdb_1["default"](adapter);
// Utilisez le type User pour déclarer le schéma de données
var personnes = db.get('Personne');
var newPerson = { id: 1, lastname: 'CHARPIGNON', firstname: 'Nicolas', birthdate: 22022002 };
personnes.push(newPerson).write();
var allPersons = personnes.value();
console.log(allPersons);
var express_1 = require("express");
var app = express_1["default"]();
var port = 3000;
app.get('/', function (req, res) {
    res.send("page d'accueil");
});
app.get('/test', function (req, res) {
    res.send('ceci est un test');
});
console.log("connexion etablie");
app.listen(3000);
