export default function Navigation(){

    const dropdownMenu = document.querySelectorAll('.menu.dropdown')
    const openClass = 'open'

    dropdownMenu.forEach( menu => {
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
}