import { initScrollAppear } from "./modules/functions.js"

class Calculator {
    constructor(calculator) {
        this.savedServices
        this.savedContent
        this.step = 0
        this.stepTemplate = document.querySelector('#step-template')
        this.calculator = calculator
        this.wrapperElement = document.querySelector('#calculate-wrapper')
        this.calculateContent = document.querySelector('#calculate-content');
        
        this.textTemplate = document.querySelector('#input-text');
        this.radioTemplate = document.querySelector('#input-radio');
        this.checkboxTemplate = document.querySelector('#input-checkbox');

        this.result;

        this.createCalculator()
        this.initPrevButton()
    }
    
    initPrevButton() {
        const button = this.wrapperElement.querySelector('#prev-button')
        
        button.addEventListener('click', () => {
            delete this.result[this.step]
            this.step -= 2
            
            if (this.step < 0) {
                this.reInitCalculator()
                return
            }
            
            this.nextStep()
        })
        
    }
    
    reInitCalculator() {
        this.calculateContent.innerHTML = this.savedContent
        document.querySelector('.main').append(this.savedServices)
        
        this.wrapperElement.classList.remove('calculator')
        
        initScrollAppear()
        
        this.createCalculator()
    }

    createCalculator() {
        const createButton = document.querySelector('#create-calculator')
        const servicesElement = document.querySelector('#services-services')

        this.result = {}
        this.step = 0

        createButton.addEventListener("click", () => {
            this.savedServices = servicesElement
            this.savedContent = this.calculateContent.innerHTML

            servicesElement.remove()
            this.calculateContent.innerHTML = ''
            this.wrapperElement.classList.add('calculator')

            this.nextStep()
        })
    }

    initStep(stepDescription) {
        this.previousStep?.remove()
        this.calculateContent.innerHTML = ''

        const template = this.stepTemplate.content.cloneNode(true)
        this.calculateContent.append(template)

        const nowStep = this.calculateContent.querySelector('.calculate-step')

        nowStep.querySelector('#step-step').textContent = stepDescription.step;
        nowStep.querySelector('#step-title').textContent = stepDescription.name;

        if (stepDescription.type === "radio") {
            this.initRadioStep(stepDescription, nowStep)
        }
        else if (stepDescription.type === 'text') {
            this.initTextStep(stepDescription, nowStep)
        } else if (stepDescription.type === 'checkbox') {
            this.initCheckboxStep(stepDescription, nowStep)
        }
    }

    initTextStep(stepDescription, nowStep) {
        const textInput = this.textTemplate.content.cloneNode(true)

        nowStep.querySelector('#step-inputs').append(textInput)
        const input = nowStep.querySelector('input')
        input.setAttribute('placeholder', stepDescription.placeholder)
        
        if (this.result[this.step] !== undefined) {
            input.value = this.result[this.step]
        }

        input.addEventListener('click', () => input.classList.remove('warning'))

        this.submitButtonStep(nowStep, () => {
            if (!(this.step === 2
                ? this.isCorrectInputedTextLength(input.value)
                : this.isCorrectInputedTextSquare(input.value))) {
                input.classList.add('warning')
                return
            }

            const value = parseFloat(input.value.trim())

            this.result[this.step] = value
            this.nextStep()
        })
    }

    isCorrectInputedTextLength(text) {
        if (/[^0-9км .,]/.test(text)
            || (text.match(/[,.]/g) || []).length > 1
            || text === ''
            || /[км]/.test(text) && !text.includes('км')
            || text.match(/км[ .,]+\d/)
            || text.match(/км\d/)
            || !text.match(/\d/)
            || /[,.]/.test(text) && (!/[,.]\d/.test(text) || !/\d[,.]/.test(text))
        )
            return false

        return true
    }

    isCorrectInputedTextSquare(text) {
        if (/[^0-9 .,]/.test(text)
            || (text.match(/[,.]/g) || []).length > 1
            || text === ''
            || /[,.]/.test(text) && (!/[,.]\d/.test(text) || !/\d[,.]/.test(text))
        )
            return false

        return true
    }

    initRadioStep(stepDescription, nowStep) {
        const inputs = []

        stepDescription.variants.forEach((v, i) => {
            const radioInput = this.radioTemplate.content.cloneNode(true)

            nowStep.querySelector('#step-inputs').append(radioInput)

            const inputWrap = nowStep.querySelector('#step-inputs').lastElementChild;
            const input = inputWrap.querySelector('input')
            
            if (this.result[this.step] === i) {
                input.checked = true
            }

            input.setAttribute('id', 'radio' + i)
            inputs.push(input)

            input.addEventListener('change', () => {
                inputs.forEach(e => e.classList.remove('warning'))
            })

            const label = inputWrap.querySelector('label')
            label.textContent = v.name;
            label.setAttribute('for', 'radio' + i)
        });

        this.submitButtonStep(nowStep, () => {
            let selected;

            inputs.forEach((e, i) => selected = e.checked ? i : selected)

            if (selected === undefined) {
                inputs.forEach(e => e.classList.add('warning'))
                return
            }

            this.result[this.step] = selected;
            this.nextStep()
        })
    }

    initCheckboxStep(stepDescription, nowStep) {
        const variants = stepDescription.variants[this.result[this.step - 1]]
        const inputs = [];

        variants.forEach((v, i) => {
            const radioInput = this.checkboxTemplate.content.cloneNode(true)

            nowStep.querySelector('#step-inputs').append(radioInput)

            const inputWrap = nowStep.querySelector('#step-inputs').lastElementChild;
            const input = inputWrap.querySelector('input')

            input.setAttribute('id', 'checkbox' + i)
            inputs.push(input)

            input.addEventListener('change', () => {
                inputs.forEach(e => e.classList.remove('warning'))
            })

            const label = inputWrap.querySelector('label')
            label.append(v.name);
            label.setAttribute('for', 'checkbox' + i)
        });

        this.submitButtonStep(nowStep, () => {
            const selected = inputs
                .map((e, i) => e.checked ? i : -1)
                .filter(e => e !== -1);

            if (selected.length === 0) {
                inputs.forEach(e => e.classList.add('warning'))
                return
            }

            this.result[this.step] = selected;
            this.initResultStep()
        })
    }

    submitButtonStep(nowStep, func) {
        const submitButton = nowStep.querySelector('#submit-step');

        submitButton.addEventListener('click', (e) => {
            e.preventDefault()

            func()
            submitButton.blur()
        })
    }

    nextStep() {
        this.step++;

        if (this.step === 1) {
            this.initStep(this.calculator.steps[1][0])
            return
        }

        this.initStep(this.calculator.steps[this.step][this.result[1]])
    }

    initResultStep() {
        const result = this.calculateResult()
        const resultTemplate = document.querySelector('#result-calculator');

        this.calculateContent.innerHTML = ''
        this.calculateContent.append(resultTemplate.content.cloneNode(true))
        this.wrapperElement.classList.add('result')
        
        this.calculateContent.querySelector('#result-container').textContent =
            (Math.round(result / 100) * 100).toLocaleString('de-DE')
    }

    calculateResult() {
        let result;
        if (this.result[1] === 1)
            result = this.calculateLinearResult()
        else
            result = this.calculateCapitalResult()

        return result
    }

    calculateLinearResult() {
        const k = this.calculator.steps[3][1].variants[this.result[3]].k
        const sumSections = this.result[4]
            .map(e => this.calculator.steps[4][1].variants[this.result[3]][e].price)
            .reduce((prev, e) => e > 0 ? prev + e : 0, 0)

        return this.result[2] * k * sumSections
    }

    calculateCapitalResult() {
        const k1 = this.calculator.steps[2][0].variants[this.result[2]].k
        const k2 = this.calculator.steps[4][0].variants[this.result[4]].k
        
        const sumSections = this.result[5]
            .map(e => this.calculator.steps[5][0].variants[this.result[4]][e].price)
            .reduce((prev, e) => e > 0 ? prev + e : 0, 0)
        
        return this.result[3] * k1 * k2 * sumSections
    }
}

async function getPricing() {
    return fetch('files/pricing.json')
        .then(res => res.json())
}

async function initCalculator() {
    const pricing = await getPricing()
    const calculator = new Calculator(pricing.calculator)
}

initCalculator()