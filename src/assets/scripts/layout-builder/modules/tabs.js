export default function Tabs(){

    const tabsContainers = document.querySelectorAll(".module.tabs");

    tabsContainers.forEach(tabsContainer => {

        let tabsItems = tabsContainer.querySelectorAll('.tabs-item');
        let tabsNavs = tabsContainer.querySelectorAll('.tabs-nav li');

        for (let n = 0; n < tabsNavs.length; n++) {
            let currentTabNav = tabsNavs[n];
            
            if(tabsNavs[n].classList.contains('is-active')) {
                let tabNavId = tabsNavs[n].querySelector('a').getAttribute("href").substring(1);

                for (let k = 0; k < tabsItems.length; k++) {
                    if(tabsItems[k].id === tabNavId) {
                        let currentItem = tabsItems[k];
                        closeTabs(tabsItems);

                        currentItem.classList.toggle('is-active');
                        currentItem.style.maxHeight ? currentItem.style.maxHeight = null : currentItem.style.maxHeight = currentItem.querySelector('.inner').offsetHeight + 'px';  // changing max-height for tab content
                    }
                }
            }

            currentTabNav.addEventListener("click", function(e) {
                e.preventDefault();
                let tabNavId = currentTabNav.querySelector('a').getAttribute("href").substring(1);

                tabsNavs.forEach((item, index) => { item.classList.remove('is-active'); })
                currentTabNav.classList.add('is-active');

                for (let k = 0; k < tabsItems.length; k++) {
                    if(tabsItems[k].id === tabNavId) {
                        let currentItem = tabsItems[k];
                        closeTabs(tabsItems);

                        currentItem.classList.toggle('is-active');
                        currentItem.style.maxHeight ? currentItem.style.maxHeight = null : currentItem.style.maxHeight = currentItem.querySelector('.inner').offsetHeight + 'px';  // changing max-height for tab content
                    }
                }
                
            });
        }
        

        function closeTabs(tabItems) {
            tabItems.forEach((item, index) => {
                item.classList.remove('is-active');
                item.style.maxHeight = null;
            })
        }

    })
}