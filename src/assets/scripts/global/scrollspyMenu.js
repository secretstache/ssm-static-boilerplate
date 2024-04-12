const MENU_SELECTOR = '.is-scrollspy';
const SECTION_SELECTOR = '.content-block';
const ACTIVE_CLASS = 'is-active';

export default function ScrollspyMenu() {
    const menus = document.querySelectorAll(MENU_SELECTOR);

    menus.forEach((menu) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const uid = entry.target.id;

                        const activeLink = menu.querySelector(`li.${ACTIVE_CLASS}`);

                        if (activeLink !== null) {
                            activeLink.classList.remove(ACTIVE_CLASS);
                        }

                        const button = menu.querySelector('a[href="#' + uid + '"]');

                        if (button !== null) {
                            button.parentNode.classList.add(ACTIVE_CLASS);
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
