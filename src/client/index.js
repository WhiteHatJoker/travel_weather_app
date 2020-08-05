import './styles/style.scss'

import { findDateIndex, displayMessage, postData ,updateUI, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { findDateIndex, displayMessage, postData, updateUI, performAction }