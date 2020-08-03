// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const geonamesApiUrl = "http://api.geonames.org/search?q=london&maxRows=1&type=json&username=rkhudoyberdiev"

// Setup Express
const express = require('express');
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Configure adding variables from .env
const dotenv = require('dotenv');
dotenv.config();
const geonamesUser = process.env.GEONAMES_USERNAME;
// Initialize the main project folder
app.use(express.static('dist'));
// Require axios to get requests
const axios = require('axios');

const port = 8081;
// Setup Server
const listening = () => console.log(`Server is up and running on port ${port}`)
const server = app.listen(port, listening);


app.post('/addWeather', (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['userFeelings'] = req.body.feelings;
    console.log(projectData);
    res.send(projectData);
});


app.get('/all', (req, res) => {
    res.send(projectData);
});
