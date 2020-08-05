// Reset error message
const resetErrorDiv = () => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = '';
}

// Display error messages if information entered incorrectly
const displayMessage = (message) => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML += message;
}

// Function to post the city name to Express for API requests
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

// After the date is returned for 16 days from now find the travel date in the data returned
const findDateIndex = (weatherDatesArray, travelDate) => {
    const searchFormattedDate = travelDate.toISOString().split('T')[0];
    return weatherDatesArray.findIndex( (weatherData) => weatherData.datetime == searchFormattedDate);
}

// Update the view with city information
const showCityInfo = (cityInfo) => {
    try{
        console.log(cityInfo);
        // document.getElementById('date').innerHTML = allData.date;
        // document.getElementById('temp').innerHTML = allData.temp;
        // document.getElementById('content').innerHTML = allData.userFeelings;
    } catch(error) {
        console.log("error", error);
    }
};

// Update the view with weather information
const showWeatherInfo = (weatherData, dataIndex) => {
    try{
        console.log(weatherData);
        // document.getElementById('date').innerHTML = allData.date;
        // document.getElementById('temp').innerHTML = allData.temp;
        // document.getElementById('content').innerHTML = allData.userFeelings;
    } catch(error) {
        console.log("error", error);
    }
};

// Update the view with the picture
const showPicture = (pictures) => {
    try{
        console.log(pictures);
        // document.getElementById('date').innerHTML = allData.date;
        // document.getElementById('temp').innerHTML = allData.temp;
        // document.getElementById('content').innerHTML = allData.userFeelings;
    } catch(error) {
        console.log("error", error);
    }
};

// Main app function
const performAction = (e) => {
    e.preventDefault();
    resetErrorDiv();

    let error = false;

    let location =  document.getElementById('location').value;

    let travelDate = document.getElementById('travelDate').value;
    travelDate = new Date(travelDate);

    let currentDate = new Date();

    let maxForecastDate = new Date();
    maxForecastDate.setDate(maxForecastDate.getDate()+15);

    if (!location) {
        displayMessage('<p>Please enter the city where you are traveling to</p>');
        error = true;
    }

    if (!travelDate) {
        displayMessage('<p>Please enter the travel date</p>');
        error = true;
    } else if (travelDate<currentDate) {
        displayMessage('<p>Please enter the future date</p>');
        error = true;
    } else if (travelDate>maxForecastDate) {
        displayMessage(`<p>You cannot choose the date more than ${maxForecastDate.toDateString()}. Please come back minimum two weeks before your departure</p>`);
        error=true;
    }

    if (!error) {
        postData('/sendToApis', {
            location:location
        }).then(function(data){
            console.log(data, travelDate);
            const weatherDataIndex = findDateIndex(data.weatherData, travelDate);
            showCityInfo(data.cityData);
            showWeatherInfo(data.weatherData, weatherDataIndex);
            showPicture(data.imageData);
        })
    }



};

export { resetErrorDiv, displayMessage, postData, findDateIndex, showCityInfo, showWeatherInfo, showPicture, performAction }
