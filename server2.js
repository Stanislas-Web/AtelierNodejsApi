const express=require('express');
const bodyParser = require('body-parser')
const server=express();
const PORT=3000;


const users = [
  {
    id:1,  
    nom: 'Lisangola',
    prenom: 'Christian',
    email: '',
    poste: 'Homme de ménage',
    numeroTelephone: ['+243908888888'],
    estMarie: false,
    pays: 'RDCongo',
  },
  {
      id:2,
    nom: 'Motoba',
    prenom: 'Claude',
    email: 'claude@gmail.com',
    poste: 'Architecte infrastructures',
    numeroTelephone: ['+243818885454', '+243844457484'],
    estMarie: true,
    pays: 'Liban',
  },
  {
      id:3,
    nom: 'Nyembo',
    prenom: 'Thesy',
    email: 'thesy.nyembo@gmail.com',
    poste: 'DevOPS & Développeuse Fullstack',
    numeroTelephone: ['+2438108488888', '+243844145444'],
    estMarie: false,
    pays: 'Djibouti',
  },
  {
      id:4,
    nom: 'Gael',
    prenom: 'Mapwata',
    email: 'mapwata.gael@gmail.com',
    poste: 'Administrateur systèmes & Réseaux',
    numeroTelephone: ['+243818897188', '+243844445744'],
    estMarie: true,
    pays: 'Inde',
  },
  {
      id:5,
    nom: 'Makengo',
    prenom: 'Stanislas',
    email: 'makengo.stanislas@gmail.com',
    poste: 'Chef de projet digital',
    numeroTelephone: ['+243814428888', '+243844446734'],
    estMarie: true,
    pays: 'Algérie',
  },
  {
      id:6,
    nom: 'Ndovia',
    prenom: 'Ruth',
    email: 'ruth.ndovia@gmail.com',
    poste: 'Administrateur systèmes & Réseaux',
    numeroTelephone: ['+24381458888', '+243844434444'],
    estMarie: false,
    pays: 'RDCongo',
  },
  {
      id:7,
    nom: 'Bondjali',
    prenom: 'Chris',
    email: '',
    poste: 'Cordonier',
    numeroTelephone: ['+24390999898'],
    estMarie: true,
    pays: 'RDCongo',
  },
];

// Les middlewares Ce sont des petits morceaux d'application qui rendent chacun un service spécifique.

server.use(bodyParser.urlencoded({ extended: false }));//  pour parser application/x-www-form-urlencoded

server.use(bodyParser.json()); // pour  parse application/json

// Cors ce morceaux de code  permettra à toutes les demandes de toutes les origines d'accéder à mon API
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine ( '*' ) 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});





//EXERCICE
//Ajouter la possibilité de 
// - supprimer un object du tableau au travers de son ID
//   Mais il faudra utiliser la methode "delete" de express
//- D'ajouter un nouvelle element dans le tableau
//  Il faut utiliser la methode POST
//Pour tester pour devez utiliser postman

//Voici les indices
// - cors
// - Ajouter un middleware qui mettre les informations envoyées avec POST dans la methode BODY
//   à voir express.bodyparser(...)
//Expliquer chaque ligne de code par un brief commentaire et expliquer son utilité et problème qu'il résoud
/**
 * Il y a des commentaires qui expliquent tous ce que vous devez faire.Mais le fichier je l'ai envoyé seul
 *  sans le fichier "package.json" ou autre chose.C'est à de faire tout ce qu'il faut pour faire tourner le
 *  projet et après vous allez m'envoyer un dossier zip avec votre projet.Mais dans votre ZIP ne mettez pas
 *  le dossier "node_modules"
 * 
 */
//notre raccine d'application donc la page d'accueil
server.get('/',function(req,res){
    res.send("Bienvenu dans notre page")
});
// pour afficher tous les utilisateurs
server.get('/api/users',(req,res)=>{
    res.send(users);
});

// pour afficher un utilisateur par rapport a son Identifiant unique tapez dans l'url et recuperer par req.params
server.get('/api/users/:matricule',(req,res)=>{
    const user=users.find((user)=>user.id===parseInt(req.params.matricule));
    res.send(user);
});
// ajouter un enregistrement dans le tableau users
server.post('/api/users',(req,res)=>{
  users.push(req.body); // pour ajouter la requete ou les données renvoyer  par l'utilisateur à la fin du tableau users
  res.send(users[users.length-1] ) // pour afficher le dernier élément du tableau donc notre enregistrement 
});

// supprimer un enregistrement par rapport a son identifiant unique tapez dans l'url et recuperer par req.params
server.delete('/api/users/:id',(req,res)=>{
  const id = req.params.id -1; 
  users.splice(id, 1);// le premier parametre c'est le nombre au quel on souhaite commencer la suppression et le deuxieme parametre veut dire simplement un élément
  res.send(users);
});

// pour gerer l'erreur 404
server.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});



server.listen(PORT,function(){
    console.log(`Le serveur écoute sur le PORT ${PORT}`);
})








