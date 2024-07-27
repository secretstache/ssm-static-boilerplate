const BLOCK_SELECTOR = '.site-header .mega-menu';
const MEGA_MENU_ITEM = '.mega-menu__item';
const SUB_MENU_ITEM = '.mega-menu__sub-menu';

const ACTIVE_CLASS = 'is-active';
const OFFCANVAS_NAVIGATION = '.offcanvas__navigation > ul';
const OFFCANVAS_MENU_ITEM_HAS_SUBMENU = '.menu-item-has-children';

const ARROW_CLASS = 'dropdown-arrow';
const POSITION_BOTTOM_CLASS = 'is-bottom-pos';
const POSITION_TOP_CLASS = 'is-top-pos';

function isHidden(element) {
    const elementRect = element.getBoundingClientRect();
    const elementHidesUp = elementRect.top < 0;
    const elementHidesLeft = elementRect.left < 0;
    const elementHidesDown = elementRect.bottom > window.innerHeight;
    const elementHidesRight = elementRect.right > window.innerWidth;
    const elementHides = elementHidesUp || elementHidesLeft || elementHidesDown || elementHidesRight;
    return elementHides;
}

const MegaMenuDesktop = (BLOCK_SELECTOR) => {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((template) => {
        const menuItems = template.querySelectorAll(MEGA_MENU_ITEM);
        const subMenus = template.querySelectorAll(SUB_MENU_ITEM);

        subMenus.forEach((subMenu) => {
            if (isHidden(subMenu)) subMenu.classList.add(POSITION_BOTTOM_CLASS);

            if (subMenu.getBoundingClientRect().top < 140) {
                subMenu.classList.add(POSITION_TOP_CLASS);
            }
        });

        menuItems.forEach((menuItem) => {
            const dataBg = menuItem.dataset.image;

            if (dataBg) {
                menuItem.addEventListener('mouseover', function () {
                    template.style.setProperty('--data-bg', `url('${dataBg}')`);
                    template.style.setProperty('--bg-opacity', 1);
                });

                menuItem.addEventListener('mouseout', function () {
                    template.style.setProperty('--data-bg', '');
                    template.style.setProperty('--bg-opacity', 0);
                });
            }
        });
    });
};

const MegaMenuMobile = (OFFCANVAS_NAVIGATION) => {
    document.querySelectorAll(OFFCANVAS_NAVIGATION).forEach((offcanvasNavigation) => {
        let offcanvasItems = offcanvasNavigation.querySelectorAll(OFFCANVAS_MENU_ITEM_HAS_SUBMENU);

        offcanvasItems.forEach((dropdownItem) => {
            const offcanvasMegaMenu = dropdownItem.querySelectorAll('.mega-menu__menu, .mega-menu__sub-menu');

            if (offcanvasMegaMenu.length != 0) {
                const innerMenu = dropdownItem.querySelector('ul');

                const innerMenuHeight = innerMenu.scrollHeight;

                dropdownItem.insertAdjacentHTML('beforeEnd', `<span class="${ARROW_CLASS}"></span>`);

                const link = dropdownItem.querySelector('a');
                const arrow = dropdownItem.querySelector(`.${ARROW_CLASS}`);
                const submenu = dropdownItem.querySelector('ul');

                innerMenu.style.maxHeight = `0px`;

                dropdownItem.innerHTML = '';

                const div = document.createElement('div');

                div.appendChild(link);
                div.appendChild(arrow);

                dropdownItem.appendChild(div);
                dropdownItem.appendChild(submenu);

                arrow.addEventListener('click', (e) => {
                    if (e.target.classList.contains(ARROW_CLASS)) {
                        const hasActiveClass = dropdownItem.classList.contains(ACTIVE_CLASS);

                        if (hasActiveClass) {
                            dropdownItem.classList.remove(ACTIVE_CLASS);
                            innerMenu.style.maxHeight = `0px`;
                        } else {
                            dropdownItem.classList.add(ACTIVE_CLASS);
                            innerMenu.style.maxHeight = `${innerMenuHeight}px`;
                        }
                    }
                });
            }
        });
    });
};

MegaMenuDesktop(BLOCK_SELECTOR);
MegaMenuMobile(OFFCANVAS_NAVIGATION);

export { MegaMenuDesktop, MegaMenuMobile };
