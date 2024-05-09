import Splide from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

const BLOCK_SELECTOR = '.template-card-flip';
const CARD_DESCRIPTION_CLASS = '.template-card-flip__description';
const CAROUSEL_CLASS = '.splide';
const PADDING_VALUE = 10;

export default function CardFlip() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((template) => {
        const cardFlipDescription = template.querySelectorAll(CARD_DESCRIPTION_CLASS);
        const carousel = template.querySelector(CAROUSEL_CLASS);

        cardFlipDescription.forEach((desc) => {
            if (desc.scrollHeight > desc.clientHeight) desc.style.paddingRight = `${PADDING_VALUE}px`;
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
