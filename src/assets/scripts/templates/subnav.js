const TEMPLATE_SELECTOR = '.template-subnav';
const NAV_LIST_SELECTOR = '.template-subnav__nav-list';
const HIDDEN_LIST_SELECTOR = '.template-subnav__nav-list-hidden';
const TOGGLER_BUTTON_SELECTOR = '.template-subnav__show-more-btn';
const NAV_ITEMS_SELECTOR = '.template-subnav__nav-item';
const ACTIVE_CLASS = 'is-open';

const NAV_PADDING = 80;
const MORE_BTN_EXTRA_WIDTH = 80;

const clearHiddenList = (navList, hiddenNavList) => {
    hiddenNavList.replaceChildren(...Array.from(hiddenNavList.children).map((child) => child));
    navList.append(...hiddenNavList.children);
};

const calculateItemsToHide = (navItems, availableWidth) => {
    let totalWidth = 0;
    return Array.from(navItems).filter((item) => (totalWidth += item.offsetWidth) > availableWidth);
};

const updateMoreButtonVisibility = (moreBtn, hiddenNavList) => {
    moreBtn.style.display = hiddenNavList.children.length ? 'flex' : 'none';
};

const setupEventListeners = (template, moreBtn, hiddenNavList, updateNav) => {
    moreBtn.addEventListener('click', () => {
        template.classList.toggle(ACTIVE_CLASS);
        hiddenNavList.classList.toggle(ACTIVE_CLASS);
    });

    window.addEventListener('resize', updateNav);
};

export const Subnav = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const navList = template.querySelector(NAV_LIST_SELECTOR);
        const hiddenNavList = template.querySelector(HIDDEN_LIST_SELECTOR);
        const moreBtn = template.querySelector(TOGGLER_BUTTON_SELECTOR);

        const updateNav = () => {
            clearHiddenList(navList, hiddenNavList);
            updateMoreButtonVisibility(moreBtn, hiddenNavList);

            const navListWidth = navList.offsetWidth - NAV_PADDING;
            const moreBtnWidth = moreBtn.offsetWidth + MORE_BTN_EXTRA_WIDTH;

            let availableWidth = navListWidth;
            const navItems = navList.querySelectorAll(NAV_ITEMS_SELECTOR);

            let itemsToHide = calculateItemsToHide(navItems, availableWidth);

            if (itemsToHide.length) {
                moreBtn.style.display = 'flex';
                availableWidth = navListWidth - moreBtnWidth;
                itemsToHide = calculateItemsToHide(navItems, availableWidth);
            }

            hiddenNavList.append(...itemsToHide);
            updateMoreButtonVisibility(moreBtn, hiddenNavList);
        };

        setupEventListeners(template, moreBtn, hiddenNavList, updateNav);
        updateNav();
    });
};