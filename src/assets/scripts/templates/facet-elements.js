const DROPDOWN_SELECTOR = '.facet-dropdown .facet-wrap';
const BUTTON_SELECTOR = 'h3';
const ACTIVE_CLASS = 'open';
const CHECKBOX_CLASS = 'facetwp-checkbox';
const RADIOBUTTON_CLASS = 'facetwp-radio';

function FacetDropdown() {
    const dropdowns = document.querySelectorAll(DROPDOWN_SELECTOR);

    dropdowns.forEach(el => {
        const button = el.querySelector(BUTTON_SELECTOR);
        const dropdownTitle = button.innerText;

        button.addEventListener('click', () => {
            el.classList.toggle(ACTIVE_CLASS);
        });

        el.querySelectorAll(`.${CHECKBOX_CLASS}, .${RADIOBUTTON_CLASS}`).forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                button.innerText = `${dropdownTitle}: ${checkbox.innerText}`;
                setTimeout(() => {
                    el.classList.remove(ACTIVE_CLASS);
                }, 300);
            });
        });
    });

    document.addEventListener('click', event => {
        dropdowns.forEach(el => {
            if (!el.contains(event.target)) {
                el.classList.remove(ACTIVE_CLASS);
            }
        });
    });
}

export { FacetDropdown };
