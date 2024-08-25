import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const TEMPLATE_SELECTOR = '.template-logo-wall:has(.splide)';
const SLIDER_SELECTOR = '.splide';
const SLIDE_SELECTOR = '.splide__slide';
const CENTERED_CLASS = 'is-centered';

const SPLIDE_OPTIONS = {
    arrows: false,
    pagination: false,
    autoWidth: true,
    gap: 0,
    autoScroll: {
        pauseOnHover: true,
        pauseOnFocus: true,
        rewind: false,
        speed: 2,
    },
};

export default function LogoWall() {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const slider = template.querySelector(SLIDER_SELECTOR);

        if (!slider) {
            return;
        }

        const slidesLength = template.querySelectorAll(SLIDE_SELECTOR).length;

        const splide = new Splide(slider, SPLIDE_OPTIONS);

        splide.on('overflow', (isOverflow) => {
            if (isOverflow) {
                slider.classList.remove(CENTERED_CLASS);
                splide.options = {
                    ...SPLIDE_OPTIONS,
                    type: 'loop',
                    clones: slidesLength,
                    drag: true,
                };
            } else {
                splide.options = {
                    ...SPLIDE_OPTIONS,
                    clones: 0,
                    type: 'slide',
                    destroy: true,
                    drag: false,
                };
                slider.classList.add(CENTERED_CLASS);
            }
        });

        splide.mount({ AutoScroll });
    });
}
