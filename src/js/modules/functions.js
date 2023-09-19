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
    }, 500);

}

export function handleTextareaHeight(rootElement = document) {
    const areaInputs = rootElement.getElementsByTagName('textarea');
    const eventTypes = ['input', 'keyup', 'paste']

    Array.from(areaInputs).forEach(area => {
        handleHeight(area)

        eventTypes.forEach(type => {
            area.addEventListener(type, e => handleHeight(e.target))
        })
    })

    function handleHeight(el) {
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
    }
}

export function scrollTo(element, event) {
    event?.preventDefault();

    element.scrollIntoView(
        {
            behavior: 'smooth',
            block: 'start',
        }
    )
}

