const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); // générateur de template

app.get('/accueil', function (req, res) {
 res.render('formulaire.ejs');
})

app.get('/adresses', (req, res) => {
 console.log('la route route get /adresses = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue adresses.ejs (renders)
 res.render('membres.ejs', {adresses: resultat});
 }) 
})

app.post('/accueil',  (req, res) => {
 // Preparer l'output en format JSON

console.log('la route /accueil')
// on utilise l'objet req.body pour récupérer les données POST
db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/adresses')
 })

})

app.get('/trier/:id/asc', (req, res) => {

	let cle = req.params.id
	let ordre = (req.params.ordre == 'asc' ? 1 : -1)
	let cursor = db.collection('adresse').find().sort(cle,ordre).toArray(function(err, resultat){
		ordre = 
		res.render('adresses.ejs', {adresses: resultat, ______, _________ })
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