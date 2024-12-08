const TEMPLATE_SELECTOR = '.template-sticky-section';
const FIXED_CLASS = 'is-fixed';

export default function StickySection() {
    const templates = document.querySelectorAll(TEMPLATE_SELECTOR);

    if (!templates.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                target.classList.toggle(FIXED_CLASS, !isIntersecting);
            });
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        }
    );

    templates.forEach((template) => observer.observe(template));
}