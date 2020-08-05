import './styles/style.scss'

import { displayMessage, postData ,updateUI, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { displayMessage, postData, updateUI, performAction }