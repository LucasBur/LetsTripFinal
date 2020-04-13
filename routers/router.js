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
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
        } catch (error) {
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
            // return res.status(401).json({
            //     text: "L'utilisateur n'existe pas"
            // });
        } else if (!user.validPassword(req.body.password)) {
            res.send(false);
            console.log('Mauvais mdp')
            // return res.status(401).json({
            //     text: "Mot de passe incorrect"
            // });
        } else {
            let token = jwt.sign(user.dataValues, config.secret, { expiresIn: 1440 });
            res.send(token)
        }
    });
});

router.put('/UpdateUser/:id', function(req, res) {     
    db.users.findOne({ where: { id: req.params.id }}).then(user => {
        if(user == null){
            res.send(false);
        } else {
            user.email = req.body.email;
            user.pseudo = req.body.pseudo;
            user.firstname = req.body.firstName;
            user.lastname = req.body.lastName;
            //user.password = req.body.password;
            user.save();
            let token = jwt.sign(user.dataValues, config.secret, { expiresIn: 1440 });
            res.send(token);
        }
    });
});
//#endregion

//#region RoadMaps
router.get('/GetRoadMap/:id', function (req, res) {
    db.roadmaps.findOne({ where: { id: req.params.id } }).then(roadmap => {
        console.log(roadmap)
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
                console.log(roadMaps)
                var rmToSend = [];
                roadMaps.forEach(element => {
                    rmToSend.push(element.dataValues);
                });
                res.send(JSON.stringify(rmToSend));
            });
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
        roadmap.addUser(req.body.id)
        res.send(true);        
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.put('/updateRoadmap/:id', (req, res) => {     
    db.roadmaps.findOne({ where: { id: req.params.id }}).then(roadmap => {
        if(roadmap == null){
            res.send(false);
        } else {
            roadmap.name = req.body.name;
            roadmap.password = req.body.password;
            roadmap.nbr_participants = req.body.nbr_participants;
            roadmap.location = req.body.location;
            roadmap.startDate = req.body.startDate;
            roadmap.endDate = req.body.endDate;
            roadmap.budget = req.body.budget;
            roadmap.leader = req.body.leader;
            roadmap.save();
            res.send(true)
        }
    });
});

// Suppréssion d'une RoadMap
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

//#region Activity
router.post('/CreateActivity', function (req, res){
    console.log(req.body);
    db.activities.create({
        roadmapId: req.body.id,
        title: req.body.title,
        description: req.body.description,
        day: req.body.day,
        startHour: req.body.startHour,
        endHour: req.body.endHour
    }).then(activity => {
        console.log(activity);
        res.send(true);
    }).catch(err => {
        console.log(err);
        res.status(400).json('Error' + err);
    });
});

router.get('/GetActivities/:id/:day', function(req, res){
    db.activities.findAll({ 
        where : {
            roadmapId: req.params.id,
            day: req.params.day
        },
        order:[
            ['startHour', 'ASC']
        ]
    }).then(activities => {
        if(activities.length == 0){            
            res.send(false);
        } else {                        
            var activitiesToSend = [];
            activities.forEach(element => {
                activitiesToSend.push(element.dataValues);
            });
            res.send(JSON.stringify(activitiesToSend));
        }        
    });
});

router.get('/GetAllActivitiesForMap/:id', function(req, res){
    db.activities.findAll({ 
        where : {
            roadmapId: req.params.id,
            latitude: {
                [Op.ne]: null
            },
            longitude: {
                [Op.ne]: null
            }
        },
        order:[
            ['startHour', 'ASC']
        ]
    }).then(activities => {
        if(activities.length == 0){            
            res.send(false);
        } else {                        
            var activitiesToSend = [];
            activities.forEach(element => {
                activitiesToSend.push(element.dataValues);
            });
            res.send(JSON.stringify(activitiesToSend));
        }        
    });
});

router.delete('/DeleteActivity/:id', (req, res) => {
    db.activities.findOne({ where: { id: req.params.id } }).then(activity => {
        if (activity == null) {
            res.send(false);
        } else {
            activity.destroy();
            res.send(true);
        }
    });
});

router.put('/UpdateActivity/:id', (req, res) => {
    db.activities.findOne({ where: { id: req.params.id }}).then(activity => {        
        if(activity == null){
            res.send(false);
        } else {
            activity.title = req.body.title;
            activity.description = req.body.description;
            activity.day = req.body.day;
            activity.startHour = req.body.startHour;
            activity.endHour = req.body.endHour;

            activity.save();
            res.send(true);
        }
    });
});

router.put('/SetLocationActivity/:id', (req, res) => {
    db.activities.findOne({ where: { id: req.params.id }}).then(activity => {        
        if(activity == null){
            res.send(false);
        } else {
            activity.latitude = req.body.lat;
            activity.longitude = req.body.lng;

            activity.save();
            res.send(true);
        }
    });
});

//#endregion

/** Obligatoire pour pouvoir utiliser le router */
module.exports = router;
