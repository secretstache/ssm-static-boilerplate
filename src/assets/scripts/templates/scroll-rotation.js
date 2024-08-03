const TEMPLATE_SELECTOR = '.template-scroll-rotation';
const ELEMENT_SELECTOR = '.template-scroll-rotation__cube';

export default function ScrollRotation() {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach(template => {

        let lastScrollTop = window.scrollY;
        let rotationX = 0;
        let rotationY = 0;
        const cube = template.querySelector(ELEMENT_SELECTOR);
    
        // set rotate direction
        const rotateX = cube.getAttribute('data-rotate-x') === 'true';
        const rotateY = cube.getAttribute('data-rotate-y') === 'true';


        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY;
            
            if (scrollTop > lastScrollTop) {
                // scroll down
                if (rotateX) {
                    rotationX += 3;
                }
                if (rotateY) {
                    rotationY += 3;
                }
            } else {
                // scroll up
                if (rotateX) {
                    rotationX -= 3;
                }
                if (rotateY) {
                    rotationY -= 3;
                }
            }
    
            lastScrollTop = scrollTop;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });
    })
}