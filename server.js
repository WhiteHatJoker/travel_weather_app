// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8888;
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
