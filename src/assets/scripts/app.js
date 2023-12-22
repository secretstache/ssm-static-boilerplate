import { setViewportUnits, PlayVideoInViewportOnly, EditableSvg } from './utils/utilities';
import LazyLoad from './utils/lazy-load';
import Offcanvas from './global/offcanvas';
import Header from './global/header';

document.addEventListener('DOMContentLoaded', function () {
    // lazy loads elements with default selector '.lazy-load'
    const lazyLoadObserver = LazyLoad();
    lazyLoadObserver.observe();

    // fix vw and vh units
    setViewportUnits();

    // editable svgs
    Array.from(document.querySelectorAll('.editable-svg')).map((img) => EditableSvg(img));

    // stop autoplay video when out of viewport
    Array.from(document.querySelectorAll('video[autoplay]')).map((video) => PlayVideoInViewportOnly(video));

    // offcanvas
    const offcanvas = document.querySelector('.offcanvas');
    if (offcanvas) {
        new Offcanvas(offcanvas);
    }

    // site header
    const header = document.querySelector('.site-header');
    if (header) {
        new Header(header);
    }
});
