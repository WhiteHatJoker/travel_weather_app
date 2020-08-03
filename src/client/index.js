import './styles/style.scss'

import { baseUrl, apiKey, getWeatherData,postData ,updateUI, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { baseUrl, apiKey, getWeatherData, postData, updateUI, performAction }