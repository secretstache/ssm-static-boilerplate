const ITEM_DATA_SELECTOR = '[data-count]';

const DEFAULT_DURATION = 5000;

const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const inViewportCounter = (el) => {
    const duration = Number(el.dataset.duration) || DEFAULT_DURATION;
    const start = Number(el.textContent);
    const end = Number(el.dataset.count);

    if (start === end) return;

    const range = end - start;

    const animate = (elapsed) => {
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress);
        el.textContent = Math.trunc(start + easedProgress * range);

        if (progress < 1) {
            requestAnimationFrame((newTime) => animate(newTime - timeStart));
        }
    };

    let timeStart;

    const startAnimation = () => {
        timeStart = performance.now();
        requestAnimationFrame((newTime) => animate(newTime - timeStart));
    };

    const stopAnimation = () => {
        el.textContent = start;
    };

    const observer = new IntersectionObserver(([entry]) => {
        entry.isIntersecting ? startAnimation() : stopAnimation();
    });

    observer.observe(el);
};

export default function Stats() {
    document.querySelectorAll(ITEM_DATA_SELECTOR).forEach(inViewportCounter);
}