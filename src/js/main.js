import { Slider, ConsultForm } from './modules/functions.js';
import { handleTextareaHeight } from './modules/functions.js';

const projectSliderElement = document.querySelector('.projects-slider__slider');
const projectSlider = new Slider(projectSliderElement, 'projects-slider')

handleTextareaHeight(document.querySelector('.form-form'))

const consultForm = new ConsultForm(document.querySelector('.consult-form-wrap'))