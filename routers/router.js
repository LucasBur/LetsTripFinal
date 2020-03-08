/** Initialisation du routeur */
const express = require('express');
const router = express.Router();

// Lib Moment et body-parser
const moment = require('moment');
var bodyParser = require('body-parser');
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const db = require('./../models/index');

/** Lorsque qu'on utilise le chemin "host + / ", une instance du controller "HomePage" est créé */
router.get('/', function(req, res, next) {
    db.roadmaps.findAll().then((roadMaps) => {
        console.log(JSON.stringify(roadMaps));

    });
});

/* INSERTION DANS LA DB */

//Ajout d'un nouvel utilisateur
router.get('/newuser/:last_name/:first_name/:email/:password', (req, res) => {
    // let usersMdl = new UsersMdl(connection);
    // usersMdl.newUser(req.params.last_name, req.params.first_name, req.params.email, req.params.password)
    //     .then(result => {
    //         res.send(JSON.stringify(result));
    //     }).catch((error) => {
    //         res.send({ code: 'error', error })
    //     });
});

// RoadMapsList
// Récuparation de toute les RoadMap
// router.get('/GetAllRoadMaps', function(req, res){
//     let roadMapListMdl = new RoadMapListMdl(connection);
//     roadMapListMdl.getAllRoadMaps().then((result) => {
//         //res.send(JSON.stringify(result));
//         res.send(result);
//     }).catch((error) => {
//         res.send({code: 'error', error});
//     });
// });

// // Suppréssion d'une RoadMap
// router.delete('/DeleteRoadMap/:roadMapId', (req, res) => {
//     let roadMapListMdl = new RoadMapListMdl(connection);
//     roadMapListMdl.deleteRoadMaps(req.params.roadMapId).then((result) => {
//         res.send(true);
//     }).catch((error) => {
//         res.send({ code: 'error', error });
//     });
// });

// // Création d'une RoadMap
// router.post('/CreateRoadMap', function(req, res){
//     var name = req.body.Name;
//     var password = req.body.Password;
//     var nbrParticipants = parseInt(req.body.NbrParticipants);
//     var location = req.body.Location;
//     var sqlStartDate = moment(req.body.StartDate).format("YYYY-MM-DD HH:mm:ss");
//     var sqlEndDate = moment(req.body.EndDate).format("YYYY-MM-DD HH:mm:ss");
//     var budget = parseInt(req.body.Budget);
//     var leader = req.body.Leader;


//     let roadMapListMdl = new RoadMapListMdl(connection);
//     roadMapListMdl.createRoadMap(name, password, nbrParticipants, location, sqlStartDate, sqlEndDate, budget, leader)
//     .then((result) => {
//         res.send(true);
//     }).catch((error) => {
//         res.send(false);
//     });
// });


/** Obligatoire pour pouvoir utiliser le router */
module.exports = router;
