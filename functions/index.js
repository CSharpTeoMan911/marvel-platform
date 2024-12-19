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

app.get('/', (req, res) => res.json({"Test":"Test"}));

/* Migration Scripts */
// const {
// } = require("./migrationScripts/modifyChallengePlayersData");
const migrationScripts = {};


module.exports.functions = https.onRequest(app);
