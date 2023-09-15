import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';

const projectSwiper = new Swiper(".project-swiper", {
    simulateTouch: false,
    slidesPerView: 1,
    modules: [
        Navigation,
        Pagination
    ],
    navigation: {
        nextEl: '.project-swiper__arrow_next',
        prevEl: '.project-swiper__arrow_prev',
    },
    pagination: {
        el: '.project-swiper__pagination',
        bulletClass: 'project-swiper__bullet',
        bulletActiveClass: 'project-swiper__bullet_active',
        clickable: true,
    },
    updateOnWindowResize: true,
    loop: true,
})