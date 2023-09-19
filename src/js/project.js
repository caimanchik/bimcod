import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';


initProject()

async function initProject() {
    const params = new URLSearchParams(window.location.search)
    const projectData = await getProjectById(params.get('id'))
    insertProject(projectData)
    
    document.querySelector('#project-wrapper').classList.add('visible')
}

function insertProject(projectData) {
    const nameElement = document.querySelector('#project-title')
    const descriptionElement = document.querySelector('#project-description')
    
    nameElement.textContent = projectData.name
    descriptionElement.textContent = projectData.description
    
    hideLoader()
    initSlider(projectData.images)
}

function hideLoader() {
    document.querySelector('#project-loader').classList.add('hidden')
}

function initSlider(slidesData) {
    insertSlides(slidesData)
    
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
}

function insertSlides(slidesData) {
    const swiperWrapperElement = document.querySelector('#project-swiper-wrapper')
    const slideTemplate = document.querySelector('#slide-template')
    swiperWrapperElement.innerHTML = ''
    
    slidesData.forEach(slideData => {
        swiperWrapperElement.append(initSlide(slideTemplate, slideData))
    })
}

function initSlide(slideTemplate, slideData) {
    const slide = slideTemplate.content.cloneNode(true)
    slide.querySelector('img').src = slideData
    
    return slide
}

async function getProjectById(id) {
    if (id === null) {
        return new Promise((resolve, reject) => {
            reject('Неизвестная ошибка')
        })
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Название проекта',
                images: [
                    'img/main/slide1.jpg',
                    'img/main/slide1.jpg',
                    'img/main/slide1.jpg',
                    'img/main/slide1.jpg',
                ],
                description: `Высокий уровень профессионализма в области проектирования и инженерных изысканий. высокий уровень профессионализма в области проектирования и инженерных изысканий. Высокий уровень профессионализма в области проектирования и инженерных изысканий. высокий уровень профессионализма в области проектирования и инженерных изысканий. Высокий уровень профессионализма в области проектирования и инженерных изысканий. высокий уровень профессионализма в области проектирования и инженерных изысканий. Высокий уровень профессионализма в области проектирования и инженерных изысканий. высокий уровень профессионализма в области проектирования и инженерных изысканий.`
            })
        }, 1500);
    })
}
