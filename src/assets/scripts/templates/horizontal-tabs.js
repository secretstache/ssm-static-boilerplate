const BLOCK_SELECTOR = '.template-horizontal-tabs';
const TAB_SELECTOR = '.template-horizontal-tabs__item';
const TAB_LIST_SELECTOR = '.template-horizontal-tabs__list';
const TAB_LABEL_SELECTOR = '.template-horizontal-tabs__label';
const CONTENT_BLOCK_SELECTOR = '.template-horizontal-tabs__item-content';
const INNER_CONTENT_SELECTOR = '.template-horizontal-tabs__content-inner';
const CLOSE_BUTTON_SELECTOR = '.template-horizontal-tabs__close-button';
const ACTIVE_CLASS = 'is-active';
const VISIBLE_CONTENT_CLASS = 'is-visible-tab-content';
const HAS_OPEN_TAB_CLASS = 'has-open-tab';
const MOBILE_BREAKPOINT = 1024;

export default function HorizontalTabs() {
    const setActive = (el) => {
        const parent = el.parentElement.parentElement;
        parent.querySelectorAll(`.${VISIBLE_CONTENT_CLASS}, .${ACTIVE_CLASS}`).forEach((sib) => {
            sib.classList.remove(VISIBLE_CONTENT_CLASS, ACTIVE_CLASS);
        });

        el.parentElement.classList.add(ACTIVE_CLASS);
        setTimeout(() => {
            el.parentElement.classList.add(VISIBLE_CONTENT_CLASS);
        }, 600);
    };

    const handleResize = (tabs, contentBlocks, tabsList) => {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
            contentBlocks.forEach((contentBlock) => {
                contentBlock.style.height = `auto`;
            });

            tabsList.classList.remove(HAS_OPEN_TAB_CLASS);

            tabs.forEach((tab) => {
                tab.classList.remove(ACTIVE_CLASS);
            });

            tabs[tabs.length - 1].classList.add(ACTIVE_CLASS);
            setTimeout(() => {
                tabs[tabs.length - 1].classList.add(VISIBLE_CONTENT_CLASS);
            }, 600);
        } else {
            tabs.forEach((tab) => {
                tab.classList.remove(ACTIVE_CLASS);
            });
            contentBlocks.forEach((contentBlock) => {
                contentBlock.style.height = 0;
            });
        }
    };

    document.querySelectorAll(BLOCK_SELECTOR).forEach((block) => {
        const tabs = block.querySelectorAll(TAB_SELECTOR);
        const tabsList = block.querySelector(TAB_LIST_SELECTOR);
        const tabsButtons = block.querySelectorAll(TAB_LABEL_SELECTOR);
        const contentBlocks = block.querySelectorAll(CONTENT_BLOCK_SELECTOR);

        if (window.innerWidth >= MOBILE_BREAKPOINT) {
            tabs[tabs.length - 1].classList.add(ACTIVE_CLASS);
        }

        setTimeout(() => {
            tabs[tabs.length - 1].classList.add(VISIBLE_CONTENT_CLASS);
        }, 600);

        tabsButtons.forEach((el) => {
            const currentContentBlock = el.parentElement.querySelector(CONTENT_BLOCK_SELECTOR);
            const contentInnerHeight = el.parentElement.querySelector(INNER_CONTENT_SELECTOR).offsetHeight;
            const closeButton = el.parentElement.querySelector(CLOSE_BUTTON_SELECTOR);

            el.addEventListener('click', () => {
                tabsList.classList.add(HAS_OPEN_TAB_CLASS);

                closeButton.addEventListener('click', () => {
                    tabsList.classList.remove(HAS_OPEN_TAB_CLASS);
                    currentContentBlock.style.height = 0;
                    el.parentElement.classList.remove(ACTIVE_CLASS);
                });

                if (document.body.clientWidth < MOBILE_BREAKPOINT) {
                    if (el.classList.contains(ACTIVE_CLASS)) {
                        currentContentBlock.style.height = 0;
                        el.classList.remove(ACTIVE_CLASS);
                    } else {
                        contentBlocks.forEach((contentBlock) => {
                            contentBlock.style.height = 0;
                        });
                        currentContentBlock.style.height = `${contentInnerHeight}px`;
                        setActive(el);
                    }
                } else {
                    setActive(el);
                    currentContentBlock.style.height = `auto`;
                }
            });
        });

        window.addEventListener('resize', () => handleResize(tabs, contentBlocks, tabsList));
    });
}
