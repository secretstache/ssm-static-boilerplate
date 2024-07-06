const TEMPLATE_SELECTOR = '.template-ribbon';
const TEMPLATE_BUTTON_SELECTOR = '.template-ribbon__card-btn';
const TEMPLATE_TEXT_SELECTOR = '.template-ribbon__card-text';
const TEMPLATE_TEXT_ATTRIBUTE = 'data-change-text';

export default function Ribbon(){

    const templates = document.querySelectorAll(TEMPLATE_SELECTOR);
    
    templates.forEach(template => {
        const button = template.querySelector(TEMPLATE_BUTTON_SELECTOR);
        const ribbonText = template.querySelector(TEMPLATE_TEXT_SELECTOR);
        const initialText = ribbonText.innerText;
        const changeText = ribbonText.getAttribute(TEMPLATE_TEXT_ATTRIBUTE);
        
        button.addEventListener('click', () => {
            ribbonText.innerText = ribbonText.innerText === initialText ? changeText : initialText;
        });
    });
}