import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const TEMPLATE_CLASS = '.template-icon-grid';
const SLIDER_CLASS = '.splide';
const SLIDE_CLASS = '.splide__slide';
const ITEM_CLASS = '.template-icon-grid__item';

export function IconGrid() {
    document.querySelectorAll(TEMPLATE_CLASS).forEach((template) => {
        const slider = template.querySelector(SLIDER_CLASS);
        const slidesLength = template.querySelectorAll(SLIDE_CLASS).length;
        const sliderItems = template.querySelectorAll(ITEM_CLASS);

        const options = getSplideOptions();

        setSliderItemsWidth(sliderItems, slidesLength);

        let splide = new Splide(slider, options);

        splide.on('overflow', (isOverflow) => {
            checkOverflow(splide, slider, slidesLength, isOverflow);
        });

        splide.mount({ AutoScroll });
    });
}

function getSplideOptions() {
    return {
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
}

function setSliderItemsWidth(sliderItems, slidesLength) {
    const width = slidesLength <= 4 ? '405px' : '354px';
    sliderItems.forEach((sliderItem) => {
        sliderItem.style.maxWidth = width;
    });
}

function checkOverflow(splide, slider, slidesLength, isOverflow) {
    if (isOverflow) {
        if (slidesLength <= 3) {
            slider.classList.remove('has-3-col');
        }
        slider.classList.remove('is-centered');
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
        slider.classList.add('is-centered');
        if (slidesLength <= 3) {
            slider.classList.add('has-3-col');
        }
    }
}
