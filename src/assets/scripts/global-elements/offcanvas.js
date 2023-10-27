export default function Offcanvas() {
    const drilldownMenus = document.querySelectorAll(".off-canvas .menu.drilldown");

    drilldownMenus.forEach((menu) => {
        const menuItemsHasSubmenu = menu.querySelectorAll(".menu-item.menu-item-has-children");
        const subMenus = menu.querySelectorAll(".menu.submenu");

        subMenus.forEach((submenu) => {
            submenu.insertAdjacentHTML("afterbegin", '<li><a class="drilldown-back" href="#">Back</a></li>');
        });

        menuItemsHasSubmenu.forEach((menuItemHasSubmenu) => {
            menuItemHasSubmenu.addEventListener("click", (e) => {
                e.preventDefault();

                const subMenu = menuItemHasSubmenu.querySelector('.menu.submenu');
                subMenu.classList.add('active');

                if(e.target.classList.contains('drilldown-back')) subMenu.classList.remove('active');


                document.addEventListener('click', (e) => {
                    const withinBoundaries = e.composedPath().includes(menuItemHasSubmenu);

                    if (!withinBoundaries) {
                        subMenu.classList.remove('active')
                    }
                });
            });
        });
    });
}
