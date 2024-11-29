const ITEM_DATA_SELECTOR = '[data-count]';

const EASING_THRESHOLD = 0.5;
const EASING_MULTIPLIER = 2;
const EASING_OFFSET = -1;
const EASING_FACTOR = 4;

const DEFAULT_DURATION = 5000;

const easeInOutQuad = (t) => {
    return t < EASING_THRESHOLD
        ? EASING_MULTIPLIER * t * t
        : EASING_OFFSET + (EASING_FACTOR - EASING_MULTIPLIER * t) * t;
};

const inViewportCounter = (el) => {
    const duration = +el.dataset.duration || DEFAULT_DURATION;
    const start = +el.textContent;
    const end = +el.dataset.count;
    let raf;

    const counterStart = () => {
        if (start === end) return;

        const range = end - start;
        let curr = start;
        const timeStart = Date.now();

        const loop = () => {
            let elapsed = Date.now() - timeStart;
            if (elapsed > duration) elapsed = duration;
            const progress = elapsed / duration;
            const frac = easeInOutQuad(progress);
            const step = frac * range;
            curr = start + step;
            el.textContent = Math.trunc(curr);
            if (elapsed < duration) raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
    };

    const counterStop = () => {
        cancelAnimationFrame(raf);
        el.textContent = start;
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) counterStart();
            else counterStop();
        });
    });

    observer.observe(el);
};

export default function Stats() {
    document.querySelectorAll(ITEM_DATA_SELECTOR).forEach((item) => {
        inViewportCounter(item);
    });
}