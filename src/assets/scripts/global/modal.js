import BaseComponent from '../utils/base-component';
import EventHandler from '../utils/dom/event-handler';
import SelectorEngine from '../utils/dom/selector-engine';
import Backdrop from '../utils/backdrop';
import enableDismissTrigger from '../utils/enable-dismiss-trigger';
import FocusTrap from '../utils/focus-trap';
import { isVisible, reflow } from '../utils/utilities';
import ScrollbarHelper from '../utils/scrollbar-helper';

/**
 * Constants
 */

const NAME = 'modal';
const DATA_KEY = 'ssm.modal';
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';
const ESCAPE_KEY = 'Escape';

const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const EVENT_RESIZE = `resize${EVENT_KEY}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_STATIC = 'modal-static';

const OPEN_SELECTOR = '.modal.show';
const SELECTOR_DIALOG = '.modal__wrapper';
const SELECTOR_MODAL_BODY = '.modal__body';
const SELECTOR_DATA_TOGGLE = '.js-modal-toggle';

const Config = {
    backdrop: true,
    focus: true,
    keyboard: true,
    destroyOnClose: false,
    data: null,
};

/**
 * Class definition
 */

class Modal extends BaseComponent {
    constructor(element, config) {
        super(element, config);

        this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();
        this._isShown = false;
        this._isTransitioning = false;
        this._scrollBar = new ScrollbarHelper();

        this._addEventListeners();
    }

    // Getters
    static get Default() {
        return Config;
    }

    static get NAME() {
        return NAME;
    }

    create(data) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');

        const info = JSON.parse(data.getAttribute('data-info'));

        if (!info) return;

        const name = info.title;
        const photo = info.photo;
        const description = info.description;
        const phone = info.phone;
        const email = info.email;
        const position = info.position;

        let imageHtml = '';

        if (photo) {
            imageHtml = `
            <div class="modal__content-image">
                <img src="${photo}" alt="${name}">
            </div>`;
        }

        modal.innerHTML = `
        <div class="modal__wrapper">
            <div class="modal__header">
                <button type="button" class="modal__close-btn" data-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal__content">
                <div class="modal__body">
                    <div class="modal__content-wrapper">
                         ${imageHtml}
                        <div class="modal__content-text">
                            ${name ? `<h3 class="modal__content-title">${name}</h3>` : ''}
                            ${position ? `<div class="modal__content-position">${position}</div>` : ''}
                            ${description ? `<div class="modal__content-description">${description}</div>` : ''}
                            <div class="modal__content-contacts">
                                ${phone ? `<div class="modal__content-contact"><i class="icon-phone"></i>${phone}</div>` : ''}
                                ${email ? `<div class="modal__content-contact"><i class="icon-email"></i><a href="mailto:${email}">${email}</a></div>` : ''}
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>`;

        return modal;
    }

    // Public
    toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
        if (this._isShown || this._isTransitioning) {
            return;
        }

        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
            relatedTarget,
        });

        if (showEvent.defaultPrevented) {
            return;
        }

        this._isShown = true;
        this._isTransitioning = true;

        this._scrollBar.hide();

        document.body.classList.add(CLASS_NAME_OPEN);

        this._adjustDialog();

        this._backdrop.show(() => this._showElement(relatedTarget));
    }

    hide() {
        if (!this._isShown || this._isTransitioning) {
            return;
        }

        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

        if (hideEvent.defaultPrevented) {
            return;
        }

        this._isShown = false;
        this._isTransitioning = true;
        this._focustrap.deactivate();

        this._element.classList.remove(CLASS_NAME_SHOW);

        this._queueCallback(() => this._hideModal(), this._element, true);
    }

    dispose() {
        this._element.remove();

        EventHandler.off(window, EVENT_KEY);
        EventHandler.off(this._dialog, EVENT_KEY);

        this._backdrop.dispose();
        this._focustrap.deactivate();

        super.dispose();
    }

    handleUpdate() {
        this._adjustDialog();
    }

    // Private
    _initializeBackDrop() {
        return new Backdrop({
            isVisible: Boolean(this._config.backdrop), // 'static' option will be translated to true, and booleans will keep their value,
            isAnimated: true,
        });
    }

    _initializeFocusTrap() {
        return new FocusTrap({
            trapElement: this._element,
        });
    }

    _showElement(relatedTarget) {
        // try to append dynamic modal
        if (!document.body.contains(this._element)) {
            document.body.append(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.setAttribute('aria-modal', true);
        this._element.setAttribute('role', 'dialog');
        this._element.scrollTop = 0;

        const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
        if (modalBody) {
            modalBody.scrollTop = 0;
        }

        reflow(this._element);

        this._element.classList.add(CLASS_NAME_SHOW);

        const transitionComplete = () => {
            if (this._config.focus) {
                this._focustrap.activate();
            }

            this._isTransitioning = false;
            EventHandler.trigger(this._element, EVENT_SHOWN, {
                relatedTarget,
            });
        };

        this._queueCallback(transitionComplete, this._dialog, true);
    }

    _addEventListeners() {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
            if (event.key !== ESCAPE_KEY) {
                return;
            }

            if (this._config.keyboard) {
                this.hide();
                return;
            }

            this._triggerBackdropTransition();
        });

        EventHandler.on(window, EVENT_RESIZE, () => {
            if (this._isShown && !this._isTransitioning) {
                this._adjustDialog();
            }
        });

        EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
            // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
            EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
                if (this._element !== event.target || this._element !== event2.target) {
                    return;
                }

                if (this._config.backdrop === 'static') {
                    this._triggerBackdropTransition();
                    return;
                }

                if (this._config.backdrop) {
                    this.hide();
                }
            });
        });
    }

    _hideModal() {
        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', true);
        this._element.removeAttribute('aria-modal');
        this._element.removeAttribute('role');
        this._isTransitioning = false;

        this._backdrop.hide(() => {
            document.body.classList.remove(CLASS_NAME_OPEN);
            this._resetAdjustments();
            this._scrollBar.reset();
            EventHandler.trigger(this._element, EVENT_HIDDEN);

            if (this._config.destroyOnClose) {
                this.dispose();
            }
        });
    }

    _triggerBackdropTransition() {
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        if (hideEvent.defaultPrevented) {
            return;
        }

        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const initialOverflowY = this._element.style.overflowY;
        // return if the following background transition hasn't yet completed
        if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
            return;
        }

        if (!isModalOverflowing) {
            this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);
        this._queueCallback(() => {
            this._element.classList.remove(CLASS_NAME_STATIC);
            this._queueCallback(() => {
                this._element.style.overflowY = initialOverflowY;
            }, this._dialog);
        }, this._dialog);

        this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */

    _adjustDialog() {
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const scrollbarWidth = this._scrollBar.getWidth();
        const isBodyOverflowing = scrollbarWidth > 0;

        if (isBodyOverflowing && !isModalOverflowing) {
            const property = 'paddingRight';
            this._element.style[property] = `${scrollbarWidth}px`;
        }

        if (!isBodyOverflowing && isModalOverflowing) {
            const property = 'paddingLeft';
            this._element.style[property] = `${scrollbarWidth}px`;
        }
    }

    _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
    }

    _decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
}

/**
 * Data API implementation
 */

EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    const target = SelectorEngine.getElementFromSelector(this);
    const link = this;

    if (
        [
            'A',
            'AREA',
        ].includes(this.tagName)
    ) {
        event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW, (showEvent) => {
        if (showEvent.defaultPrevented) {
            // only register focus restorer if modal will actually get shown
            return;
        }

        EventHandler.one(target, EVENT_HIDDEN, () => {
            if (isVisible(this)) {
                this.focus();
            }
        });
    });

    // avoid conflict when clicking modal toggler while another one is open
    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
    if (alreadyOpen) {
        Modal.getInstance(alreadyOpen).hide();
    }

    const data = target ? Modal.getOrCreateInstance(target) : Modal.getOrCreateInstance(target, { destroyOnClose: true, data: link });

    data.toggle(this);
});

enableDismissTrigger(Modal);

export default Modal;
