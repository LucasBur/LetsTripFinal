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
        console.log("----------->");
        roadMaps[0].getUsers().then(users => {
            console.log(users);
        });
    });
});

/* INSERTION DANS LA DB */

//Ajout d'un nouvel utilisateur
router.post('/NewUser', (req, res) => {
    db.users.create({ 
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: req.body.password,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        creation_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        is_active: true
    }).then(userCreated => {
        console.log(userCreated);
        res.send(true);
    }).catch(error => {
        res.send(false);
    });    
});

router.post('/Login', (req, res) => {
    //console.log(db);
    db.users.findOne({ where: { email: req.body.email }}).then(user => {
        console.log(user);
        if (!user) {
            //res.redirect('/login');
            res.send(false);
        } else if (!user.validPassword(req.body.password)) {
            res.send(false);
        } else {
            //req.session.user = user.dataValues;
            //res.send(true);
            console.log('BOn log');
        }
    });
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

// Création d'une RoadMap
router.post('/CreateRoadMap', function(req, res){        
    let userConnected;

    db.users.findAll({
        where: {
            id: 6
        }
    }).then(user => {
        userConnected = user[0].dataValues;        
    });
    
    db.roadmaps.create({
        name: 'Test',
        password: 'Test',
        nbr_participants: 1,
        location: 'France',
        startDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        endDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        budget: 1000,
        leader: true
    },
    {
        include: [db.users]
    }).then(roadmap => {
        roadmap.addUser(userConnected.id);
    })
});


/** Obligatoire pour pouvoir utiliser le router */
module.exports = router;
