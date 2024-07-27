const CONTENT_BLOCKS_SELECTOR = '.content-block:not(.template-masthead)';
const NAVIGATION_BLOCK_SELECTOR = '.aside-navigation';
const NAVIGATION_CATEGORY_SELECTOR = '.aside-navigation__toggler-category';
const NAVIGATION_ELEMENTS_SELECTOR = '.aside-navigation li a';
const NAVIGATION_ELEMENT_ACTIVE_CLASS = 'is-active';
const NAVIGATION_ELEMENT_ACTIVE_STATE_CLASS = 'show-active-state';
const NAVIGATION_LINKS_SELECTOR = '.aside-navigation a[href^="#"]';
const NAVIGATION_MENU_ITEM_CLASS = 'aside-navigation__menu-item';
const NAVIGATION_MOBILE_TOGGLER_SELECTOR = '.aside-navigation__mobile-toggler';
const NAVIGATION_TOGGLER_SELECTOR = '.aside-navigation__toggler';
const OPEN_NAVIGATION_CLASS = 'is-open';
const SCROLLABLE_SECTIONS_SELECTOR = 'main.content > *[id]';
const OVERWRITE_DATA_ATTR = 'data-overwrite';

export default function AsideNavigation() {
    document.querySelectorAll(NAVIGATION_BLOCK_SELECTOR).forEach((navigationBlock) => {
        const asideNavigationToggler = navigationBlock.querySelector(NAVIGATION_TOGGLER_SELECTOR);
        const asideNavigationMobileClose = navigationBlock.querySelector(NAVIGATION_MOBILE_TOGGLER_SELECTOR);
        const asideNavigationTogglerCategory = navigationBlock.querySelector(NAVIGATION_CATEGORY_SELECTOR);
        const contentBlocks = document.querySelectorAll(CONTENT_BLOCKS_SELECTOR);
        const scrollableSections = document.querySelectorAll(SCROLLABLE_SECTIONS_SELECTOR);
        const navigationElements = document.querySelectorAll(NAVIGATION_ELEMENTS_SELECTOR);
        const screenHeight = document.documentElement.clientHeight;

        // Fixed aside navigation
        const setMarginTop = () => {
            const firstBlockTopSpace = contentBlocks[0].getBoundingClientRect().top;
            navigationBlock.style.marginTop = firstBlockTopSpace > 0 ? `${firstBlockTopSpace}px` : 0;
        };

        setMarginTop();
        window.addEventListener('scroll', setMarginTop);

        // set visible navigation
        navigationBlock.style.opacity = 1;

        // Open/close aside navigation
        const toggleNavigation = () => navigationBlock.classList.toggle(OPEN_NAVIGATION_CLASS);
        asideNavigationToggler.addEventListener('click', toggleNavigation);
        asideNavigationMobileClose.addEventListener('click', () => navigationBlock.classList.remove(OPEN_NAVIGATION_CLASS));

        // Autoclose menu if click outside
        document.addEventListener('click', (event) => {
            if (!event.composedPath().includes(navigationBlock)) {
                navigationBlock.classList.remove(OPEN_NAVIGATION_CLASS);
            }
        });

        // Set active nav element
        const setActiveNavElement = () => {
            let current = '';
            scrollableSections.forEach((section) => {
                if (scrollY + screenHeight / 1.5 > section.offsetTop) {
                    current = section.getAttribute('id');
                }
            });

            let isActiveNavItem = false;

            navigationElements.forEach((navigationElement) => {
                const linkHref = navigationElement.getAttribute('href');
                const isMenuItem = navigationElement.classList.contains(NAVIGATION_MENU_ITEM_CLASS);
                const isActive = linkHref === `#${current}`;

                navigationElement.classList.toggle(NAVIGATION_ELEMENT_ACTIVE_CLASS, isActive);
                navigationElement.classList.toggle(NAVIGATION_ELEMENT_ACTIVE_STATE_CLASS, isActive);

                if (isActive && isMenuItem) {
                    isActiveNavItem = true;
                    const attributeText = navigationElement.getAttribute(OVERWRITE_DATA_ATTR);
                    asideNavigationTogglerCategory.innerText = attributeText || navigationElement.innerText;
                }
            });

            if (!isActiveNavItem) {
                const nearestMenuItem = findNearestMenuItem(current);
                if (nearestMenuItem) {
                    asideNavigationTogglerCategory.innerText = nearestMenuItem.innerText;
                }
            }
        };

        const findNearestMenuItem = (currentSectionId) => {
            let menuItem = null;
            let currentTop = document.getElementById(currentSectionId)?.offsetTop || 0;
            let minDistance = Infinity;

            navigationElements.forEach((navigationElement) => {
                const linkHref = navigationElement.getAttribute('href');
                const targetId = linkHref.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection && targetSection.offsetTop < currentTop && currentTop - targetSection.offsetTop < minDistance && navigationElement.classList.contains(NAVIGATION_MENU_ITEM_CLASS)) {
                    minDistance = currentTop - targetSection.offsetTop;
                    menuItem = navigationElement;
                }
            });

            return menuItem;
        };

        window.addEventListener('scroll', setActiveNavElement);

        // Smooth scroll to current section
        document.querySelectorAll(NAVIGATION_LINKS_SELECTOR).forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const targetElement = document.querySelector(anchor.hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth',
                    });

                    navigationBlock.classList.remove(OPEN_NAVIGATION_CLASS);
                }
            });
        });

        // Add active class to elements in view on page load
        const addActiveClassOnLoad = () => {
            const scrollYPosition = window.scrollY;

            navigationElements.forEach((navigationElement) => {
                const linkHref = navigationElement.getAttribute('href');
                const targetId = linkHref.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection && scrollYPosition + screenHeight / 1.5 > targetSection.offsetTop && navigationElement.classList.contains(NAVIGATION_MENU_ITEM_CLASS)) {
                    navigationElement.classList.add(NAVIGATION_ELEMENT_ACTIVE_CLASS);
                }
            });
        };

        addActiveClassOnLoad();
    });
}
