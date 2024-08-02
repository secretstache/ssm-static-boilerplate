const MENU_SELECTOR = '.is-scrollspy';
const SECTION_SELECTOR = '.content-block';
const ACTIVE_CLASS = 'is-active';
const ACTIVE_LINK = `li.${ACTIVE_CLASS}`;

export default function ScrollspyMenu() {
    const menus = document.querySelectorAll(MENU_SELECTOR);

    menus.forEach((menu) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const uid = entry.target.id;

                        const activeLink = menu.querySelector(ACTIVE_LINK);

                        if (activeLink !== null) {
                            activeLink.classList.remove(ACTIVE_CLASS);
                        }

                        const buttonTrigger = menu.querySelector('a[href="#' + uid + '"]');

                        if (buttonTrigger !== null) {
                            buttonTrigger.parentNode.classList.add(ACTIVE_CLASS);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '-50% 0px',
                threshold: 0,
            },
        );

        const sections = document.querySelectorAll(SECTION_SELECTOR);

        sections.forEach((section) => {
            observer.observe(section);
        });
    });
}
