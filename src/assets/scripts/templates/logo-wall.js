import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const TEMPLATE_CLASS = 'template-logo-wall:has(.splide)';
const SLIDER_CLASS = 'splide';
const SLIDE_CLASS = 'splide__slide';
const CENTERED_CLASS = 'is-centered';

export default function LogoWall() {
    document.querySelectorAll(`.${TEMPLATE_CLASS}`).forEach((template) => {
        const slider = template.querySelector(`.${SLIDER_CLASS}`);
        const slidesLength = template.querySelectorAll(`.${SLIDE_CLASS}`).length;

        const options = {
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

        let splide = new Splide(slider, options);

        splide.on('overflow', function (isOverflow) {
            if (isOverflow) {
                slider.classList.remove(CENTERED_CLASS);
                splide.options = {
                    type: 'loop',
                    clones: slidesLength,
                    drag: true,
                };
            } else {
                splide.options = {
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
