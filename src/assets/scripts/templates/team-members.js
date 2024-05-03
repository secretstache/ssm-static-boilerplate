const TEAM_MEMBERS_INFO_BLOCK = '.template-team-members__info';
const TEAM_MEMBERS_HIDDEN_BLOCK = '.template-team-members__hidden-description';
const TEAM_MEMBERS_TOGGLE_BUTTON = '.template-team-members__toggle-read-more';
const TEAM_MEMBERS_HIDDEN_TEXT = '.template-team-members__description-inner';
const OPEN_CLASS = 'more';
const CLOSED_CLASS = 'less';
const OPEN_TITLE = 'Read Less';
const CLOSED_TITLE = 'Read More';

export default function TeamMembers() {
    document.querySelectorAll(TEAM_MEMBERS_INFO_BLOCK).forEach((contentBlock) => {
        const hiddenBlock = contentBlock.querySelector(TEAM_MEMBERS_HIDDEN_BLOCK);
        const toggleButton = contentBlock.querySelector(TEAM_MEMBERS_TOGGLE_BUTTON);
        const hiddenText = contentBlock.querySelector(TEAM_MEMBERS_HIDDEN_TEXT);

        if (!!hiddenBlock) {
            toggleButton.addEventListener('click', function () {
                const hiddenTextHeight = hiddenText.offsetHeight;

                if (this.classList.contains(OPEN_CLASS)) {
                    this.classList.remove(OPEN_CLASS);
                    this.classList.add(CLOSED_CLASS);
                    this.innerText = OPEN_TITLE;
                    hiddenBlock.style.height = `${hiddenTextHeight}px`;
                } else {
                    this.classList.add(OPEN_CLASS);
                    this.classList.remove(CLOSED_CLASS);
                    hiddenBlock.style.height = `0px`;
                    this.innerText = CLOSED_TITLE;
                }
            });
        } else {
            toggleButton.classList.add('hide');
        }

        addEventListener('resize', () => {
            hiddenBlock.style.height = `0px`;
            toggleButton.classList.add(OPEN_CLASS);
            toggleButton.classList.remove(CLOSED_CLASS);
            toggleButton.innerText = CLOSED_TITLE;
        });
    });
}
