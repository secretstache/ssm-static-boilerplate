import Splide from '@splidejs/splide';

const BLOCK_SELECTOR = '.template-product-tour';
const SLIDER_CLASS = '.splide';
const PROGRESS_BAR_CLASS = '.template-product-tour__progress-bar';
const CURRENT_ITEM_NUMBER_CLASS = '.template-product-tour__progress-current';

export default function ProductTour() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((block) => {
        const carousel = block.querySelector(SLIDER_CLASS);

        const options = {
            arrows: true,
            pagination: false,
            type: 'fade',
            gap: 0,
            rewind: true,
            speed: 800,
        };

        const splide = new Splide(carousel, options);

        const progressBar = block.querySelector(PROGRESS_BAR_CLASS);
        const currentSlideEl = block.querySelector(CURRENT_ITEM_NUMBER_CLASS);

        splide.on('mounted move', () => {
            const end = splide.Components.Controller.getEnd() + 1;
            const rate = Math.min((splide.index + 1) / end, 1);

            progressBar.style.width = `${(100 * rate).toFixed(2)}%`;
            currentSlideEl.textContent = String(splide.index + 1).padStart(2, '0');
        });

        splide.mount();
    });
}
