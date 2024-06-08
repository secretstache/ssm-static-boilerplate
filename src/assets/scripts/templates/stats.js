const ITEM_DATA_SELECTOR = '[data-count]';

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const inViewportCounter = (el) => {
    const duration = +el.dataset.duration || 5000;
    const start = +el.textContent;
    const end = +el.dataset.count;
    let raf;

    const counterStart = () => {
        if (start === end) return;

        const range = end - start;
        let curr = start;
        const timeStart = Date.now();

        const loop = () => {
            let elaps = Date.now() - timeStart;
            if (elaps > duration) elaps = duration;
            const frac = easeInOutQuad(elaps / duration);
            const step = frac * range;
            curr = start + step;
            el.textContent = Math.trunc(curr);
            if (elaps < duration) raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
    };

    const counterStop = (el) => {
        cancelAnimationFrame(raf);
        el.textContent = start;
    };

    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) counterStart(entry.target);
            else counterStop(entry.target);
        });
    });

    observer.observe(el);
};

export default function Stats() {
    document.querySelectorAll(ITEM_DATA_SELECTOR).forEach((item) => {
        inViewportCounter(item);
    });
}
