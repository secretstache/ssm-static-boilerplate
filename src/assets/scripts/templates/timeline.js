import { inViewport } from '../utils/utilities';

const BLOCK_SELECTOR = '.template-timeline';
const ITEM_CONTAINER = '.template-timeline__list';
const ITEM_SELECTOR = '.template-timeline__item';
const ACTIVE_ITEM_SELECTOR = '.template-timeline__item.is-visible-cat';
const FILTER_BAR_SELECTOR = '.template-timeline__filters';
const LOAD_MORE_SELECTOR = '.template-timeline__loadmore button';
const NOT_FOUND_SELECTOR = '.template-timeline__not-found';

const VISIBLE_CLASS = 'is-visible';
const VISIBLE_CATEGORY_CLASS = 'is-visible-cat';
const HIDDEN_CLASS = 'hide';
const HIDDEN_CAT_CLASS = 'hide-cat';
const ACTIVE_CLASS = 'is-active';

export default function Timeline() {
    document.querySelectorAll(BLOCK_SELECTOR).forEach((template) => {
        new Filter(template);

        const timelineItems = template.querySelectorAll(ITEM_SELECTOR);
        const loadMoreBtn = template.querySelector(LOAD_MORE_SELECTOR);

        let loadItems = 4;

        timelineItems.forEach(function (timelineItem) {
            inViewport(timelineItem, addVisibleClasss, { threshold: 0, rootMargin: '-50% 0% -50% 0%' });
        });

        loadMoreBtn.addEventListener('click', function () {
            const hiddenTimelineItems = template.querySelectorAll(`.${HIDDEN_CLASS}`);

            hiddenTimelineItems.forEach(function (hiddenTimelineItem, index) {
                if (index < loadItems) {
                    hiddenTimelineItem.classList.remove(HIDDEN_CLASS);
                }

                if (template.querySelectorAll(`.${HIDDEN_CLASS}`).length === 0) {
                    loadMoreBtn.parentElement.style.display = 'none';
                }
            });
        });
    });

    function addVisibleClasss(entries) {
        entries.forEach((entry) => {
            const group = entry.target;

            if (entry.isIntersecting) {
                group.classList.add(VISIBLE_CLASS);
            } else {
                group.classList.remove(VISIBLE_CLASS);
            }
        });
    }
}

class Filter {
    constructor(template) {
        this.template = template;
        this.filterBar = template.querySelector(FILTER_BAR_SELECTOR);
        this.filterBarItems = this.filterBar.querySelectorAll('button');
        this.timelines = template.querySelectorAll(ITEM_SELECTOR);
        this.timelinesContainer = template.querySelector(ITEM_CONTAINER);
        this.notFound = template.querySelector(NOT_FOUND_SELECTOR);
        this.loadMoreBtn = template.querySelector(LOAD_MORE_SELECTOR);

        this.maxItems = 4;
        this.loadItems = 4;

        this.init();
    }

    setActiveButton(btn) {
        this.filterBarItems.forEach((item) => {
            item.classList.remove(ACTIVE_CLASS);
        });

        btn.classList.add(ACTIVE_CLASS);
    }

    initLoadMoreList(items, hiddenClass = 'hide') {
        this.timelinesContainer.style.display = 'flex';
        this.notFound.style.display = 'none';

        const maxItems = this.maxItems;
        const loadMoreBtn = this.loadMoreBtn;

        items.forEach(function (item, index) {
            if (index > maxItems - 1) {
                item.classList.add(hiddenClass);
                loadMoreBtn.parentElement.style.display = 'flex';
            }
        });
    }

    filterDates(filter) {
        if (!filter) return;

        if (filter === '.') {
            this.timelines.forEach((timeline) => {
                timeline.classList.remove(HIDDEN_CAT_CLASS);
            });

            this.initLoadMoreList(this.timelines);

            return;
        } else {
            this.loadMoreBtn.parentElement.style.display = 'none';
        }

        this.timelines.forEach((date) => {
            let categories = date.dataset.categories;

            if (!categories) {
                date.classList.add(HIDDEN_CAT_CLASS);
                return;
            }

            categories = categories.split(';');

            if (categories.includes(filter)) {
                date.classList.remove(HIDDEN_CAT_CLASS, HIDDEN_CLASS);
                date.classList.add(VISIBLE_CATEGORY_CLASS);
            } else {
                date.classList.remove(VISIBLE_CATEGORY_CLASS);
                date.classList.add(HIDDEN_CAT_CLASS);
            }
        });

        const catTimelineItems = this.template.querySelectorAll(ACTIVE_ITEM_SELECTOR);
        this.initLoadMoreList(catTimelineItems);

        if (this.template.querySelectorAll(`${ITEM_SELECTOR}:not(.${HIDDEN_CAT_CLASS})`).length === 0) {
            this.notFound.style.display = 'block';
            this.timelinesContainer.style.display = 'none';
        } else {
            this.notFound.style.display = 'none';
            this.timelinesContainer.style.display = 'flex';
        }
    }

    init() {
        this.initLoadMoreList(this.timelines);

        this.filterBarItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveButton(item);
                this.filterDates(item.dataset.filter);
            });
        });
    }
}
