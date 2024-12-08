const TEMPLATE_SELECTOR = '.template-observer-content';
const CONTENT_SELECTOR = '.template-observer-content__box';
const ACTIVE_CLASS = 'is-active';

export default function ObserverContent() {
    const templates = document.querySelectorAll(TEMPLATE_SELECTOR);

    if (!templates.length) return;

    const observerOptions = {
        root: null,
        threshold: 0.5,
    };

    const observerCallback = (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            target.textContent = isIntersecting ? 'visible' : 'not visible';
            target.classList.toggle(ACTIVE_CLASS, isIntersecting);
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    templates.forEach((template) => {
        template.querySelectorAll(CONTENT_SELECTOR).forEach((box) => observer.observe(box));
    });
}