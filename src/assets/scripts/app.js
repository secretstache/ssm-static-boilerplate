import { setViewportUnits, PlayVideoInViewportOnly, EditableSvg, scrollToHash } from './utils/utilities';
import LazyLoad from './utils/lazy-load';
import Offcanvas from './global/offcanvas';
import Header from './global/header';
// import Modal from './global/modal';
import DropdownMenu from './global/dropdownMenu';
import ScrollspyMenu from './global/scrollspyMenu';
import AsideNavigation from './global/asideNavigation';
import { MegaMenuDesktop, MegaMenuMobile } from './global/megaMenu';
import VideoModal from './modal/video-modal';
import Accordion from './templates/accordion';
import HorizontalTabs from './templates/horizontal-tabs';
import LogoWall from './templates/logo-wall';
import FacetDropdown from './templates/facet-elements';
import Testimonials from './templates/testimonials';
import TeamMembers from './templates/team-members';
import CardFlip from './templates/card-flip';
import RelatedContent from './templates/related-content';
import Timeline from './templates/timeline';
import InteractiveMap from './templates/interactive-map';
import SectionTabsInit from './templates/section-tabs';
import HeadingWordsAnimation from './templates/animated-heading';
import Stats from './templates/stats';
import ProductTour from './templates/product-tour';
import SecondaryNav from './templates/secondary-nav';
import Ribbon from './templates/ribbon';
import ImageGallery from './templates/image-gallery';
import PodcastPlayer from './templates/podcast-player';
import FeaturedListAnimation from './templates/featured-list';

import './templates/vertical-tabs';

document.addEventListener('DOMContentLoaded', function () {
    // lazy loads elements with default selector '.lazy-load'
    const lazyLoadObserver = LazyLoad();
    lazyLoadObserver.observe();

    // fix vw and vh units
    setViewportUnits();

    // hash links
    scrollToHash();

    // editable svg
    Array.from(document.querySelectorAll('.editable-svg')).map((img) => EditableSvg(img));

    // stop autoplay video when out of viewport
    Array.from(document.querySelectorAll('video[autoplay]')).map((video) => PlayVideoInViewportOnly(video));

    // off canvas
    const offcanvas = document.querySelector('.offcanvas');
    if (offcanvas) {
        new Offcanvas(offcanvas);
    }

    // site header
    const header = document.querySelector('.site-header');
    if (header) {
        new Header(header);
    }

    // Aside Navigation
    AsideNavigation();

    // modals
    // Array.from(document.querySelectorAll('.modal')).map((el) => new Modal(el));

    // menus
    DropdownMenu();
    ScrollspyMenu();
    MegaMenuDesktop();
    MegaMenuMobile();

    // modules
    Accordion();
    VideoModal();

    // templates
    HorizontalTabs();
    FacetDropdown();
    LogoWall();
    Testimonials();
    TeamMembers();
    CardFlip();
    RelatedContent();
    Timeline();
    InteractiveMap();
    SectionTabsInit();
    HeadingWordsAnimation();
    Stats();
    Ribbon();
    ProductTour();
    SecondaryNav();
    ImageGallery();
    PodcastPlayer();
    FeaturedListAnimation();
});
