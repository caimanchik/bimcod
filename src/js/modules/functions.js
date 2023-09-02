export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height === 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support ? 'webp' : 'no-webp'
        document.documentElement.classList.add(className)
    });
}

export function initScrollAppear() {
    function onEntry(entries) {
        entries.forEach(change => {
            if (!change.isIntersecting) return
            change.target.classList.add('appear')
        })
    }
    
    setTimeout(() => {
        let elements = document.querySelectorAll('[scroll]')
    
    let groupedItems = {
        0.7: []
    }
    
    elements.forEach(e => {
        let threshold = e.getAttribute('scroll')
        threshold = threshold === '' ? 0.7 : threshold
        
        if (groupedItems[threshold]) {
            groupedItems[threshold].push(e)
        } else {
            groupedItems[threshold] = [e]
        }
    })
    
    Object.keys(groupedItems).forEach(threshold => {
        const observer = new IntersectionObserver(onEntry, {
            threshold
        })
        
        groupedItems[threshold].forEach(e => {
            observer.observe(e)
        })
    })
    }, 0);
    
}

export class Slider {
    constructor(sliderEl, prefix) {
        this.sliderEl = sliderEl
        this.prefix = prefix
        
        this.slides = document.querySelector('.slides')
        this.dots = null
        this.nowOffset = 0
        this.steps = 1
        this.slideWidth = this.slides.children[0].getBoundingClientRect().width
        
        this.countSteps()
        this.initDots(this.steps)
        this.initArrows()
    }
    
    initDots(count) {
        const dotsContainer = this.sliderEl.querySelector('.dots')
        if (!dotsContainer) return
        this.dots = []
        
        for (let i = 0; i < count; ++i) {
            const dot = document.createElement('div')
            dot.classList.add(this.prefix + '__dot')
            dotsContainer.appendChild(dot)
            
            dot.addEventListener('click', e => {
                const delta = i - this.nowOffset
                this.changeOffset(delta)
            })
            this.dots.push(dot)
        }
        
        this.colorizeDots()
    }
    
    initArrows() {
        const back = this.sliderEl.querySelector('.back')
        const next = this.sliderEl.querySelector('.next')
        
        back.addEventListener('click', e => {
            this.changeOffset(-1)
        })
        next.addEventListener('click', e => {
            this.changeOffset(1)
        })
    }
    
    changeOffset(delta) {
        this.nowOffset = this.nowOffset + delta
        this.nowOffset = this.nowOffset < 0 ? this.steps - 1 : this.nowOffset
        const step = this.nowOffset % this.steps
        
        this.slides.style.transform = `translate(${-step * this.slideWidth}px, 0)`
        
        if (this.dots)
            this.colorizeDots()
    }
    
    colorizeDots() {
        this.dots.forEach((dot, i) => {
            if (i === (this.nowOffset) % this.steps) {
                dot.classList.add('active')
            } else {
                dot.classList.remove('active')
            }
        })
    }
    
    countSteps() {
        const slidesContainerWidth = this.slides.getBoundingClientRect().width
        
        const nowOnScreen = Math.floor(slidesContainerWidth / this.slideWidth)
        const allSlidesWidth = this.slideWidth * this.slides.children.length
        
        const steps = (allSlidesWidth - nowOnScreen * this.slideWidth) / this.slideWidth
        this.steps = steps < 0 ? 1 : steps + 1
    }
}