import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/css';


const newsSwiper = new Swiper(".about-swiper", {
    simulateTouch: false,
    slidesPerView: 1.5,
    modules: [
        Navigation
    ],
    navigation: {
        nextEl: '.about-swiper__arrow_next',
        prevEl: '.about-swiper__arrow_prev',
    },
    updateOnWindowResize: true,
    rewind: true,
    preventClicks: true,
    breakpoints: {
        320: {
            slidesPerView: 1.5
        },
        600: {
            slidesPerView: 2.2
        },
        900: {
            slidesPerView: 3.6
        },
        1100: {
            slidesPerView: 4
        },
    }
})
