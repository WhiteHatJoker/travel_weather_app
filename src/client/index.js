import './styles/style.scss'

import { getWeatherData,postData ,updateUI, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { getWeatherData, postData, updateUI, performAction }