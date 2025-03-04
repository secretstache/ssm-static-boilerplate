const TEMPLATE_SELECTOR = '.wp-block-ssm-ticker .wp-block-ssm-ticker__number';
const TICKER_ITEM_SELECTOR = '.wp-block-ssm-ticker__item';

const ANIMATED_NUMBER_CLASS = 'js-animated-number';
const INITIAL_CLASS = 'initiated';

const INITIAL_VALUE = '0';

const wrapNumber = (counter) => {
    let html = counter.innerHTML.replace(',', '.');

    let regex = /(\d+[,.]{0,1}\d{0,300})/g;

    let newHtml = html.replace(regex, `<span class="${ANIMATED_NUMBER_CLASS}">$&</span>`);

    counter.innerHTML = newHtml;

    return counter.querySelector(`.${ANIMATED_NUMBER_CLASS}`);
};

const animateNumber = (numberEl, duration) => {
    let startTimestamp = null;
    let start = 0;
    let end = numberEl.dataset.number;
    let decimal = end.toString().split('.');
    let num = 0;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        if (decimal.length > 1) {
            num = (progress * (end - start) + start).toFixed(decimal[1].length);
        } else {
            num = Math.floor(progress * (end - start) + start);
        }

        numberEl.innerHTML = num.toLocaleString().replace('.', ',');

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};

const initCounterItem = (counter, duration = 1000) => {
    const parent = counter.closest(TICKER_ITEM_SELECTOR);

    parent.style.width = `${parent.clientWidth + 5}px`;

    counter.classList.add(INITIAL_CLASS);

    let numberEl = wrapNumber(counter);

    if (!numberEl) {
        return;
    }

    let number = numberEl.innerHTML;
    let firstShow = true;

    if (!isNaN(number) && isFinite(number)) {
        if (number.includes(',')) {
            numberEl.dataset.number = parseInt(number.replace(/,/g, ''));
        } else {
            numberEl.dataset.number = number;
        }

        numberEl.innerHTML = INITIAL_VALUE;

        const intersectionCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && firstShow) {
                    setTimeout(() => {
                        animateNumber(numberEl, duration);
                    }, 800);
                    firstShow = false;
                }
            });
        };

        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        let observer = new IntersectionObserver(intersectionCallback, options);
        observer.observe(counter);
    } else {
        return;
    }
};

export const Ticker = () => {
    document.querySelectorAll(TEMPLATE_SELECTOR).forEach((el) => {
        initCounterItem(el);
    });
};
