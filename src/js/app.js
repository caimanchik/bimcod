import { isWebp, initScrollAppear, widthToHeightProportion, initBurger, blurButtons } from "./modules/functions.js"

isWebp()
initScrollAppear()
widthToHeightProportion()

initBurger(
    document.querySelector('#open-burger'),
    [document.querySelector('.header__wrapper')],
    document.querySelectorAll('#opened-class'),
    [document.querySelector('#stop-prop')]
)

blurButtons()