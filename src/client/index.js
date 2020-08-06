import './styles/resets.scss'
import './styles/style.scss'

import { performAction } from './js/app.js'


document.getElementById('generate').addEventListener('click', performAction);

export { performAction }