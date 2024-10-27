const TEMPLATE_SELECTOR = '.template-text-filter';
const INPUT_SELECTOR = '.template-text-filter__filter-input';
const ITEMS_LIST_SELECTOR = '.template-text-filter__item-list';
const ITEMS_ELEMENTS_SELECTOR = 'li';
const HIDDEN_CLASS = 'hidden';
const SEARCH_BUTTON_SELECTOR = '.template-text-filter__search-button';
const NO_RESULTS_HTML = `<p>Result Not Found</p>`;

const filterItems = (items, filterValue) => {
    let hasResults = false;

    items.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
        
        if (filterValue === '' || itemText.includes(filterValue)) {
            item.classList.remove(HIDDEN_CLASS);
            hasResults = true;
        } else {
            item.classList.add(HIDDEN_CLASS);
        }
    });

    return hasResults;
};

const displayNoResultsMessage = (itemList, hasResults) => {
    const noResultItem = itemList.querySelector('.no-results');
    if (noResultItem) {
        noResultItem.remove();
    }

    if (!hasResults) {
        const noResult = document.createElement('li');
        noResult.classList.add('no-results');
        noResult.innerHTML = NO_RESULTS_HTML;
        itemList.appendChild(noResult);
    }
};

const setupEventListeners = (filterInput, items, itemList, searchButton) => {
    const handleFilter = () => {
        const filterValue = filterInput.value.toLowerCase();
        const hasResults = filterItems(items, filterValue);
        displayNoResultsMessage(itemList, hasResults);
    };

    if (searchButton) {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            handleFilter();
        });
    } else {
        filterInput.addEventListener('keyup', handleFilter);
    }
};

export const TextFilter = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const filterInput = template.querySelector(INPUT_SELECTOR);
        const itemList = template.querySelector(ITEMS_LIST_SELECTOR);
        const items = itemList.querySelectorAll(ITEMS_ELEMENTS_SELECTOR);
        const searchButton = template.querySelector(SEARCH_BUTTON_SELECTOR);

        setupEventListeners(filterInput, items, itemList, searchButton);
    });
};