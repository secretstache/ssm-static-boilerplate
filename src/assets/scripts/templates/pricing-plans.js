const BLOCK_SELECTOR = '.template-pricing-plans';
const DROPDOWN_SELECTOR = '.template-pricing-plans__dropdown';
const PLAN_ITEMS = '.template-pricing-plans__item';
const PLAN_BUTTON = '.template-pricing-plans__button';
const PLAN_CONTENT = '.template-pricing-plans__content';

const ACTIVE_CLASS = 'is-active';
const SELECTED_CLASS = 'selected-display';
const PLANS_WRAPPER_SELECTOR = '.template-pricing-plans__items';
const PLAN_VALUE_SELECTOR = '.template-pricing-plans__value';
const DESCRIPTION_VALUES_SELECTOR = `.template-pricing-plans__desc ${PLAN_VALUE_SELECTOR}`;
const HIDE_CLASS = 'hide';
const VISIBLE_ITEMS_SELECTOR = `${PLAN_ITEMS}:not(.${HIDE_CLASS})`;

export const PricingPlans = () => {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((block) => {
        setupPricingPlans(block);
    });
};

export const setupPricingPlans = (block, isEditor = false) => {
    if (!block) return;

    let dropdowns = block.querySelectorAll(DROPDOWN_SELECTOR);
    const activePlanItems = block.querySelectorAll(PLAN_ITEMS);
    const addPlanButton = block.querySelector(PLAN_BUTTON);
    const plansList = block.querySelector(PLANS_WRAPPER_SELECTOR);

    const toggleAddPlanButton = (plansList) => {
        if (plansList && addPlanButton) {
            if (plansList.length < 3) {
                addPlanButton.classList.remove('hide');
            } else {
                addPlanButton.classList.add('hide');
            }
        }
    };

    toggleAddPlanButton(activePlanItems);

    updateValuesHeight();

    let prevWidth = 0;

    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const width = entry.borderBoxSize?.[0].inlineSize;

            if (typeof width === 'number' && width !== prevWidth) {
                prevWidth = width;
                updateValuesHeight();
            }
        }
    });

    resizeObserver.observe(document.body);

    const addPlanButtonOnClick = () => {
        const element = document.createElement('div');

        element.classList.add('template-pricing-plans__item');
        element.classList.add('is-added');
        element.innerHTML = block.querySelector(PLAN_ITEMS).innerHTML;

        element.querySelectorAll(PLAN_CONTENT).forEach((content) => content.classList.remove(ACTIVE_CLASS));
        element.querySelector(PLAN_CONTENT).classList.add(ACTIVE_CLASS);
        element.querySelector(`.${SELECTED_CLASS}`).innerHTML = element.querySelector('.dropdown li').innerHTML;

        const elDropdown = [element.querySelector(DROPDOWN_SELECTOR)];

        plansList.appendChild(element);

        const updatedPlansList = block.querySelectorAll(PLAN_ITEMS);

        dropdownMenu(elDropdown);
        toggleAddPlanButton(updatedPlansList);

        updateValuesHeight();
    };

    if (addPlanButton) {
        addPlanButton.addEventListener('click', addPlanButtonOnClick);
    }

    let cleanDropDownsListeners = null;

    if (dropdowns) {
        cleanDropDownsListeners = dropdownMenu(dropdowns);
    }

    return () => {
        const items = block.querySelectorAll(`${PLAN_ITEMS}.is-added`);

        if (items) {
            items.forEach((item) => item.remove());
        }

        if (addPlanButton) {
            addPlanButton.removeEventListener('click', addPlanButtonOnClick);
        }

        if (cleanDropDownsListeners) {
            cleanDropDownsListeners();
        }

        if (resizeObserver) {
            resizeObserver.disconnect();
        }
    };
};

function updateValuesHeight() {
    const titles = document.querySelectorAll(DESCRIPTION_VALUES_SELECTOR);
    const visibleItems = document.querySelectorAll(VISIBLE_ITEMS_SELECTOR);

    // Reset all minHeight styles
    document.querySelectorAll(PLAN_VALUE_SELECTOR).forEach((el) => {
        el.style.minHeight = '';
    });

    if (window.innerWidth < 1024) return;

    // Collect values for each visible item
    const itemValues = Array.from(visibleItems).map((item) => item.querySelectorAll(`${PLAN_CONTENT}.${ACTIVE_CLASS} ${PLAN_VALUE_SELECTOR}`));

    titles.forEach((title, index) => {
        let maxHeight = title.clientHeight;

        itemValues.forEach((values) => {
            const valueHeight = values[index]?.clientHeight;

            if (valueHeight > maxHeight) {
                maxHeight = valueHeight;
            }
        });

        // Set minHeight for titles and corresponding values
        title.style.minHeight = `${maxHeight + 1}px`;

        itemValues.forEach((values) => {
            if (values[index]) values[index].style.minHeight = `${maxHeight + 1}px`;
        });
    });
}

export const dropdownMenu = (dropdowns) => {
    if (!dropdowns) return;

    const onDropdownClick = (e) => {
        const dropdownEl = e.target.closest(DROPDOWN_SELECTOR);

        if (dropdownEl) {
            if (dropdownEl.classList.contains(ACTIVE_CLASS)) {
                toggleDropdown(dropdownEl, false);
            } else {
                let currentActive = document.querySelector(`${DROPDOWN_SELECTOR}.${ACTIVE_CLASS}`);

                if (currentActive) {
                    toggleDropdown(currentActive, false);
                }

                toggleDropdown(dropdownEl, true);
            }
        }
    };

    const onOptionClick = (e) => {
        const currentId = e.target.id;
        const option = e.target.closest('li');

        const selectedPlanContent = e.target.closest(PLAN_ITEMS).querySelector(`${PLAN_CONTENT}#${currentId}`);
        const parentPlan = e.target.closest(PLAN_ITEMS);
        const parentContents = parentPlan.querySelectorAll(PLAN_CONTENT);

        parentContents.forEach((content) => {
            content.classList.remove(ACTIVE_CLASS);
        });

        selectedPlanContent.classList.add(ACTIVE_CLASS);

        const dropdown = e.target.closest(DROPDOWN_SELECTOR);
        dropdown.querySelector(`.${SELECTED_CLASS}`).innerHTML = option.innerHTML;

        updateValuesHeight();
    };

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', onDropdownClick);

        const optionsList = dropdown.querySelectorAll(`${DROPDOWN_SELECTOR} li`);

        if (optionsList?.length > 0) {
            for (let option of optionsList) {
                option.addEventListener('click', onOptionClick);
            }
        }
    });

    window.addEventListener('click', onOutsideDropDownClick);

    return () => {
        if (dropdowns?.length > 0) {
            dropdowns?.forEach((dropdown) => {
                dropdown.removeEventListener('click', onDropdownClick);

                const optionsList = dropdown.querySelectorAll(`${DROPDOWN_SELECTOR} li`);

                if (optionsList?.length > 0) {
                    for (let option of optionsList) {
                        option.removeEventListener('click', onOptionClick);
                    }
                }
            });

            window.removeEventListener('click', onOutsideDropDownClick);
        }
    };
};

function onOutsideDropDownClick(e) {
    if (e.target.closest(DROPDOWN_SELECTOR) === null) {
        closeAllDropdowns();
    }
}

function toggleDropdown(dropdownEl, open) {
    if (open) {
        dropdownEl.classList.add(ACTIVE_CLASS);
    } else {
        dropdownEl.classList.remove(ACTIVE_CLASS);
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll(DROPDOWN_SELECTOR);

    dropdowns.forEach((dropdownEl) => {
        toggleDropdown(dropdownEl, false);
    });
}
