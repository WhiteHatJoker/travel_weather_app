/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=9652e6a7ce1639d72b41c6a8cde321d3&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to get weather data from Openweather API */
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch(baseUrl+zipCode+apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
};


/* Function to POST data to express */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

/* Update the view with information */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userFeelings;
    } catch(error) {
        console.log("error", error);
    }
};

const performAction = (e) => {
    let zipCode = document.getElementById('zip').value;
    let feelings =  document.getElementById('feelings').value;

    getWeatherData(baseUrl,zipCode, apiKey)
    .then(function(data) {
        postData('/addWeather', {
            temp:data.main.temp, 
            date:newDate, 
            feelings:feelings
        })
    })
    .then(function() {
        updateUI();
    });
};

document.getElementById('generate').addEventListener('click', performAction);
