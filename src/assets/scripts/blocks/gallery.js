import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Intersection } from '@splidejs/splide-extension-intersection';
import lightGallery from 'lightgallery';

const BLOCK_SELECTOR = '.wp-block-gallery';
const BLOCK_IMAGE_SELECTOR = '.wp-block-image';

const CAROUSEL_CLASS = 'is-style-carousel';
const LIGHTBOX_CLASS = 'is-style-lightbox';
const SLIDE_CLASS = 'splide__slide';
const SPLIDE_CLASS = 'splide';
const TRACK_CLASS = 'splide__track';
const SPLIDE_LIST_CLASS = 'splide__list';
const GALLERY_ITEM_CLASS = 'lightgallery-item';

const GAP_SIZE = 20;
const AUTO_SCROLL_SPEED = 1;
const CLONE_MULTIPLIER = 2;

export const Gallery = () => {
    document.querySelectorAll(`${BLOCK_SELECTOR}.${CAROUSEL_CLASS}`).forEach((gallery) => {
        if (gallery) setupGalleryCarousel(gallery);
    });

    document.querySelectorAll(`${BLOCK_SELECTOR}.${LIGHTBOX_CLASS}`).forEach((gallery) => {
        if (gallery) setupGalleryLightBox(gallery);
    });
};

export const setupGalleryLightBox = (gallery) => {
    if (!gallery) return;

    const regexImage = /.+\.(gif|jpe?g|png|webp|svg|avif|heif|heic|tif?f|)($|\?)/i;
    const images = gallery.querySelectorAll(BLOCK_IMAGE_SELECTOR);

    let isLightbox = false;

    images.forEach((image) => {
        const link = image.querySelector('a');

        if (link && regexImage.test(link.getAttribute('href'))) {
            isLightbox = true;
            link.classList.add(GALLERY_ITEM_CLASS);
        }
    });

    if (isLightbox) {
        lightGallery(gallery, {
            licenseKey: '4B0B052C-5BCB4CCF-99EF0E30-D0B78394',
            selector: `.${GALLERY_ITEM_CLASS}`,
            download: false,
            getCaptionFromTitleOrAlt: false,
            counter: false,
            mobileSettings: {
                controls: false,
                counter: false,
                showCloseIcon: false,
                rotate: false,
            },
        });
    }
};

export const setupGalleryCarousel = (gallery, isEditor = false) => {
    if (!gallery) return;

    gallery.classList.add(SPLIDE_CLASS);

    const galleryItems = gallery.querySelectorAll(BLOCK_IMAGE_SELECTOR);

    if (!isEditor) {
        const track = document.createElement('div');
        track.classList.add(TRACK_CLASS);

        const list = document.createElement('ul');
        list.classList.add(SPLIDE_LIST_CLASS);

        galleryItems.forEach((item) => {
            if (!item) return;

            const slideWrapper = document.createElement('li');

            slideWrapper.classList.add(SLIDE_CLASS);
            slideWrapper.appendChild(item.cloneNode(true));

            list.appendChild(slideWrapper);
            item.remove();
        });

        track.appendChild(list);
        gallery.appendChild(track);
    } else {
        galleryItems.forEach((image) => {
            image.classList.add(SLIDE_CLASS);
        });
    }

    const splide = new Splide(gallery, {
        type: 'loop',
        arrows: false,
        pagination: false,
        autoWidth: true,
        gap: GAP_SIZE,
        drag: true,
        clones: galleryItems.length * CLONE_MULTIPLIER,
        autoScroll: {
            pauseOnHover: false,
            pauseOnFocus: false,
            rewind: false,
            speed: AUTO_SCROLL_SPEED,
        },
    });

    splide.mount({ AutoScroll, Intersection });

    return splide;
};
