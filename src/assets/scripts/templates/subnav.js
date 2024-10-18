const TEMPLATE_SELECTOR = '.template-subnav';
const NAV_LIST_SELECTOR = '.template-subnav__nav-list';
const HIDDEN_LIST_SELECTOR = '.template-subnav__nav-list-hidden';
const TOGGLER_BUTTON_SELECTOR = '.template-subnav__show-more-btn';
const NAV_ITEMS_SELECTOR = '.template-subnav__nav-item';
const ACTIVE_CLASS = 'is-open';

export const Subnav = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const navList = template.querySelector(NAV_LIST_SELECTOR);
        let navItems = navList.querySelectorAll(NAV_ITEMS_SELECTOR);
        const hiddenNavList = template.querySelector(HIDDEN_LIST_SELECTOR);
        const moreBtn = template.querySelector(TOGGLER_BUTTON_SELECTOR);

        function updateNav() {
            while (hiddenNavList.firstChild) {
                navList.appendChild(hiddenNavList.firstChild);
            }

            moreBtn.style.display = 'none';
            template.classList.remove(ACTIVE_CLASS);
            hiddenNavList.classList.remove(ACTIVE_CLASS);

            const navListWidth = navList.offsetWidth - 80;
            const moreBtnWidth = moreBtn.offsetWidth + 80;
            let availableWidth = navListWidth;
            let totalWidth = 0;
            let itemsToHide = [];

            navItems = navList.querySelectorAll(NAV_ITEMS_SELECTOR);

            navItems.forEach((item) => {
                totalWidth += item.offsetWidth;
                if (totalWidth > availableWidth) {
                    itemsToHide.push(item);
                }
            });

            if (itemsToHide.length > 0) {
                moreBtn.style.display = 'flex';
                availableWidth = navListWidth - moreBtnWidth;
                totalWidth = 0;
                itemsToHide = [];

                navItems.forEach((item) => {
                    totalWidth += item.offsetWidth;
                    if (totalWidth > availableWidth) {
                        itemsToHide.push(item);
                    }
                });
            }

            itemsToHide.forEach((item) => {
                hiddenNavList.appendChild(item);
            });

            if (hiddenNavList.children.length > 0) {
                moreBtn.style.display = 'flex';
            } else {
                moreBtn.style.display = 'none';
            }
        }
        updateNav();

        moreBtn.addEventListener('click', () => {
            template.classList.toggle(ACTIVE_CLASS);
            hiddenNavList.classList.toggle(ACTIVE_CLASS);
        });

        window.addEventListener('resize', updateNav);
        updateNav();
    });
};
