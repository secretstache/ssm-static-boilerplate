const TEMPLATE_SELECTOR = '.template-ticker-text';
const TEXT_WRAPPER_SELECTOR = `${TEMPLATE_SELECTOR}__text`;

export default function TickerText() {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((template) => {
        const textWrapper = template.querySelector(TEXT_WRAPPER_SELECTOR);
        const originalText = textWrapper.innerHTML;
        const direction = template.getAttribute('direction') || 'rtl';

        const span = document.createElement('span');
        span.innerHTML = originalText;
        textWrapper.appendChild(span);

        const textWidth = textWrapper.querySelector('span').offsetWidth;
        const containerWidth = textWrapper.parentElement.offsetWidth;

        while (textWrapper.offsetWidth < containerWidth * 2) {
            const cloneText = document.createElement('span');
            cloneText.innerHTML = originalText;
            textWrapper.appendChild(cloneText);
        }

        let currentPosition = direction === 'rtl' ? 0 : -textWrapper.offsetWidth;
        const animationSettings = {
            speed: 2,
        };

        function animateInnerText() {
            if (direction === 'rtl') {
                currentPosition -= animationSettings.speed;
                if (currentPosition <= -textWidth) {
                    currentPosition = 0;
                }
            } else if (direction === 'ltr') {
                currentPosition += animationSettings.speed;
                if (currentPosition >= 0) {
                    currentPosition = -textWidth;
                }
            }

            textWrapper.style.transform = `translateX(${currentPosition}px)`;
            requestAnimationFrame(animateInnerText);
        }

        animateInnerText();
    });
}
