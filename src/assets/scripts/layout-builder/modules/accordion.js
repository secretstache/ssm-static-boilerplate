export default function Accordion() {

    const accordions = document.querySelectorAll(".module.accordion");

    accordions.forEach(accordion => {

        const accordionItems = document.querySelectorAll(".accordion-item");

        const openAccordion = (accordion) => {
            const content = accordion.querySelector(".accordion-content");
            accordion.classList.add("is-active");
            content.style.maxHeight = content.scrollHeight + "px";
        };

        const closeAccordion = (accordion) => {
            const content = accordion.querySelector(".accordion-content");
            accordion.classList.remove("is-active");
            content.style.maxHeight = null;
        };

        accordionItems.forEach((accordionItem) => {
            const title = accordionItem.querySelector(".accordion-title");
            const content = accordionItem.querySelector(".accordion-content");

            title.onclick = () => {
                if (content.style.maxHeight) {
                    closeAccordion(accordionItem);
                } else {
                    accordionItems.forEach((accordionItem) => closeAccordion(accordionItem));
                    openAccordion(accordionItem);
                }
            };
        });
    })
}

