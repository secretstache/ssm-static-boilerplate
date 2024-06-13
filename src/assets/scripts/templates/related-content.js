import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const BLOCK_SELECTOR = '.template-related-content.layout-ticker';
const SLIDER_CONTAINER = '.splide-container';
const SLIDER_CLASS = '.splide';
const SLIDE_CLASS = '.splide__slide';

const ROWS_CLASS = 'has-2-rows';
const CENTERED_CLASS = 'is-centered';

export default function RelatedContent() {
    initRelatedContentSliders();

    document.addEventListener('facetwp-loaded', function () {
        initRelatedContentSliders();
    });
}

const outerHTML = (elem) => elem.outerHTML;

const concatHTML = (html, group) => `${html}<div class="splide related-content-carousel"><div class="splide__track"><div class="splide__list">\n${group.join('\n')}\n</div></div></div>\n`;

const toGroups = (elems, numCols = 2) => {
    const elemsArr = Array.from(elems).map(outerHTML);
    const total = elems.length;

    let chunks = Math.ceil(total / numCols);
    let result = [];

    for (let i = 0; i < numCols; i++) {
        result.push(elemsArr.splice(0, chunks));
    }

    if (elemsArr.length > 0) result.push(elemsArr);

    return result.reduce(concatHTML, '');
};

function initRelatedContentSliders() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((template) => {
        const container = template.querySelector(SLIDER_CONTAINER);

        if (container.querySelector(SLIDER_CLASS)) return;

        const slideItems = container.querySelectorAll(SLIDE_CLASS);
        const gap = 16;

        const options = {
            arrows: false,
            pagination: false,
            type: 'loop',
            autoWidth: true,
            gap: gap,
            clones: 6,
            autoScroll: {
                pauseOnHover: true,
                pauseOnFocus: false,
                rewind: false,
                speed: 2,
            },
        };

        let has2Rows = false;

        //break to 2 rows
        if (template.classList.contains(ROWS_CLASS) && slideItems.length > 3) {
            has2Rows = true;

            container.innerHTML = toGroups(slideItems, 2);
        } else {
            container.innerHTML = `<div class="splide related-content-carousel">
                                <div class="splide__track">
                                    <div class="splide__list">
                                        ${container.innerHTML}
                                    </div>
                                </div>
                            </div>`;
        }

        const carousels = container.querySelectorAll(SLIDER_CLASS);

        carousels.forEach((carousel, index) => {
            if (index === 1) {
                options.autoScroll.speed = -2;
            }

            const splide = new Splide(carousel, options);

            splide.on('overflow', function (isOverflow) {
                if (isOverflow) {
                    splide.options = {
                        type: 'loop',
                    };

                    carousel.classList.remove(CENTERED_CLASS);
                } else {
                    if (!has2Rows) {
                        splide.options = {
                            type: 'slide',
                            clones: 0,
                        };

                        carousel.classList.add(CENTERED_CLASS);
                    }
                }
            });

            splide.mount({ AutoScroll });
        });
    });
}
