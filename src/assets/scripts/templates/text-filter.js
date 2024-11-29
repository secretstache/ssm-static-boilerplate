const TEMPLATE_SELECTOR = '.template-text-filter';
const INPUT_SELECTOR = '.template-text-filter__filter-input';
const ITEMS_LIST_SELECTOR = '.template-text-filter__item-list';
const ITEMS_ELEMENTS_SELECTOR = 'li';
const HIDDEN_CLASS = 'hidden';
const SEARCH_BUTTON_SELECTOR = '.template-text-filter__search-button';
const NO_RESULTS_HTML = `<p>Result Not Found</p>`;
const LETTER_BUTTONS_SELECTOR = '.template-text-filter__letter-list button';
const ACTIVE_CLASS = 'is-active';
const DISABLED_CLASS = 'disabled';

const filterItems = (items, filterValue, activeLetter) => {
    let hasResults = false;

    items.forEach((item) => {
        const itemText = item.querySelector('p').textContent.trim();
        const itemTextLower = itemText.toLowerCase();
        const startsWithLetter = activeLetter
            ? itemText.charAt(0).toLowerCase() === activeLetter.toLowerCase()
            : true;
        const includesFilter = itemTextLower.includes(filterValue);

        if ((filterValue === '' || includesFilter) && startsWithLetter) {
            item.classList.remove(HIDDEN_CLASS);
            item.style.display = '';
            hasResults = true;
        } else {
            item.classList.add(HIDDEN_CLASS);
            item.style.display = 'none';
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

const updateLetterButtons = (letterButtons, items, filterValue) => {
    const availableLetters = new Set();

    items.forEach((item) => {
        if (!item.classList.contains(HIDDEN_CLASS)) {
            const firstLetter = item
                .querySelector('p')
                .textContent.trim()
                .charAt(0)
                .toUpperCase();
            availableLetters.add(firstLetter);
        }
    });

    letterButtons.forEach((button) => {
        if (availableLetters.has(button.textContent.trim())) {
            button.classList.remove(DISABLED_CLASS);
        } else {
            button.classList.add(DISABLED_CLASS);
        }
    });
};

const initializeLetterButtons = (letterButtons, items) => {
    const availableLetters = new Set();

    items.forEach((item) => {
        const firstLetter = item
            .querySelector('p')
            .textContent.trim()
            .charAt(0)
            .toUpperCase();
        availableLetters.add(firstLetter);
    });

    letterButtons.forEach((button) => {
        if (availableLetters.has(button.textContent.trim())) {
            button.classList.remove(DISABLED_CLASS);
        } else {
            button.classList.add(DISABLED_CLASS);
        }
    });
};

const setupEventListeners = (
    filterInput,
    items,
    itemList,
    searchButton,
    letterButtons
) => {
    let activeLetter = null;

    const handleFilter = () => {
        const filterValue = filterInput.value.toLowerCase();
        const hasResults = filterItems(items, filterValue, activeLetter);
        displayNoResultsMessage(itemList, hasResults);
        updateLetterButtons(letterButtons, items, filterValue);
    };

    if (searchButton) {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            handleFilter();
        });
    } else {
        filterInput.addEventListener('keyup', handleFilter);
    }

    letterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains(DISABLED_CLASS)) return;

            if (button.classList.contains(ACTIVE_CLASS)) {
                button.classList.remove(ACTIVE_CLASS);
                activeLetter = null;
            } else {
                letterButtons.forEach((btn) => btn.classList.remove(ACTIVE_CLASS));
                button.classList.add(ACTIVE_CLASS);
                activeLetter = button.textContent.trim();
            }
            handleFilter();
        });
    });
};

export const TextFilter = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const filterInput = template.querySelector(INPUT_SELECTOR);
        const itemList = template.querySelector(ITEMS_LIST_SELECTOR);
        const items = itemList.querySelectorAll(ITEMS_ELEMENTS_SELECTOR);
        const searchButton = template.querySelector(SEARCH_BUTTON_SELECTOR);
        const letterButtons = template.querySelectorAll(LETTER_BUTTONS_SELECTOR);

        initializeLetterButtons(letterButtons, items);
        setupEventListeners(filterInput, items, itemList, searchButton, letterButtons);
    });
};
