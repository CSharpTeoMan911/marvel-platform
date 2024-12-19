require('dotenv').config({ path: '../.env' }); // Ensure this is at the top
const { https } = require('firebase-functions/v2');
const admin = require('firebase-admin');

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

admin.initializeApp();

const userController = require('./controllers/userController');
const marvelAIController = require('./controllers/marvelAIController');
const { seedDatabase } = require('./cloud_db_seed');

seedDatabase();


// Server functions served as a CRUD API interface
//
// [BEGIN]

app.get('/signUpUser', async (req, res) => {
    res.json(await userController.signUpUser(req.query));
}
);


// app.get('/signUpUser', async (req, res) => {
//     res.json(await userController.signUpUser(req.query));
// }
// );


// [END]


/* Migration Scripts */
// const {
// } = require("./migrationScripts/modifyChallengePlayersData");
const migrationScripts = {};

// Serve all the functions as a single Google Cloud Function in order to 
// enable 'CORS'(Cross-origin resource sharing) by passing an 'Express' 
// CORS enabled API app object, to the 'onRequest' firebase function. 
// This must be done because the front-end web-app and the server app
// are served at 2 different URLs (origins), and the server must be 
// configured to accept requests from different origins.
module.exports.functions = https.onRequest(app);
