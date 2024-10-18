const TEMPLATE_SELECTOR = '.template-text-filter';
const INPUT_SELECTOR = '.template-text-filter__filter-input';
const ITEMS_LIST_SELECTOR = '.template-text-filter__item-list';
const ITEMS_ELEMENTS_SELECTOR = 'li';
const HIDDEN_CLASS = 'hidden';

export const TextFilter = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const filterInput = template.querySelector(INPUT_SELECTOR);
        const itemList = template.querySelector(ITEMS_LIST_SELECTOR);
        const items = itemList.querySelectorAll(ITEMS_ELEMENTS_SELECTOR);

        filterInput.addEventListener('keyup', function () {
            const filterValue = filterInput.value.toLowerCase();

            for (let i = 0; i < items.length; i++) {
                const itemText = items[i].textContent.toLowerCase();

                if (itemText.includes(filterValue)) {
                    items[i].classList.remove(HIDDEN_CLASS);
                } else {
                    items[i].classList.add(HIDDEN_CLASS);
                }
            }
        });
    });
};
