/** Initialisation du routeur */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../config/config.js');

// Lib Moment et body-parser
const moment = require('moment');
var bodyParser = require('body-parser');
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const db = require('./../models/index');

/** Lorsque qu'on utilise le chemin "host + / ", une instance du controller "HomePage" est créé */
router.get('/', function (req, res, next) {
    db.roadmaps.findAll().then((roadMaps) => {
        console.log("----------->");
        roadMaps[0].getUsers().then(users => {
            console.log(users);
        });
    });
});

/* INSERTION DANS LA DB */

//#region Authentification
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
        try {
            let token = jwt.sign(userCreated.dataValues, config.secret, { expiresIn: 1440 });
            res.send(token)
        } catch(error) {
            console.log(error)
        }
    }).catch(error => {
            res.send(false);
            console.log(error)
        });
});

router.post('/Login', async (req, res) => {
    db.users.findOne({ where: { email: req.body.email } }).then(user => {
        console.log(
            'email :', user.email, 'prenom :', user.firstname, 'lastname :', user.lastname
        );
        if (!user) {
            res.send(false);
            console.log('Mauvais email')
            return res.status(401).json({
                text: "L'utilisateur n'existe pas"
            });
        } else if (!user.validPassword(req.body.password)) {
            res.send(false);
            console.log('Mauvais mdp')
            return res.status(401).json({
                text: "Mot de passe incorrect"
            });
        } else {
            jwt.sign(user.dataValues, config.secret, { expiresIn: 1440 })
                .then(token => res.send(token), console.log(token))
                .catch(err => console.log(err))
        }
    });
});
//#endregion

//#region RoadMaps
router.get('/GetRoadMap/:id', function (req, res) {
    db.roadmaps.findOne({ where: { id: req.params.id } }).then(roadmap => {
        if (roadmap == null) {
            res.send(false);
        } else {
            res.send(roadmap.dataValues);
        }
    });
});

// Récupere toute les road map lié a un utilisateur
router.get('/GetAllRoadMaps/:id', function (req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(user => {
        if (!user) {
            res.send(false);
        } else {
            user.getRoadmaps().then(roadMaps => {
                var rmToSend = [];
                roadMaps.forEach(element => {
                    rmToSend.push(element.dataValues);
                });
                res.send(JSON.stringify(rmToSend));
            });
        }
    });
});

// // Suppréssion d'une RoadMap
router.delete('/DeleteRoadMap/:id', (req, res) => {
    db.roadmaps.findOne({ where: { id: req.params.id } }).then(roadmap => {
        if (roadmap == null) {
            res.send(false);
        } else {
            roadmap.destroy();
            res.send(true);
        }
    });
});

// Création d'une RoadMap
router.post('/CreateRoadMap', function (req, res) {
    console.log(req.body)
    db.roadmaps.create({
        name: req.body.name,
        password: req.body.password,
        nbr_participants: req.body.nbr_participants,
        location: req.body.location,
        startDate: moment(req.body.startDate).format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment(req.body.endDate).format("YYYY-MM-DD HH:mm:ss"),
        budget: req.body.budget,
        leader: req.body.leader
    },
        {
            include: [db.users]
        }).then(roadmap => {
            roadmap.addUser(req.body.id), console.log('roadmap created')
        }).catch(err => res.status(400).json('Error: ' + err));
});
//#endregion

/** Obligatoire pour pouvoir utiliser le router */
module.exports = router;
