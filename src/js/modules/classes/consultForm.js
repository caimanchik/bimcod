import { postRequest, BACKEND_HOST } from '../requests.js';

export class ConsultForm {
    errors = {
        0: 'Заполните все обязательные поля',
        1: 'Укажите корректное ФИО',
        2: 'Укажите корректный телефон',
        3: 'Укажите корректный email',
    }

    constructor(formWrapper) {
        this.formWrapper = formWrapper
        this.form = formWrapper.querySelector('.form-form')
        this.incorrect = formWrapper.querySelector('.form__incorrect')
        this.timeOut = null
        this.button = formWrapper.querySelector('.button-submit')

        this.fields =
            Array.from(formWrapper.querySelectorAll('input'))
                .concat(...formWrapper.querySelectorAll('textarea'))

        this.initValidators()
        this.formatPhone(this.fields.find(e => e.name === 'phone'))
    }

    initValidators() {
        this.button.addEventListener('click', e => {
            e.preventDefault()
            this.button.blur()

            const errorsSet = new Set()
            const wrongFileds = []
            const formValues = {}

            for (let i = 0; i < this.fields.length; ++i) {
                const field = this.fields[i];

                formValues[field.name] = field.value

                switch (field.name) {
                    case 'name':
                        if (field.value.split(' ').length < 2) {
                            errorsSet.add(this.errors[1])
                            wrongFileds.push(field)
                        }
                        break;

                    case 'phone':
                        if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(field.value)) {
                            errorsSet.add(this.errors[2])
                            wrongFileds.push(field)
                        }

                        formValues[field.name] = field.value.replace(/[^\d]/g, '')
                        break

                    case 'mail':
                        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(field.value)) {
                            errorsSet.add(this.errors[3])
                            wrongFileds.push(field)
                        }
                        break

                    case 'message':
                        if (!field.value) {
                            errorsSet.add(this.errors[0])
                            wrongFileds.push(field)
                        }
                        break

                    default:
                        break;
                }
            }

            if (errorsSet.size > 0) {
                this.showError(errorsSet, wrongFileds)
            } else {
                document.querySelector('.form-form__loader').classList.add('visible')
                document.querySelector('.form-form').classList.add('hidden')
                
                this.sendRequest(formValues)
                    .then(() => {
                        document.querySelector('.form-form__loader').classList.remove('visible')
                        document.querySelector('.form-form').classList.remove('hidden')
                    })
            }
        });

        this.fields.forEach(field => field.addEventListener('click', () => field.classList.remove('wrong')))
    }
    
    async sendRequest(data) {
        return postRequest(`${BACKEND_HOST}/sendUserResponse`, data)
    }

    formatPhone(field) {
        field.addEventListener('keyup', e => {

            if (e.keyCode === 8 || e.keyCode === 46) {
                return
            }

            let result = '+7 ('

            if (!field.value) {
                field.value = result
                return
            }

            let formattedPhone = field.value.replace(/[^\d]/g, '')
            let start = 0
            if (formattedPhone[0] === '8' || formattedPhone[0] === '7')
                start = 1

            if (formattedPhone.length >= start + 3) {
                result += `${formattedPhone.slice(start, start + 3)}) `
            } else {
                result += formattedPhone.slice(start)
            }

            if (formattedPhone.length >= start + 6) {
                result += `${formattedPhone.slice(start + 3, start + 6)}-`
            } else {
                result += formattedPhone.slice(start + 3, start + 6)
            }

            if (formattedPhone.length >= start + 8) {
                result += `${formattedPhone.slice(start + 6, start + 8)}-`
            } else {
                result += formattedPhone.slice(start + 6, start + 8)
            }

            if (formattedPhone.length >= start + 8) {
                result += formattedPhone.slice(start + 8, start + 10)
            }

            field.value = result
        })
    }

    showError(errors, fields) {
        if (this.timeOut)
            clearTimeout(this.timeOut)

        this.incorrect.innerHTML = ''

        errors.forEach(e => {
            const errorElement = document.createElement('div')
            errorElement.innerHTML = e
            this.incorrect.appendChild(errorElement)
        })

        this.incorrect.classList.add('visible')
        fields.forEach(field => field.classList.add('wrong'));

        this.timeOut = setTimeout(() => {
            this.incorrect.classList.remove('visible')
            this.incorrect.innerHtml = ''
        }, 5000);
    }
}