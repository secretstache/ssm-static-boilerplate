import $ from 'jquery';
import 'what-input';
window.jQuery = $;

import './lib/foundation-explicit-pieces';
import {editableSvg, isInViewport, tooltip} from './lib/utilities';
import './layout-builder/modules/tabs';
import Carousel from './layout-builder/modules/carousel';
import AccordionTabs from './layout-builder/modules/accordion-tabs';
import Accordion from './layout-builder/modules/accordion';
import Navigation from './common/navigation';
import SlimSelect from 'slim-select';

$(document).foundation();

$(function() {

    /* Replace all SVG images with inline SVG */
    editableSvg('img.editable-svg');
    tooltip();

    /* Sticky header */
    window.onscroll = function() { stickyHeader() };
    const header = document.querySelector('.site-header');
    var sticky = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
    /* end Sticky header */


    /* Hamburger click handle */
    $('.hamburger').on('click', function() {
        $('body').toggleClass('offcanvas-active');
    });

    /* Offcanvas close button handle */
    $('.off-canvas .close-button').on('click', function() {
        $('body').removeClass('offcanvas-active');
    });

    // Slim-select
    const selects = document.querySelectorAll('.slim-selects')
    selects.forEach((selectElement) => {
        new SlimSelect({
            select: selectElement
        })
    })

    // modules
    Carousel();
    AccordionTabs();
    Accordion();
    Navigation();
});
