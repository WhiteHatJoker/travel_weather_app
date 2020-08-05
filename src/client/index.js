import './styles/style.scss'

import { resetErrorDiv, displayMessage, postData, findDateIndex, showCityInfo, showWeatherInfo, showPicture, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { resetErrorDiv, displayMessage, postData, findDateIndex, showCityInfo, showWeatherInfo, showPicture, performAction }