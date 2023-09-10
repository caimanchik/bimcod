import { ConsultForm } from './modules/functions.js';
import { handleTextareaHeight } from './modules/functions.js';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

handleTextareaHeight(document.querySelector('.form-form'))

const consultForm = new ConsultForm(document.querySelector('.consult-form-wrap'))

const projectsSwiper = new Swiper(".projects-swiper", {
    // autoplay: {
    //     delay: 100
    // },
    simulateTouch: false,
    slidesPerView: 1,
    modules: [
        Pagination,
        Navigation
    ],
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    updateOnWindowResize: true,
    loop: true
})

const newsSwiper = new Swiper(".news-swiper", {
    simulateTouch: false,
    slidesPerView: 4,
    modules: [
        Navigation
    ],
    navigation: {
        nextEl: '.news-swiper__arrow_next',
        prevEl: '.news-swiper__arrow_prev',
    },
    updateOnWindowResize: true,
    rewind: true,
    spaceBetween: 30,
    preventClicks: true
})