import { initScrollAppear } from "./modules/functions.js"
import { getRequest, BACKEND_HOST } from './modules/requests.js';

class Calculator {
    constructor(calculator) {
        this.savedServices
        this.savedContent
        this.step = 0
        this.calculator = calculator
        this.wrapperElement = document.querySelector('#calculate-wrapper')
        this.calculateContent = document.querySelector('#calculate-content');
        
        this.stepTemplate = document.querySelector('#step-template').content.firstElementChild
        this.textTemplate = document.querySelector('#input-text').content.firstElementChild;
        this.radioTemplate = document.querySelector('#input-radio').content.firstElementChild;
        this.checkboxTemplate = document.querySelector('#input-checkbox').content.firstElementChild;

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
            Array.from(servicesElement.querySelector('.services__list').children)
                .forEach(e => e.classList.remove('appear'))
            
            this.savedServices = servicesElement
            this.savedContent = this.calculateContent.innerHTML

            servicesElement.remove()
            this.wrapperElement.classList.add('calculator')

            this.nextStep()
        })
    }

    initStep(stepDescription) {
        this.calculateContent.innerHTML = ''

        const template = this.stepTemplate.cloneNode(true)
        this.calculateContent.append(template)

        template.querySelector('#step-step').textContent = stepDescription.step;
        template.querySelector('#step-title').textContent = stepDescription.name;

        if (stepDescription.type === "radio") {
            this.initRadioStep(stepDescription, template)
        }
        else if (stepDescription.type === 'text') {
            this.initTextStep(stepDescription, template)
        } else if (stepDescription.type === 'checkbox') {
            this.initCheckboxStep(stepDescription, template)
        }
        
        setTimeout(() => template.classList.add('show'), 0)
    }

    initTextStep(stepDescription, template) {
        const textInput = this.textTemplate.cloneNode(true)

        template.querySelector('#step-inputs').append(textInput)
        textInput.setAttribute('placeholder', stepDescription.placeholder)

        if (this.result[this.step] !== undefined) {
            textInput.value = this.result[this.step]
        }

        textInput.addEventListener('click', () => textInput.classList.remove('warning'))

        this.submitButtonStep(template, () => {
            if (!this.isCorrectInputedText(textInput.value)) {
                textInput.classList.add('warning')
                return
            }

            const value = parseFloat(textInput.value.trim())

            this.result[this.step] = value
            this.nextStep()
        })
    }

    isCorrectInputedText(text) {
        if (/[^0-9 .,]/.test(text)
            || (text.match(/[,.]/g) || []).length > 1
            || text === ''
            || /[,.]/.test(text) && (!/[,.]\d/.test(text) || !/\d[,.]/.test(text))
        )
            return false

        return true
    }

    initRadioStep(stepDescription, template) {
        const inputs = []

        stepDescription.variants.forEach((v, i) => {
            const radioInput = this.radioTemplate.cloneNode(true)

            template.querySelector('#step-inputs').append(radioInput)

            const input = radioInput.querySelector('input')

            if (this.result[this.step] === i) {
                input.checked = true
            }

            input.setAttribute('id', 'radio' + i)
            inputs.push(input)

            input.addEventListener('change', () => {
                inputs.forEach(e => e.classList.remove('warning'))
            })

            const label = radioInput.querySelector('label')
            label.textContent = v.name;
            label.setAttribute('for', 'radio' + i)
        });

        this.submitButtonStep(template, () => {
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

    initCheckboxStep(stepDescription, template) {
        const variants = stepDescription.variants[this.result[this.step - 1]]
        const inputs = [];

        variants.forEach((v, i) => {
            const radioInput = this.checkboxTemplate.cloneNode(true)

            template.querySelector('#step-inputs').append(radioInput)

            const input = radioInput.querySelector('input')

            input.setAttribute('id', 'checkbox' + i)
            inputs.push(input)

            input.addEventListener('change', () => {
                inputs.forEach(e => e.classList.remove('warning'))
            })

            const label = radioInput.querySelector('label')
            label.append(v.name);
            label.setAttribute('for', 'checkbox' + i)
        });

        this.submitButtonStep(template, () => {
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

    submitButtonStep(template, func) {
        const submitButton = template.querySelector('#submit-step');

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
        const [result, isOutOfList] = this.calculateResult()
        // const result = 13428000.11
        const resultTemplate = document.querySelector('#result-calculator');
        const template = resultTemplate.content.firstElementChild.cloneNode(true)

        this.calculateContent.innerHTML = ''
        this.calculateContent.append(template)
        this.wrapperElement.classList.add('result')

        this.calculateContent.querySelector('#result-container').textContent =
            (Math.round(result / 100) * 100).toLocaleString()
        
        if (isOutOfList)
        {
            this.calculateContent.querySelector('#result-description').textContent = 'Сумма определена без учета пунктов, которых не было в списке, для получения более полной информации заполните анкету. Данная информация является справочной и не является публичной офертой. Окончательный расчет стоимости после обследования объекта.'
            this.calculateContent.querySelector('#result-description').classList.add('outoflist')
        }
        
        setTimeout(() => template.classList.add('show'), 0);
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
        let isOutOfList = false
        
        const sumSections = this.result[4]
            .map(e => this.calculator.steps[4][1].variants[this.result[3]][e].price)
            .reduce((prev, e) => {
                if (e > 0)
                    return prev + e

                isOutOfList = true
                return prev
            }, 0)

        return [this.result[2] * k * sumSections, isOutOfList]
    }

    calculateCapitalResult() {
        const k1 = this.calculator.steps[2][0].variants[this.result[2]].k
        const k2 = this.calculator.steps[4][0].variants[this.result[4]].k
        let isOutOfList = false

        const sumSections = this.result[5]
            .map(e => this.calculator.steps[5][0].variants[this.result[4]][e].price)
            .reduce((prev, e) => {
                if (e > 0)
                    return prev + e
                
                isOutOfList = true
                return prev
            }, 0)

        return [this.result[3] * k1 * k2 * sumSections, isOutOfList]
    }
}

async function getPricing() {
    return getRequest(`${BACKEND_HOST}/getCalculator`, (r) => r)
}

async function initCalculator() {
    const pricing = await getPricing()
    const calculator = new Calculator(pricing.calculator)
}

initCalculator()