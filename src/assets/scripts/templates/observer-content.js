const TEMPLATE_SELECTOR = '.template-observer-content';
const CONTENT_SELECTOR = '.template-observer-content__box';
const ACTIVE_CLASS = 'is-active';

export default function ObserverContent() {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const boxes = template.querySelectorAll(CONTENT_SELECTOR);

        const observerOptions = {
            root: null,
            threshold: 0.5,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.textContent = 'visible';
                    entry.target.classList.add(ACTIVE_CLASS);
                } else {
                    entry.target.textContent = 'not visible';
                    entry.target.classList.remove(ACTIVE_CLASS);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        boxes.forEach((box) => {
            observer.observe(box);
        });
    });
}
