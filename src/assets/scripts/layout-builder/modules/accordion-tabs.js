import { throttle } from '../../lib/utilities';

export default function AccordionTabs(){

    let isAccordion = false;
    const accordionBreakpoint = 1023

    window.addEventListener('resize', throttle(tabControl, 200));

    function tabControl() {
        const tabContainers = document.querySelectorAll('.accordion-tabs');

        tabContainers.forEach(function (tabContainer) {
            const tabs = tabContainer.querySelector('.accordion-tabs-nav ul');
            const tabItems = tabContainer.querySelectorAll('.accordion-tabs-item');

            if (window.innerWidth <= accordionBreakpoint) {
                isAccordion = true;
            } else {
                isAccordion = false;
            }

            if (isAccordion) {

                tabItems.forEach(function (item, index) {

                    item.addEventListener('click', function () {
                        const currId = item.getAttribute('id');

                        tabItems.forEach(function (element) {
                            element.classList.remove('active');
                        });

                        item.classList.add('active');
                        const tabLink = tabs.querySelector('a[href="#' + currId + '"]');

                        tabLinks.forEach(function (link) {
                            link.classList.remove('active');
                        });

                        tabLink.classList.add('active');

                        const tabContent = tabContainer.querySelector(currId);

                        tabItems.forEach(function (contentItem) {
                            contentItem.style.maxHeight = '0';
                        });
                        // tabContent.style.maxHeight = tabContent.scrollHeight + 'px';
                    });

                    if (index === 0) {
                        item.classList.add('active');
                        const tabContent = tabContainer.querySelector('#' + item.getAttribute('id'));
                        tabContent.style.maxHeight = tabContent.scrollHeight + 'px';
                    }
                });

            } else {
                const tabLinks = tabs.querySelectorAll('a');

                tabLinks.forEach(function (tabLink) {
                    tabLink.addEventListener('click', function (event) {
                        event.preventDefault();
                        const target = tabLink.getAttribute('href').substring(1);

                        tabItems.forEach(function (item) {
                            item.classList.remove('active');
                        });

                        const content = tabContainer.querySelector('#' + target);
                        content.classList.add('active');

                        tabLinks.forEach(function (link) {
                            link.classList.remove('active');
                        });

                        tabLink.classList.add('active');
                    });
                });
            }
        });
    }

    tabControl();

}