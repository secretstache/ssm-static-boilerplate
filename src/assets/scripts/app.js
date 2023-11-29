import LazyLoad from './utils/LazyLoad';
import EditableSvg from './utils/EditableSvg';
import VideoPlayInViewportOnly from './utils/VideoPlayInViewportOnly';
import Offcanvas from './global/Offcanvas';

// lazy loads elements with default selector '.lazy-load'
// usage https://apoorv.pro/lozad.js/
const lazyLoadObserver = LazyLoad();
lazyLoadObserver.observe();

// editable svgs
Array.from(document.querySelectorAll('.editable-svg')).map((img) => EditableSvg(img));

// stop autoplay video when out of viewport
Array.from(document.querySelectorAll('video[autoplay]')).map((video) => VideoPlayInViewportOnly(video));

// global components
Array.from(document.querySelectorAll('.offcanvas')).map((offcanvasEl) => new Offcanvas(offcanvasEl));
