import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

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
    document.querySelectorAll('.template-related-content.layout-ticker').forEach((template) => {
        const container = template.querySelector('.splide-container');

        if (container.querySelector('.splide')) return;

        const slideItems = container.querySelectorAll('.splide__slide');
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
        if (template.classList.contains('has-2-rows') && slideItems.length > 3) {
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

        const carousels = container.querySelectorAll('.splide');

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
                    carousel.classList.remove('is-centered');
                } else {
                    if (!has2Rows) {
                        splide.options = {
                            type: 'slide',
                            clones: 0,
                        };

                        carousel.classList.add('is-centered');
                    }
                }
            });

            splide.mount({ AutoScroll });
        });
    });
}
