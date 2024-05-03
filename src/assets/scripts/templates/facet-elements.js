const DROPDOWN_SELECTOR = '.facet-dropdown .facet-wrap';
const BUTTON_SELECTOR = 'h3';
const ACTIVE_CLASS = 'open';
const CHECKBOX_CLASS = 'facetwp-checkbox';
const RADIOBUTTON_CLASS = 'facetwp-radio';

function FacetDropdown() {
    document.querySelectorAll(DROPDOWN_SELECTOR).forEach((el) => {
        const checkboxes = el.querySelectorAll(`.${CHECKBOX_CLASS}, .${RADIOBUTTON_CLASS}`);

        const button = el.querySelector(BUTTON_SELECTOR);

        button.addEventListener('click', function () {
            el.classList.toggle(ACTIVE_CLASS);
        });

        checkboxes.forEach((checkbox) => {
            const dropdownTitle = button.innerText;

            checkbox.addEventListener('click', () => {
                button.innerText = `${dropdownTitle}: ${checkbox.innerText}`;

                setTimeout(() => {
                    el.classList.remove(ACTIVE_CLASS);
                }, 300);
            });
        });

        document.addEventListener('click', (event) => {
            const withinBoundaries = event.composedPath().includes(el);

            if (!withinBoundaries) {
                el.classList.remove(ACTIVE_CLASS);
            }
        });
    });
}

export { FacetDropdown };
