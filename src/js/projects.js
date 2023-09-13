const moreButton = document.querySelector('#more')
const projectsContainer = document.querySelector('#projects')

let pageNumber = 0
let clicked = true

initProjectsHtml(pageNumber)

moreButton.addEventListener('click', () => {
    if (clicked) return 
    
    initProjectsHtml(++pageNumber)
})

async function getProjectsData(page) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Array(6).fill({
                title: 'Детский сад',
                imageUrl: 'img/projects/1.jpg',
                link: '#'
            }))
        }, 1000);
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
    img.src = params.imageUrl
    img.alt = params?.alt ?? 'Фото проекта'
    
    imgWrapper.appendChild(img)
    link.appendChild(title)
    link.appendChild(imgWrapper)
    
    return link
}

async function initProjectsHtml(page) {
    let {part, projects, loader} = initPart()
    
    projectsContainer.appendChild(part)
    
    const params = await getProjectsData(page)
    
    clicked = false
    const links = []
    
    params.forEach((params, i) => {
        const link = initLink(params)
        
        links.push(link)
        projects[i].appendChild(link)
    });
    
    loader.classList.add('hidden')
    
    setTimeout(() => {
        links.forEach(link => {
            link.classList.add('visible')
        });
    }, 100);
}
