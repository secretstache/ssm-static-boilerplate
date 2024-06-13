const NAV_ITEMS_CONTAINER_CLASS = '.template-section-tabs__item-title';
const NAV_ITEMS_CLASS = '.template-section-tabs__item-header > a';
const CONTENT_ITEMS_CLASS = '.template-section-tabs__panel';

const NAV_CONTAINER_CLASS = '.template-section-tabs__item';
const AUTOPLAY_CLASS = '.has-autoplay';
const BLOCK_CLASS = '.template-section-tabs';

const ACTIVE_CLASS = 'is-active';

class SectionTabs {
    constructor(template) {
        // DOM elements
        this.template = template;
        this.navItemsContainers = template.querySelectorAll(NAV_ITEMS_CONTAINER_CLASS);
        this.navItems = template.querySelectorAll(NAV_ITEMS_CLASS);
        this.contentItems = template.querySelectorAll(CONTENT_ITEMS_CLASS);
        this.navContainer = template.querySelector(NAV_CONTAINER_CLASS);

        // Variables
        this.currentIndex = 0;
        this.hasAutoplay = false;
        this.autoplayTime = 6000;
        this.interval = null;
        this.isPaused = true;
    }

    actions() {
        // On nav item click
        this.navItems.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const index = Array.from(this.navItems).indexOf(el);
                this.isPaused = true;
                this.goToTab(index);
            });
        });

        if (this.hasAutoplay) {
            // On mouse hover, pause autoplay
            this.navContainer.addEventListener('mouseenter', () => {
                this.isPaused = true;
            });

            // On mouse leave, start autoplay
            this.navContainer.addEventListener('mouseleave', () => {
                this.isPaused = false;
            });
        }
    }

    removeActiveClasses() {
        this.contentItems.forEach((panel) => panel.classList.remove(ACTIVE_CLASS));
        this.navItemsContainers.forEach((container) => container.classList.remove(ACTIVE_CLASS));
    }

    goToTab(index) {
        this.navItems[this.currentIndex].closest(NAV_ITEMS_CONTAINER_CLASS).classList.remove(ACTIVE_CLASS);
        this.contentItems[this.currentIndex].classList.remove(ACTIVE_CLASS);

        this.navItems[index].closest(NAV_ITEMS_CONTAINER_CLASS).classList.add(ACTIVE_CLASS);
        this.contentItems[index].classList.add(ACTIVE_CLASS);

        this.currentIndex = index;

        if (this.hasAutoplay && window.innerWidth > 1024) {
            this.startAutoplay();
        }
    }

    startAutoplay() {
        if (this.interval) clearInterval(this.interval);

        let startTime = Date.now();
        let progressTime = 0;

        this.interval = setInterval(() => {
            if (this.isPaused) {
                startTime = Date.now() - progressTime;
            }

            if (!this.isPaused) {
                progressTime = Date.now() - startTime;

                if (progressTime >= this.autoplayTime) {
                    let nextIndex = this.currentIndex + 1;
                    if (!this.navItems[nextIndex]) {
                        nextIndex = 0;
                    }
                    this.goToTab(nextIndex);
                }
            }
        }, 10);
    }

    init() {
        this.hasAutoplay = !!this.template.querySelector(AUTOPLAY_CLASS);
        this.actions();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                this.isPaused = !entry.isIntersecting;
            });
        });

        observer.observe(this.template);

        if (window.scrollY + window.innerHeight > this.template.offsetTop) {
            this.isPaused = false;
        }

        if (this.hasAutoplay && window.innerWidth > 1024) {
            this.startAutoplay();
        }

        if (window.innerWidth < 768) {
            this.removeActiveClasses();
            this.isPaused = false;
        }

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimer);
            if (window.innerWidth < 768) {
                this.resizeTimer = setTimeout(() => {
                    this.removeActiveClasses();
                }, 250);
            }
        });
    }
}

export default function SectionTabsInit() {
    document.querySelectorAll(BLOCK_CLASS).forEach((template) => {
        const tabs = new SectionTabs(template);
        tabs.init();
    });
}
