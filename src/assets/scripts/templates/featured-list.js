const BLOCK_SELECTOR = '.template-featured-list';
const LIST_INFO_SELECTOR = '.template-featured-list__info';
const LIST_CONTENT_SELECTOR = '.template-featured-list__content';
const LIST_ITEM_SELECTOR = '.template-featured-list__item';

const LIST_LEFT_COLUMN = '.template-featured-list__column-left';
const LIST_RIGHT_COLUMN = '.template-featured-list__column-right';

export default function FeaturedListAnimation() {
    const rightColumn = document.querySelectorAll(`${BLOCK_SELECTOR} ${LIST_RIGHT_COLUMN}`);
    const listItems = document.querySelectorAll(`${BLOCK_SELECTOR} ${LIST_LEFT_COLUMN} ${LIST_ITEM_SELECTOR}`);

    function splitItems(items) {
        const smallerPart = Math.ceil(items.length / 2);
        const itemsLenght = items.length;
        const covertToArr = [...items];
        const spliceItems = covertToArr.splice(smallerPart, itemsLenght);

        rightColumn.forEach((block) => {
            spliceItems.forEach((element) => {
                block.appendChild(element);
            });
        });
    }

    splitItems(listItems);

    document.querySelectorAll(`${LIST_CONTENT_SELECTOR} ${LIST_INFO_SELECTOR}`).forEach((el) => {
        const parentEl = el.closest(LIST_ITEM_SELECTOR);

        parentEl.addEventListener('mouseover', () => {
            el.style.maxHeight = el.scrollHeight + 'px';
        });

        parentEl.addEventListener('mouseout', () => {
            el.style.maxHeight = 0;
        });
    });
}
