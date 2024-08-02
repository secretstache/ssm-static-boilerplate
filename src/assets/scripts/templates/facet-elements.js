const DROPDOWN_SELECTOR = '.facet-dropdown .facet-wrap';
const BUTTON_SELECTOR = 'h3';
const ACTIVE_CLASS = 'open';
const CHECKBOX_CLASS = 'facetwp-checkbox';
const RADIOBUTTON_CLASS = 'facetwp-radio';

export default function FacetDropdown() {
    const dropdowns = document.querySelectorAll(DROPDOWN_SELECTOR);

    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(BUTTON_SELECTOR);
        const dropdownTitle = button.innerText;

        button.addEventListener('click', () => {
            dropdown.classList.toggle(ACTIVE_CLASS);
        });

        dropdown.querySelectorAll(`.${CHECKBOX_CLASS}, .${RADIOBUTTON_CLASS}`).forEach((option) => {
            option.addEventListener('click', () => {
                button.innerText = `${dropdownTitle}: ${option.innerText}`;
                setTimeout(() => {
                    dropdown.classList.remove(ACTIVE_CLASS);
                }, 300);
            });
        });
    });

    document.addEventListener('click', (event) => {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove(ACTIVE_CLASS);
            }
        });
    });
}
