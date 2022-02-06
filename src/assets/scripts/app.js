import $ from 'jquery';
import 'what-input';
window.jQuery = $;

import './lib/foundation-explicit-pieces';
import {editableSvg, isInViewport} from './lib/utilities';
import 'slick-carousel/slick/slick';
import select2 from 'select2';

// modules
import './layout-builder/modules/accordion';
import './layout-builder/modules/tabs';

$(document).foundation();

$(function() {

    /* slick slider */
    $('[data-slick]').slick();

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

    $('select').each(function(){
        $(this).select2({
            minimumResultsForSearch: -1,
        });
    });
});
