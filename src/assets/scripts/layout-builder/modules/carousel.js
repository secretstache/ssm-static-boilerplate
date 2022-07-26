import Swiper, { Autoplay, Pagination, Navigation } from "swiper";

export function carousel() {
    const sliders = document.querySelectorAll(".carousel");

    sliders.forEach((slider) => {
        const nextButton = slider.querySelector(".swiper-button-next");
        const prevButton = slider.querySelector(".swiper-button-prev");
        const pagination = slider.querySelector(".swiper-pagination");
        const slides = slider.querySelectorAll(".swiper-slide");

        if (slides.length > 1) {
            const swiperCarousel = new Swiper(slider, {
                modules: [Autoplay, Pagination, Navigation],
                speed: 800,
                autoplay: {
                    delay: 8000,
                },
                loop: true,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
            });
        } else {
            nextButton.classList.add("hide");
            prevButton.classList.add("hide");
        }
    });
}
