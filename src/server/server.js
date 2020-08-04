// Setup empty JS object to act as endpoint for all routes
let cityData = {};
let weatherData = {};
const dotenv = require('dotenv');
dotenv.config();
const geonamesApiUrl = "http://api.geonames.org/search?maxRows=1&type=json&style=short";
const geonamesUser = process.env.GEONAMES_USERNAME;
const weatherbitApiUrl = "http://api.weatherbit.io/v2.0/forecast/daily";
const weatherbitKey = process.env.WEATHERBIT_API_KEY;
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

// Initialize the main project folder
app.use(express.static('dist'));
// Require axios to get requests
const axios = require('axios');

app.listen(8081, function () {
    console.log('Server is up and running on port 8081!');
});

const apiRequestsChain = async (location, date) => {
    try {
        const geoNamesApiRequest = await axios.get(`${geonamesApiUrl}&q=${location}&username=${geonamesUser}`);
        cityData = geoNamesApiRequest.data.geonames[0];
        console.log(cityData);
        const weatherbitApiRequest = await axios.get(`${weatherbitApiUrl}?key=${weatherbitKey}&lat=${cityData.lat}&lon=${cityData.lng}`);
        weatherData = weatherbitApiRequest.data.data;
        console.log(weatherData);
    } catch(err) {
        console.log(err);
    }
}

app.post('/sendToApis', (req, res) => {
    const travelDate = req.body.date;
    const location = req.body.location;

    apiRequestsChain(location, travelDate).then(function() {
        res.send(cityData);
    })

});

