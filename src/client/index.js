import './styles/style.scss'

import { postData ,updateUI, performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { postData, updateUI, performAction }