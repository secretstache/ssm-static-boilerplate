const TEMPLATE_SELECTOR = '.template-sticky-section';
const FIXED_CLASS = 'is-fixed';

export default function StickySection() {
    const templates = document.querySelectorAll(TEMPLATE_SELECTOR);

    if (!templates.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };

    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            const template = entry.target;

            if (entry.isIntersecting) {
                return;
            } else {
                template.classList.add(FIXED_CLASS);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    templates.forEach((template) => {
        observer.observe(template);
    });
}
