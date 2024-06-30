const BLOCK_SELECTOR = '.template-secondary-nav';
const SECONDARY_NAV_BUTTON = '.template-secondary-nav__expanded-button';

const EXPANDED_CLASS = 'expanded-menu';
const CLOSE_CLASS = 'is-close-style';

export default function SecondaryNav() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((block) => {
        const expandButton = block.querySelector(SECONDARY_NAV_BUTTON);

        expandButton.addEventListener('click', () => {
            if (block.classList.contains(EXPANDED_CLASS)) {
                block.classList.remove(EXPANDED_CLASS);
                setTimeout(function () {
                    expandButton.classList.remove(CLOSE_CLASS);
                }, 300);
            } else {
                block.classList.add(EXPANDED_CLASS);
                setTimeout(function () {
                    expandButton.classList.add(CLOSE_CLASS);
                }, 300);
            }
        });
    });
}
