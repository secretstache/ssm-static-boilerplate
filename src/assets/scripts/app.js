import { setViewportUnits, PlayVideoInViewportOnly, EditableSvg, scrollToHash } from './utils/utilities';
import LazyLoad from './utils/lazy-load';
import Offcanvas from './global/offcanvas';
import Header from './global/header';
import Modal from './global/modal';
import DropdownMenu from './global/dropdownMenu';
import ScrollspyMenu from './global/scrollspyMenu';
import AsideNavigation from './global/asideNavigation';
import { MegaMenuDesktop, MegaMenuMobile } from './global/megaMenu';
import VideoModal from './modal/video-modal';
import Accordion from './templates/accordion';

import { TeamMembers } from './blocks/team-members';
import { Gallery } from './blocks/gallery';
import { Ticker } from './blocks/ticker';

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

    // modals
    Array.from(document.querySelectorAll('.js-create-modal')).forEach((el) => {
        new Modal(null, {
            destroyOnClose: true,
            data: el,
        });
    });

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

    // blocks
    TeamMembers();
    Gallery();
    Ticker();
});
