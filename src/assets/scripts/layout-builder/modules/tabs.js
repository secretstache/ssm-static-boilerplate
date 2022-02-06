$(document).ready(function() {
    let tabs = document.querySelectorAll(".tabs");

    if(tabs.length) {
        for (let i = 0; i < tabs.length; i++) {  // each tabs 
            if(tabs[i].hasAttribute('data-tabs')) { // check for data-tabs attribute
                let tabsItems = tabs[i].querySelectorAll('.tabs-item');  // accordion items
                let tabsNavs = tabs[i].querySelectorAll('.tabs-nav li');  // accordion navs

                for (let n = 0; n < tabsNavs.length; n++) { // for each tabs nav
                    let currentTabNav = tabsNavs[n]; // current tab nav

                    currentTabNav.addEventListener("click", function(e) {  // current tab on click
                        e.preventDefault();
                        let tabNavId = currentTabNav.querySelector('a').getAttribute("href").substring(1); // Get the href of nav which user clicked

                        tabsNavs.forEach((item, index) => { item.classList.remove('is-active'); }) // remove is-active class for each navs
                        currentTabNav.classList.add('is-active'); // add is-active class to active tab nav

                        for (let k = 0; k < tabsItems.length; k++) { // for each tabs items
                            if(tabsItems[k].id === tabNavId) { // searching which tabs item have simular id to href in nav
                                let currentItem = tabsItems[k];
                                closeTabs(tabsItems);  // close all tab items

                                currentItem.classList.toggle('is-active'); // toggle active class in tab content
                                currentItem.style.maxHeight ? currentItem.style.maxHeight = null : currentItem.style.maxHeight = currentItem.querySelector('.inner').offsetHeight + 'px';  // changing max-height for tab content
                            }
                        }
                        
                    });
                }
                
                /* Closing accordion items function start */
                function closeTabs(tabItems) {
                    tabItems.forEach((item, index) => {
                        item.classList.remove('is-active');
                        item.style.maxHeight = null;
                    })
                }
                /* Closing accordion items function end */
            } 

        }
    }
})