const BLOCK_SELECTOR = '.template-horizontal-tabs';
const TAB_SELECTOR = '.template-horizontal-tabs__item';
const TAB_LABEL_SELECTOR = '.template-horizontal-tabs__label';
const CONTENT_BLOCK_SELECTOR = '.template-horizontal-tabs__item-content';
const INNER_CONTENT_SELECTOR = '.template-horizontal-tabs__content-inner';
const ACTIVE_CLASS = 'is-active';
const VISIBLE_CONTENT_CLASS = 'is-visible-tab-content';
const MOBILE_BREAKPOINT = 1024;

export default function HorizontalTabs() {
    const setActive = (el) => {
        [...el.parentElement.parentElement.children].forEach((sib) => sib.classList.remove(VISIBLE_CONTENT_CLASS));
        [...el.parentElement.parentElement.children].forEach((sib) => sib.classList.remove(ACTIVE_CLASS));

        el.parentElement.classList.add(ACTIVE_CLASS);
        setTimeout(() => {
            el.parentElement.classList.add(VISIBLE_CONTENT_CLASS);
        }, 600);
    };

    document.querySelectorAll(BLOCK_SELECTOR).forEach((block) => {
        const tabs = block.querySelectorAll(TAB_SELECTOR);
        const tabsButtons = block.querySelectorAll(TAB_LABEL_SELECTOR);
        const contentBlocks = block.querySelectorAll(CONTENT_BLOCK_SELECTOR);

        if (window.innerWidth >= MOBILE_BREAKPOINT) {
            tabs[tabs.length - 1].classList.add(ACTIVE_CLASS);
        }

        setTimeout(() => {
            tabs[tabs.length - 1].classList.add(VISIBLE_CONTENT_CLASS);
        }, 600);

        tabsButtons.forEach((el) =>
            el.addEventListener('click', (e) => {
                const currentContentBlock = el.parentElement.querySelector(CONTENT_BLOCK_SELECTOR);
                const contentInnerHeight = el.parentElement.querySelector(INNER_CONTENT_SELECTOR).offsetHeight;

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
            }),
        );

        window.addEventListener('resize', (event) => {
            if (window.innerWidth >= MOBILE_BREAKPOINT) {
                contentBlocks.forEach((contentBlock) => {
                    contentBlock.style.height = `auto`;
                });

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
        });
    });
}
