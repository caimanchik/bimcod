import { ConsultForm } from './modules/classes/consultForm.js';
import { handleTextareaHeight, scrollTo } from './modules/functions.js';
import { getRequest, BACKEND_HOST } from './modules/requests.js';

import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';



handleTextareaHeight(document.querySelector('.form-form'))

const consultForm = new ConsultForm(document.querySelector('.consult-form-wrap'))

initProjectSwiper()
initNewsSlider()

async function initProjectSwiper() {
    const projectSlide = document.querySelector('#project-slide').content.firstElementChild;
    const wrapper = document.querySelector('.projects-swiper__wrapper');
    
    const projects = await getRequest(
        `${BACKEND_HOST}/projectsList?page=1`,
        (data) => data.map(e => ({
            image: e.images[0].url,
            link: `project.html?id=${e.id}`
        }))
    )
    
    wrapper.innerHTML = ''
    
    projects.forEach(e => {
        const slide = projectSlide.cloneNode(true)
        
        const image = document.createElement('img')
        
        image.src = e.image
        
        slide.querySelector('#project-slide-image').append(image)
        slide.querySelector('#project-slide-link').href = e.link
        
        wrapper.append(slide)
    });

    const projectsSwiper = new Swiper(".projects-swiper", {
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
}

async function initNewsSlider() {
    const newsWrapper = document.querySelector('.news-swiper__wrapper');
    const slideTemp = document.querySelector('#news-slide-temp').content.firstElementChild
    
    const newsResponses = [getRequest(`${BACKEND_HOST}/newsList?page=1`),
    getRequest(`${BACKEND_HOST}/newsList?page=2`),
    getRequest(`${BACKEND_HOST}/newsList?page=3`)]
    
    Promise.all(newsResponses)
        .then(arr => {
            const newsData = [].concat(...arr, ...arr,)
            
            newsWrapper.innerHTML = ''
            newsData
                .forEach(e => {
                    const slide = slideTemp.cloneNode(true)
                    
                    slide.querySelector('#news-slide-title').textContent = e.title
                    
                    const image = document.createElement('img')
                    image.src = e.url
                    
                    slide.querySelector('#news-slide-image').append(image)
                    
                    newsWrapper.append(slide)
                })
            
            newsSwiper.updateSlides()
    })
    
    // console.log(newsResponses.map(e => e.))
}


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

document.querySelector('#leave-request').addEventListener('click', (e) => {
    scrollTo(document.querySelector('.form'), e)
})
