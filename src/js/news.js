import { getRequest, BACKEND_HOST } from './modules/requests.js';

let page = 1
let clicked = true

const moreButton = document.querySelector('#more')
const newsContainer = document.querySelector('#news-container')

const newsItem = document.querySelector('#news-item').content.firstElementChild
const loaderTemp = document.querySelector('#loader-temp').content.firstElementChild

moreButton.addEventListener('click', () => {
    if (clicked) return
    
    initNews()
})

initNews()

async function initNews() {
    await appendNewsHtml(page)

    page++
    clicked = false
}

async function getNewsData(page) {
    return getRequest(`${BACKEND_HOST}/newsList?page=${page}`)
}

async function appendNewsHtml(page) {
    clicked = true
    
    const loader = loaderTemp.cloneNode(true)
    newsContainer.append(loader)
    
    const items = Array(2).fill(initNewsItem).map(e => e(newsContainer))
    items[1].classList.add('reverse')
    
    const newsData = await getNewsData(page)
    let another = false
    const imagesPromises = []
    
    newsData.forEach((e, i) => {
        const imageWrap = items[i].querySelector('#news-image')
        
        const image = document.createElement('img')
        
        imagesPromises.push(new Promise(resolve => {
            image.onload = () => resolve()
        }))
        
        Promise.all(imagesPromises)
            .then(() => {
                removeLoader(loader)
                items.forEach(e => e.classList.add('visible'))
            })
        
        image.src = e.url
        imageWrap.append(image)
        
        items[i].querySelector('#news-title').textContent = e.title
        items[i].querySelector('#news-text').textContent = e.description
    })
    
    if (items.length > newsData.length){
        clearUnused(items, newsData.length)
        moreButton.remove()
    }
}

function removeLoader(loader) {
    loader.classList.add('hidden')
    
    setTimeout(() => {
        loader.remove()
    }, 400);
}

function clearUnused(items, countUsed) {
    items.forEach((e, i) => {
        if (i < countUsed)
            return 
        
        e.remove()
    })
}

function initNewsItem(container) {
    const item = newsItem.cloneNode(true)
    
    container.append(item)
    
    return item;
}