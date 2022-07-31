export class Accordion {
    constructor(accordion) {
        if(accordion.hasAttribute('data-accordion')) { // check for data-accordion attribute
            let accordionItems = accordion.querySelectorAll('.accordion-item');  // accordion items

            for (let n = 0; n < accordionItems.length; n++) { // for each accordion-item
                let currentAccordion = accordionItems[n]; // current accordion
                let currentAccordionTitle = currentAccordion.querySelector('.accordion-title'); // current accordion title
                let content = currentAccordion.querySelector('.accordion-content'); // current accordion content

                currentAccordionTitle.addEventListener("click", function(e) {  // current accordion on click
                    e.preventDefault();

                    if (currentAccordion.classList.contains('active') && !accordion.hasAttribute('data-multi-expand')) {
                        currentAccordion.classList.remove('active');
                        return closeAccordions(accordionItems);
                    }
                    
                    // close accordion items if accordion have data-multi-expand attr
                    !accordion.hasAttribute('data-multi-expand') ? closeAccordions(accordionItems) : false;
                    
                    currentAccordion.classList.toggle('active'); // toggle active class in accordion
                    content.style.maxHeight ? content.style.maxHeight = null : content.style.maxHeight = content.querySelector('.inner').offsetHeight + 'px';  // changing max-height for accordion
                });
            }
            
            /* Closing accordion items function start */
            function closeAccordions(accItems) {
                accItems.forEach((item, index) => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                })
            }
            /* Closing accordion items function end */
        } 
    }
}