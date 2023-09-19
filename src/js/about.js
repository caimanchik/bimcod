import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';


const newsSwiper = new Swiper(".about-swiper", {
    simulateTouch: false,
    slidesPerView: 4,
    modules: [
        Navigation
    ],
    navigation: {
        nextEl: '.about-swiper__arrow_next',
        prevEl: '.about-swiper__arrow_prev',
    },
    updateOnWindowResize: true,
    rewind: true,
    spaceBetween: 15,
    preventClicks: true
})
