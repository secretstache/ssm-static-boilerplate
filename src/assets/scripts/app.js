import $ from 'jquery';
import 'what-input';
window.jQuery = $;

import './lib/foundation-explicit-pieces';
import {editableSvg, isInViewport} from './lib/utilities';
import {carousel} from './layout-builder/modules/carousel';
import {tabs} from './layout-builder/modules/tabs';
import {accordion} from './layout-builder/modules/accordion';
import SlimSelect from 'slim-select'
import setHeroModal from './layout-builder/modules/hero-modal';

$(document).foundation();

$(function() {

    /* Replace all SVG images with inline SVG */
    editableSvg('img.editable-svg');

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
    carousel();
    setHeroModal('.hero-open-modal');
});
