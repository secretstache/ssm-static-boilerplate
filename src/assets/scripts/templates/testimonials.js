import Splide from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

const TEMPLATE_CLASS = 'template-testimonials';

export default function Testimonials() {
    document.querySelectorAll(`.${TEMPLATE_CLASS}`).forEach((template) => {
        const carousel = template.querySelector('.splide');

        if (!carousel) return;

        const options = {
            arrows: false,
            pagination: false,
            type: 'loop',
            gap: 48,
            autoWidth: true,
            focus: 'center',
            interval: 4000,
            autoplay: 'pause',
            intersection: {
                inView: {
                    autoplay: true,
                },
                outView: {
                    autoplay: false,
                },
            },
            dragMinThreshold: 1,
            drag: 'free',
            snap: true,
            breakpoints: {
                768: {
                    autoWidth: false,
                },
            },
        };

        const splide = new Splide(carousel, options);

        splide.mount({ Intersection });
    });
}
