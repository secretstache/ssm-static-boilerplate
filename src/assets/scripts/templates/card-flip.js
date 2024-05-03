import Splide from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

const BLOCK_SELECTOR = '.template-card-flip';

export default function CardFlip() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((template) => {
        const cardFlipDescription = template.querySelectorAll('.template-card-flip__description');
        const carousel = template.querySelector('.splide');

        cardFlipDescription.forEach((desc) => {
            if (desc.scrollHeight > desc.clientHeight) desc.style.paddingRight = '10px';
        });

        if (!carousel) return;

        const options = {
            arrows: false,
            pagination: false,
            autoWidth: true,
            trimSpace: true,
            gap: 30,
            interval: 3000,
            rewind: true,
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
        };

        const splide = new Splide(carousel, options);

        splide.mount({ Intersection });
    });
}
