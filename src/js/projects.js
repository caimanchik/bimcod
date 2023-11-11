import { getRequest, BACKEND_HOST } from './modules/requests.js';

const moreButton = document.querySelector('#more')
const projectsContainer = document.querySelector('#projects')

let pageNumber = 1
let clicked = true

initProjectsHtml(pageNumber)

moreButton.addEventListener('click', () => {
    if (clicked) return 
    
    initProjectsHtml(++pageNumber)
})

async function getProjectsData(page) {
    return getRequest(`${BACKEND_HOST}/projectsList?page=${page}`, (data) => {
        return data.map(e => ({
            title: e.title,
            preview: e.preview,
            link: `project.html?id=${e.id}`
        }))
    })
}

function initPart() {
    const part = document.createElement('ul')
    
    part.classList.add('projects-projects__part')
    const projects = []
    
    for (let i = 0; i < 6; ++i) {
        const project = document.createElement('li')
        project.classList.add('projects-projects__project', 'projects-project')
        
        const wrapper = document.createElement('div')
        wrapper.classList.add('projects-project__wrapper')
        
        project.appendChild(wrapper)
        part.appendChild(project)
        projects.push(wrapper)
    }
    
    const loaderWrapper = document.createElement('div')
    loaderWrapper.classList.add('projects-projects__loader')
    
    const loader = document.createElement('img')
    loader.src = 'img/icons/loader.svg'
    
    loaderWrapper.appendChild(loader)
    
    part.appendChild(loaderWrapper)
    
    return {part, projects, loader: loaderWrapper}
}

function initLink(params) {
    const link = document.createElement('a')
    link.href = params.link
    link.classList.add('projects-project__content')
    
    const title = document.createElement('h2')
    title.textContent = params.title
    title.classList.add('projects-project__title')
    
    const imgWrapper = document.createElement('span')
    imgWrapper.classList.add('projects-project__img')
    
    const img = document.createElement('img')
    img.src = params.preview
    
    imgWrapper.appendChild(img)
    link.appendChild(title)
    link.appendChild(imgWrapper)
    
    return [link, img]
}

function removeExtraLinks(part, count) {
    Array.from(part.childNodes).forEach((e, i) => {
        if (i < count)
            return
        
        e.remove()
    })
}

async function initProjectsHtml(page) {
    let {part, projects, loader} = initPart()
    
    projectsContainer.appendChild(part)
    
    const params = await getProjectsData(page)
    
    clicked = false
    const links = []
    const imagesPromises = []
    
    params.forEach((params, i) => {
        const [link, img] = initLink(params)
        
        imagesPromises.push(new Promise(resolve => {
            img.onload = () => resolve();
        }))
        
        links.push(link)
        projects[i].appendChild(link)
    });
    
    Promise.all(imagesPromises)
        .then(() => {
            loader.classList.add('hidden')

            setTimeout(() => {
                links.forEach(link => {
                    link.classList.add('visible')
                });
            }, 100);

            if (params.length < 6) {
                moreButton.remove()

                removeExtraLinks(part, params.length)
            }
        })
    
    
}
