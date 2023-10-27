import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { getRequest, BACKEND_HOST } from './modules/requests.js';

import 'swiper/css';


initProject()

async function initProject() {
    const params = new URLSearchParams(window.location.search)
    const projectData = await getProjectById(params.get('id'))
    insertProject(projectData)
}

function insertProject(projectData) {
    const nameElement = document.querySelector('#project-title')
    const descriptionElement = document.querySelector('#project-description')

    nameElement.textContent = projectData.name
    descriptionElement.textContent = projectData.description
    
    insertSlides(projectData.images)
        .then(() => {
            hideLoader()
            initSlider()
            document.querySelector('#project-wrapper').classList.add('visible')
        })
}

function hideLoader() {
    document.querySelector('#project-loader').classList.add('hidden')
}

function initSlider() {
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

async function insertSlides(slidesData) {
    const swiperWrapperElement = document.querySelector('#project-swiper-wrapper')
    const slideTemplate = document.querySelector('#slide-template')
    swiperWrapperElement.innerHTML = ''
    
    const imageProms = []

    slidesData.forEach(slideData => {
        const slide = slideTemplate.content.cloneNode(true)
        
        const image = document.createElement('img')
        
        image.src = slideData.url
        image.alt = slideData.alt
        
        slide.querySelector('.project-swiper-slide__image').append(image)
        
        swiperWrapperElement.append(slide)
        
        imageProms.push(new Promise(resolve => {
            image.onload = () => resolve()
        }))
    })
    
    return Promise.all(imageProms)
}

// function initSlide(slideTemplate, slideData) {
//     const slide = slideTemplate.content.cloneNode(true)
//     slide.querySelector('img').src = slideData.url
//     slide.querySelector('img').alt = slideData.alt

//     return slide
// }

async function getProjectById(id) {
    if (id === null) {
        return new Promise((resolve, reject) => {
            reject('Неизвестная ошибка')
        })
    }

    return getRequest(`${BACKEND_HOST}/project?id=${id}`, (j) => ({
        name: j.title,
        images: j.images,
        description: j.description
    }))
}
