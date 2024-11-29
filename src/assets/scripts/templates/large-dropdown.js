const TEMPLATE_SELECTOR = '.template-large-dropdown';
const DROPDOWN_SELECTOR = '.template-large-dropdown__dropdown';
const BLOCK_ITEMS = '.template-large-dropdown .template-block-grid';

const ACTIVE_CLASS = 'is-active';
const SELECTED_CLASS = 'selected-display';

export const LargeDropdown = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        let dropdowns = template.querySelectorAll(DROPDOWN_SELECTOR);

        if (!dropdowns) return;
        dropdownMenu(dropdowns);
    });
};

export const dropdownMenu = (dropdowns) => {
    if (!dropdowns) return;

    dropdowns.forEach((selected) => {
        const optionsList = selected.querySelectorAll(`${DROPDOWN_SELECTOR} li`);

        selected.addEventListener('click', () => {
            if (selected.classList.contains(ACTIVE_CLASS)) {
                handleDropdown(selected, false);
            } else {
                let currentActive = document.querySelector(`${DROPDOWN_SELECTOR}.${ACTIVE_CLASS}`);

                if (currentActive) {
                    handleDropdown(currentActive, false);
                }

                handleDropdown(selected, true);
            }
        });

        for (let o of optionsList) {
            o.addEventListener('click', (e) => {
                const currentId = e.target.id;

                const selectedBlock = e.target.closest(TEMPLATE_SELECTOR).querySelector(`${BLOCK_ITEMS}#${currentId}`);
                const allBlocks = e.target.closest(TEMPLATE_SELECTOR).querySelectorAll(BLOCK_ITEMS);

                allBlocks.forEach((content) => {
                    content.classList.remove(ACTIVE_CLASS);
                });

                selectedBlock.classList.add(ACTIVE_CLASS);

                optionsList.forEach((content) => {
                    content.classList.remove(ACTIVE_CLASS);
                });

                e.target.classList.add(ACTIVE_CLASS);
                selected.querySelector(`.${SELECTED_CLASS}`).innerHTML = o.innerHTML;
            });
        }
    });

    window.addEventListener('click', function (e) {
        if (e.target.closest(DROPDOWN_SELECTOR) === null) {
            closeAllDropdowns();
        }
    });

    function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(DROPDOWN_SELECTOR);

        selectedAll.forEach((selected) => {
            handleDropdown(selected, false);
        });
    }

    function handleDropdown(dropdown, open) {
        if (open) {
            dropdown.classList.add(ACTIVE_CLASS);

            dropdown.querySelector(`.${SELECTED_CLASS}`).textContent = 'Select Option';
        } else {
            dropdown.classList.remove(ACTIVE_CLASS);

            const selectedValue = dropdown.querySelector(`.${SELECTED_CLASS}`);
            const activeSelectValue = dropdown.querySelector(`li.${ACTIVE_CLASS}`).textContent;

            selectedValue.textContent = selectedValue.textContent === 'Select Option' ? activeSelectValue : selectedValue.textContent;
        }
    }
};
