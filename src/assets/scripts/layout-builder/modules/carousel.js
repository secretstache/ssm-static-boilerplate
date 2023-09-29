import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export default function Carousel(){
    initCarousel();
}

function initCarousel() {
    document.querySelectorAll('.module.splide').forEach(carousel => {

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
        }

        const splide = new Splide( carousel, options );
        splide.mount( { AutoScroll });
    });
};