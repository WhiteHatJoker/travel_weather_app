// Reset error message
const resetErrorDiv = () => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = '';
    errorDiv.style.visibility = 'hidden';
}

// Display error messages if information entered incorrectly
const displayMessage = (message) => {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML += message;
    errorDiv.style.visibility = "visible";
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
const getTravelDateWeather = (unfiltedWeatherForecasts, travelDate) => {
    const searchFormattedDate = travelDate.toISOString().split('T')[0];
    const travelDateWeatherIndex = unfiltedWeatherForecasts.findIndex( (weatherData) => weatherData.datetime == searchFormattedDate);
    return unfiltedWeatherForecasts.slice(travelDateWeatherIndex);
}

// Update the view with city information
const showCityInfo = (cityInfo) => {
    try{
        if (cityInfo) {
            document.querySelector('#cityName h1').innerText = `${cityInfo.name}`;
            document.querySelector('#regionName span').innerText = `${cityInfo.adminName1}`;
            document.querySelector('#countryName span').innerText = `${cityInfo.countryName}`;
            document.querySelector('#population span').innerText = `${cityInfo.population}`;
            document.querySelector('#latitude span').innerText = `${cityInfo.lat}`;
            document.querySelector('#longtitude span').innerText = `${cityInfo.lng}`;
        }

    } catch(error) {
        console.log("error", error);
    }
};

// Update the view with weather information
const showWeatherInfo = (weatherData) => {
    let weatherTable = '<tr><th>Date</th><th>Feels</th><th>Weather</th><th>Prec.</th><th>Humidity</th><th>Wind</th><th>UV</th><th>Pressure</th></tr>';
    try{

        weatherData.forEach(dayWeather => {
            weatherTable += `<tr><td>${dayWeather.datetime}</td>`;
            weatherTable += `<td>${Math.round(dayWeather.app_max_temp)}&deg;/${Math.round(dayWeather.app_min_temp)}</td>`;
            weatherTable += `<td><img class="weatherIcon" src="https://www.weatherbit.io/static/img/icons/${dayWeather.weather.icon}.png" /> ${dayWeather.weather.description}</td>`;
            weatherTable += `<td>${dayWeather.pop}%</td>`;
            weatherTable += `<td>${dayWeather.rh}%</td>`;
            weatherTable += `<td>${dayWeather.wind_cdir} at ${Math.round(dayWeather.wind_spd)}m/s</td>`;
            weatherTable += `<td>${Math.round(dayWeather.uv)}</td>`;
            weatherTable += `<td>${Math.round(dayWeather.pres)}mb</td></tr>`;
        });

        document.getElementById('weatherForecast').innerHTML = weatherTable;

    } catch(error) {
        console.log("error", error);
    }
};

// Update the view with the picture
const showPicture = (pictures) => {
    try{
        if (pictures) {
            document.getElementById('cityPic').innerHTML = `<img class="pic" src="${pictures[0].webformatURL}" alt="${pictures[0].tags}" />`;
        }
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
            const weatherForecastFromTravel = getTravelDateWeather(data.weatherData, travelDate);
            showCityInfo(data.cityData);
            showWeatherInfo(weatherForecastFromTravel);
            showPicture(data.imageData);
            document.querySelector('main').style.display='flex';
        })
    }

};

export { performAction }
