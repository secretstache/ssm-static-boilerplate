const TEMPLATE_CLASS = '.template-parallax';
const BACKGROUND_CLASS = '.template-parallax__background';

export default function Parallax() {

    document.querySelectorAll(TEMPLATE_CLASS).forEach(template => {
        const parallaxBackground = template.querySelector(BACKGROUND_CLASS);

        window.addEventListener('scroll', function() {
            let offset = window.scrollY;
            parallaxBackground.style.transform = `translateY(${offset * 0.5}px)`;
        });
    })
}