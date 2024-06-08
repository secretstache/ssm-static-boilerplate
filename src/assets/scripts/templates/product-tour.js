import Splide from '@splidejs/splide';

export default function ProductTour() {
    document.querySelectorAll('.template-product-tour').forEach((block) => {
        const carousel = block.querySelector('.splide');

        const options = {
            arrows: true,
            pagination: false,
            type: 'fade',
            gap: 0,
            rewind: true,
            speed: 800,
        };

        const splide = new Splide(carousel, options);

        // progress bar
        const bar = block.querySelector('.template-product-tour__progress-bar');
        const currentSlideEl = block.querySelector('.template-product-tour__progress-current');

        splide.on('mounted move', function () {
            const end = splide.Components.Controller.getEnd() + 1;
            console.log(splide.Components.Controller);
            const rate = Math.min((splide.index + 1) / end, 1);
            bar.style.width = String(100 * rate) + '%';

            currentSlideEl.innerHTML = String(splide.index + 1).padStart(2, '0');
        });

        splide.mount();
    });
}
