const TEMPLATE_SELECTOR = '.template-mouse-rotation';
const ELEMENT_SELECTOR = '.template-mouse-rotation__cube';

export default function MouseRotation() {

    document.querySelectorAll(TEMPLATE_SELECTOR).forEach(template => {

        let rotationX = 0;
        let rotationY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;

        const cube = template.querySelector(ELEMENT_SELECTOR);
        const rotateX = cube.getAttribute('data-rotate-x') === 'true';
        const rotateY = cube.getAttribute('data-rotate-y') === 'true';

        document.addEventListener('mousemove', (event) => {

            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            if (rotateX) {
                rotationX += deltaY * 0.2;
            }
            if (rotateY) {
                rotationY += deltaX * 0.2;
            }

            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });

    })
}