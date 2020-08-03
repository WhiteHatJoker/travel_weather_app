import './styles/style.scss'


/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=9652e6a7ce1639d72b41c6a8cde321d3&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
import { getWeatherData,postData ,updateUI, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { getWeatherData, postData, updateUI, performAction }