export default function Navigation(){

    const menus = document.querySelectorAll('.menu:not(.submenu)');
    const dropdownMenus = document.querySelectorAll('.menu.dropdown')
    const openClass = 'open'

    dropdownMenus.forEach( menu => {
        const menuItemsHasSubmenu = menu.querySelectorAll('.menu-item.menu-item-has-children');

        menuItemsHasSubmenu.forEach( menuItemHasSubmenu => {

            menuItemHasSubmenu.addEventListener('click', (e) => {
                e.preventDefault;

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

            setTimeout(() => {
                window.addEventListener('resize', function(event) {
                    setMegaMenuPosition()
                });
            }, 250)
        })
    })
}

