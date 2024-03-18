const BLOCK_SELECTOR = '.accordion';
const ITEM_SELECTOR = '.accordion__item';
const HEADER_SELECTOR = '.accordion__header';
const BUTTON_SELECTOR = '.accordion__button';
const CONTENT_SELECTOR = '.accordion__content';
const ACCORDION_NAVS_SELECTOR = '.accordion__nav-item';
const ACCORDION_CONTENT_SELECTOR = '.accordion__list';
const OPEN_CLASS = 'is-opened';
const ACTIVE_CLASS = 'is-active';

export default function Accordion() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((template) => {
        const accordionContainer = template.querySelectorAll(ACCORDION_CONTENT_SELECTOR);
        const tabsNavs = template.querySelectorAll(ACCORDION_NAVS_SELECTOR);
        const accordionItems = template.querySelectorAll(ITEM_SELECTOR);

        tabsNavs.forEach((navItem, index) => {
            navItem.addEventListener('click', () => {
                if (navItem.classList.contains(ACTIVE_CLASS)) return;

                tabsNavs.forEach((item) => {
                    item.classList.remove(ACTIVE_CLASS);
                });

                navItem.classList.add(ACTIVE_CLASS);

                accordionContainer.forEach((contentItem) => {
                    contentItem.classList.remove(ACTIVE_CLASS);
                });

                accordionContainer[index].classList.add(ACTIVE_CLASS);

                const activeAccordion = accordionContainer[index].querySelectorAll('.accordion__item');

                activeAccordion.forEach((item, index) => {
                    if (!item.classList.contains(OPEN_CLASS)) {
                        if (index === 0) {
                            open(item);
                        }
                    } else {
                        const currentItem = item.parentElement.querySelector(`.${OPEN_CLASS}`);
                        if (currentItem) close(currentItem);
                        open(item);
                    }
                });
            });
        });

        const open = (item) => {
            const content = item.querySelector(CONTENT_SELECTOR);
            const button = item.querySelector(BUTTON_SELECTOR);

            if (!content) return;

            item.classList.add(OPEN_CLASS);
            button.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
            content.style.maxHeight = content.scrollHeight + 'px';
        };

        const close = (item) => {
            const content = item.querySelector(CONTENT_SELECTOR);
            const button = item.querySelector(BUTTON_SELECTOR);

            if (!content) return;

            item.classList.remove(OPEN_CLASS);
            button.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            content.style.maxHeight = 0;
        };

        accordionItems.forEach((item, index) => {
            const header = item.querySelector(HEADER_SELECTOR);

            if (index === 0) {
                open(item);
            }

            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentBoxSize) {
                        if (item.classList.contains(OPEN_CLASS)) {
                            const content = item.querySelector(CONTENT_SELECTOR);
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    }
                }
            });

            resizeObserver.observe(item);

            header.addEventListener('click', () => {
                if (item.classList.contains(OPEN_CLASS)) {
                    close(item);
                } else {
                    const currentItem = item.parentElement.querySelector(`.${OPEN_CLASS}`);
                    if (currentItem) close(currentItem);
                    open(item);
                }
            });
        });
    });
}
