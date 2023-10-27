import { throttle } from '../lib/utilities';

export default function Navigation(){

    const menus = document.querySelectorAll('.menu:not(.submenu)');
    const dropdownMenus = document.querySelectorAll('.menu.dropdown');
    const drilldownMenus = document.querySelectorAll('.menu.drilldown');
    const openClass = 'open'


    dropdownMenus.forEach( menu => {
        const menuItemsHasSubmenu = menu.querySelectorAll('.menu-item.menu-item-has-children');

        const openDropdownMenu = (dropdownMenu) => {
            dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
        };

        const closeDropdownMenu = (dropdownMenu) => {
            dropdownMenu.style.maxHeight = null;
        };

        menuItemsHasSubmenu.forEach( menuItemHasSubmenu => {
            const submenu = menuItemHasSubmenu.querySelector(".menu.submenu");

            menuItemHasSubmenu.addEventListener('click', (e) => {
                e.preventDefault;

                if (submenu.style.maxHeight) {
                    closeDropdownMenu(submenu);
                } else {
                    openDropdownMenu(submenu);
                }

                // toggle open class
                if(menuItemHasSubmenu.classList.contains(openClass)) {
                    menuItemHasSubmenu.classList.remove(openClass)
                } else {
                    menuItemHasSubmenu.classList.add(openClass)
                }
            })

            document.addEventListener('click', (e) => {
                const withinBoundaries = e.composedPath().includes(menuItemHasSubmenu)

                if (!withinBoundaries) {
                    menuItemHasSubmenu.classList.remove(openClass)
                    closeDropdownMenu(submenu);
                }
            });
        });
    });

    menus.forEach(menu => {
        const megeMenuItems = menu.querySelectorAll('.menu-item-has-megamenu > .menu.submenu');

        // mega menu items
        megeMenuItems.forEach(megeMenuItem => {

            function setMegaMenuPosition() {
                const megeMenuItemPosition = megeMenuItem.getBoundingClientRect();
                const megeMenuItemPositionLeft = megeMenuItemPosition.left
                const megeMenuItemPositionRight = megeMenuItemPosition.right

                megeMenuItem.style.left = `-${megeMenuItemPositionLeft}px`;
                megeMenuItem.style.right = `${megeMenuItemPositionRight}px`;
            }

            setMegaMenuPosition()

            window.addEventListener('resize', throttle(setMegaMenuPosition, 200));
        })
    })
}
