const navItemsContainersClass = '.template-section-tabs__item-title';
const navItemsClass = '.template-section-tabs__item-header > a';
const contentItemsClass = '.template-section-tabs__panel';

const navContainerClass = '.template-section-tabs__item';
const hasAutoplayClass = '.has-autoplay';
const blockClass = '.template-section-tabs';

class SectionTabs {
    constructor(template) {
        // DOM elements
        this.template = template;
        this.navItemsContainers = template.querySelectorAll(navItemsContainersClass);
        this.navItems = template.querySelectorAll(navItemsClass);
        this.contentItems = template.querySelectorAll(contentItemsClass);
        this.navContainer = template.querySelector(navContainerClass);

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
        this.contentItems.forEach(panel => panel.classList.remove('is-active'));
        this.navItemsContainers.forEach(container => container.classList.remove('is-active'));
    }

    goToTab(index) {
        this.navItems[this.currentIndex].closest(navItemsContainersClass).classList.remove('is-active');
        this.contentItems[this.currentIndex].classList.remove('is-active');

        this.navItems[index].closest(navItemsContainersClass).classList.add('is-active');
        this.contentItems[index].classList.add('is-active');

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
        this.hasAutoplay = !!this.template.querySelector(hasAutoplayClass);
        this.actions();

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
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
    document.querySelectorAll(blockClass).forEach(template => {
        const tabs = new SectionTabs(template);
        tabs.init();
    });
}