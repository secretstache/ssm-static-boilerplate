const NAV_ITEMS_CONTAINER_CLASS = '.template-section-tabs__item-title';
const NAV_ITEMS_CLASS = '.template-section-tabs__item-header > a';
const CONTENT_ITEMS_CLASS = '.template-section-tabs__panel';

const NAV_CONTAINER_CLASS = '.template-section-tabs__item';
const AUTOPLAY_CLASS = '.has-autoplay';
const BLOCK_CLASS = '.template-section-tabs';

const ACTIVE_CLASS = 'is-active';

const setupActions = (navItems, goToTab, navContainer, setPaused) => {
    navItems.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            setPaused(true);
            goToTab(index);
        });
    });

    navContainer.addEventListener('mouseenter', () => setPaused(true));
    navContainer.addEventListener('mouseleave', () => setPaused(false));
};

const removeActiveClasses = (contentItems, navItemsContainers) => {
    contentItems.forEach((panel) => panel.classList.remove(ACTIVE_CLASS));
    navItemsContainers.forEach((container) => container.classList.remove(ACTIVE_CLASS));
};

const goToTab = (index, state) => {
    const { navItems, contentItems, navItemsContainers, currentIndex, hasAutoplay, startAutoplay } = state;

    navItems[currentIndex].closest(NAV_ITEMS_CONTAINER_CLASS).classList.remove(ACTIVE_CLASS);
    contentItems[currentIndex].classList.remove(ACTIVE_CLASS);

    navItems[index].closest(NAV_ITEMS_CONTAINER_CLASS).classList.add(ACTIVE_CLASS);
    contentItems[index].classList.add(ACTIVE_CLASS);

    state.currentIndex = index;

    if (hasAutoplay && window.innerWidth > 1024) {
        startAutoplay();
    }
};

const startAutoplay = (state) => {
    const { autoplayTime, navItems, currentIndex, setPaused, goToTab } = state;
    if (state.interval) clearInterval(state.interval);

    let startTime = Date.now();
    let progressTime = 0;

    state.interval = setInterval(() => {
        if (state.isPaused) {
            startTime = Date.now() - progressTime;
        } else {
            progressTime = Date.now() - startTime;

            if (progressTime >= autoplayTime) {
                const nextIndex = (currentIndex + 1) % navItems.length;
                goToTab(nextIndex, state);
            }
        }
    }, 10);
};

const initSectionTabs = (template) => {
    const navItemsContainers = template.querySelectorAll(NAV_ITEMS_CONTAINER_CLASS);
    const navItems = template.querySelectorAll(NAV_ITEMS_CLASS);
    const contentItems = template.querySelectorAll(CONTENT_ITEMS_CLASS);
    const navContainer = template.querySelector(NAV_CONTAINER_CLASS);
    const hasAutoplay = !!template.querySelector(AUTOPLAY_CLASS);

    const state = {
        currentIndex: 0,
        autoplayTime: 6000,
        interval: null,
        isPaused: true,
        navItems,
        contentItems,
        navItemsContainers,
        hasAutoplay,
        startAutoplay: () => startAutoplay(state),
        setPaused: (paused) => { state.isPaused = paused; },
    };

    setupActions(navItems, (index) => goToTab(index, state), navContainer, state.setPaused);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => state.setPaused(!entry.isIntersecting));
    });
    observer.observe(template);

    if (hasAutoplay && window.innerWidth > 1024) {
        state.startAutoplay();
    }

    if (window.innerWidth < 768) {
        removeActiveClasses(contentItems, navItemsContainers);
        state.setPaused(false);
    }

    window.addEventListener('resize', () => {
        clearTimeout(state.resizeTimer);
        if (window.innerWidth < 768) {
            state.resizeTimer = setTimeout(() => {
                removeActiveClasses(contentItems, navItemsContainers);
            }, 250);
        }
    });
};

export default function SectionTabsInit() {
    document.querySelectorAll(BLOCK_CLASS).forEach((template) => {
        initSectionTabs(template);
    });
}