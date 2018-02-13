const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); // générateur de template

app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/01_form.htm" );
})

app.get('/membres', (req, res) => {
 console.log('la route route get /membres = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue gabarit.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresses: resultat});
 }) 
})

let db; // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})