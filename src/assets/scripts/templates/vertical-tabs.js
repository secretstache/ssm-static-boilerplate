const NAV_ITEMS_CONTAINERS_CLASS = '.template-vertical-tabs__title';
const NAV_ITEMS_CLASS = '.template-vertical-tabs__header > a';
const CONTENT_ITEMS_CLASS = '.template-vertical-tabs__panel';
const PROGRESS_BAR_CLASS = '.template-vertical-tabs__progress-line';
const NAV_CONTAINER_CLASS = '.template-vertical-tabs__item';
const HAS_AUTOPLAY_CLASS = '.has-autoplay';
const TEMPLATE_SELECTOR = '.template-vertical-tabs';

class VerticalTabs {
    constructor(template) {
        //dom
        this.template = template;
        this.navItemsContainers = template.querySelectorAll(NAV_ITEMS_CONTAINERS_CLASS);
        this.navItems = template.querySelectorAll(NAV_ITEMS_CLASS);
        this.contentItems = template.querySelectorAll(CONTENT_ITEMS_CLASS);
        this.progressBars = template.querySelectorAll(PROGRESS_BAR_CLASS);
        this.navContainer = template.querySelector(NAV_CONTAINER_CLASS);

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

        app.navItems[app.currentIndex].closest(NAV_ITEMS_CONTAINERS_CLASS).classList.remove('is-active');
        app.navItems[app.currentIndex].closest(NAV_ITEMS_CONTAINERS_CLASS).setAttribute('aria-selected', 'false');
        app.contentItems[app.currentIndex].classList.remove('is-active');

        app.navItems[index].closest(NAV_ITEMS_CONTAINERS_CLASS).classList.add('is-active');
        app.navItems[index].closest(NAV_ITEMS_CONTAINERS_CLASS).setAttribute('aria-selected', 'true');
        app.contentItems[index].classList.add('is-active');

        if (app.progressBars[app.currentIndex]) {
            app.progressBars[app.currentIndex].style.width = '0%';
        }

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
                app.updateProgressbar(progressTime);

                //switch to the next tab
                if (progressTime >= app.autoplayTime) {
                    let nextIndex = app.currentIndex + 1;
                    if (!app.navItems[nextIndex]) {
                        nextIndex = 0;
                    }
                    app.goToTab(nextIndex);
                    app.updateProgressbar(0);
                }
            }
        }, 10);
    }

    updateProgressbar(val) {
        const app = this;

        const percent = (val * 100) / app.autoplayTime;

        if (app.progressBars[app.currentIndex]) {
            app.progressBars[app.currentIndex].style.width = percent + '%';
        }
    }

    init() {
        const app = this;

        let resizeTimer;

        app.hasAutoplay = !!app.template.querySelector(HAS_AUTOPLAY_CLASS);

        app.contentItems[app.currentIndex].classList.add('is-active');

        // for the smooth animation of title
        app.navItems.forEach((el) => {
            const titleContainer = el.querySelector('span');
            if (!titleContainer || titleContainer.querySelector('mark')) return;
            const title = titleContainer.innerText;
            titleContainer.innerHTML = `<mark>${title}</mark><strong>${title}</strong>`;
        });

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

            app.navItemsContainers.forEach((container) => {
                container.setAttribute('aria-selected', 'false');
            });
        }

        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);

            if (app.hasAutoplay && window.innerWidth < 768) {
                app.progressBars[app.currentIndex].style.width = '0%';
                app.isPaused = true;

                resizeTimer = setTimeout(function () {
                    app.removeActiveClasses();
                }, 250);
            } else {
                app.isPaused = false;
                app.goToTab(app.currentIndex);
            }
        });
    }
}

document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
    const tabs = new VerticalTabs(template);
    tabs.init();
});
