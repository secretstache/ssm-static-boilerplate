const navItemsContainersClass = '.template-section-tabs__item-title';
const navItemsClass = '.template-section-tabs__item-header > a';
const contentItemsClass = '.template-section-tabs__panel';

const navContainerClass = '.template-section-tabs__item';
const hasAutoplayClass = '.has-autoplay';
const blockClass = '.template-section-tabs';

class SectionTabs {
    constructor(template) {
        //dom
        this.template = template;
        this.navItemsContainers = template.querySelectorAll(navItemsContainersClass);
        this.navItems = template.querySelectorAll(navItemsClass);
        this.contentItems = template.querySelectorAll(contentItemsClass);
        this.navContainer = template.querySelector(navContainerClass);

        //vars
        this.currentIndex = 0;

        //autoplay
        this.hasAutoplay = false;
        this.autoplayTime = 6000;
        this.interval = null;
        this.isPaused = true;
    }

    actions() {
        const app = this;

        //on nav item click
        app.navItems.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                const index = [...app.navItems].indexOf(el);

                app.isPaused = true;
                app.goToTab(index);
            });
        });

        if (app.hasAutoplay) {
            //mouse events

            //on mouse hover, pause autoplay
            app.navContainer.addEventListener('mouseenter', () => {
                app.isPaused = true;
            });

            //on mouse leave, start autoplay
            app.navContainer.addEventListener('mouseleave', () => {
                app.isPaused = false;
            });
        }
    }

    removeActiveClasses() {
        const app = this;

        app.contentItems.forEach((panel) => {
            panel.classList.remove('is-active');
        });

        app.navItemsContainers.forEach((container) => {
            container.classList.remove('is-active');
        });
    }

    goToTab(index) {
        const app = this;

        app.navItems[app.currentIndex].closest(navItemsContainersClass).classList.remove('is-active');
        app.contentItems[app.currentIndex].classList.remove('is-active');

        app.navItems[index].closest(navItemsContainersClass).classList.add('is-active');
        app.contentItems[index].classList.add('is-active');

        app.currentIndex = index;

        if (app.hasAutoplay && window.innerWidth > 1024) {
            app.startAutoplay();
        }
    }

    startAutoplay() {
        const app = this;
        let startTime = Date.now();
        let progressTime = 0;

        if (app.interval) {
            clearInterval(app.interval);
        }

        app.interval = setInterval(() => {
            if (app.isPaused) {
                startTime = Date.now() - progressTime;
            }

            if (!app.isPaused) {
                progressTime = Date.now() - startTime;
                // app.updateProgressbar(progressTime);

                //switch to the next tab
                if (progressTime >= app.autoplayTime) {
                    let nextIndex = app.currentIndex + 1;
                    if (!app.navItems[nextIndex]) {
                        nextIndex = 0;
                    }
                    app.goToTab(nextIndex);
                }
            }
        }, 10);
    }

    init() {
        const app = this;

        let resizeTimer;

        app.hasAutoplay = !!app.template.querySelector(hasAutoplayClass);

        app.actions();

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (app.hasAutoplay && window.innerWidth > 1024) {
                        //if template is in view, start the autoplay
                        app.isPaused = false;
                    }
                } else {
                    app.isPaused = true;
                }
            });
        });

        observer.observe(app.template);

        //if template is in view, start the autoplay
        if (window.scrollY + window.innerHeight > app.template.offsetTop) {
            app.isPaused = false;
        }

        if (app.hasAutoplay && window.innerWidth > 1024) {
            app.startAutoplay();
        }

        if (app.hasAutoplay && window.innerWidth > 1024) {
            app.startAutoplay();
        }

        if (window.innerWidth < 768) {
            app.removeActiveClasses();
            app.isPaused = false;
        }

        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);

            if (window.innerWidth < 768) {
                resizeTimer = setTimeout(function () {
                    app.removeActiveClasses();
                }, 250);
            }
        });
    }
}

export default function SectionTabsInit(){
    document.querySelectorAll(blockClass).forEach((template) => {
        const tabs = new SectionTabs(template);
        tabs.init();
    });
}

