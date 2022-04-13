import Swiper, { Autoplay, Pagination, Navigation } from 'swiper';

export function carousel() {
    let swiperCarousel = new Swiper('.carousel', {
    modules: [Autoplay, Pagination, Navigation],
    speed: 1500,
    autoplay: {
        delay: 8000,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    });  
}