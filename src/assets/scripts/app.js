import $ from 'jquery';
import 'what-input';
window.jQuery = $;

import './libs/foundation-explicit-pieces';

import { fixVw } from './global/utilities';

import Header from "./global/header";
import Offcanvas from "./global/off-canvas";
import Svg from "./global/svg";
//import Cursor from "./global/cursor";
//import Modals from "./global/modal";
//import Lottie from './global/lottie';

import Video from "./layout-builder/modules/video";

document.addEventListener("DOMContentLoaded", function () {
    $(document).foundation();

    fixVw();

    /* global */
    Header();
    Offcanvas();
    Svg();
    //Cursor();
    //Modals();
    //Lottie();

    /* modules */
    Video();
});
