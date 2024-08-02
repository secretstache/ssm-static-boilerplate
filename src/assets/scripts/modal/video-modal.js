const MODULE_SELECTOR = '.module.video-modal';
const OPEN_MODAL_BUTTON_SELECTOR = '.video-modal__open-modal';
const MODAL_WINDOW_SELECTOR = '.video-modal__modal-window';
const CLOSE_BUTTON_SELECTOR = '.video-modal__close-btn';
const IFRAME_SELECTOR = '.video-modal__iframe';
const VIDEO_PLAYER_SELECTOR = '.video-modal__player';
const VIDEO_SOURCE_SELECTOR = '.video-modal__source';

export default function VideoModal() {
    document.querySelectorAll(MODULE_SELECTOR).forEach((module) => {
        const button = module.querySelector(OPEN_MODAL_BUTTON_SELECTOR);
        const modal = module.querySelector(MODAL_WINDOW_SELECTOR);
        const closeButton = modal.querySelector(CLOSE_BUTTON_SELECTOR);
        const iframe = modal.querySelector(IFRAME_SELECTOR);
        const videoPlayer = modal.querySelector(VIDEO_PLAYER_SELECTOR);
        const videoSource = modal.querySelector(VIDEO_SOURCE_SELECTOR);

        if (!button || !modal || !closeButton || (!iframe && !videoPlayer)) {
            console.error('One or more required elements are missing in the HTML.');
            return;
        }

        button.addEventListener('click', (event) => {
            event.preventDefault();
            const videoUrl = event.currentTarget.getAttribute('data-video-url');

            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                if (iframe) {
                    iframe.src = `${videoUrl}?autoplay=1`;
                    iframe.style.display = 'block';
                    if (videoPlayer) {
                        videoPlayer.style.display = 'none';
                    }
                }
            } else {
                if (videoPlayer && videoSource) {
                    videoSource.src = videoUrl;
                    videoPlayer.style.display = 'block';
                    if (iframe) {
                        iframe.style.display = 'none';
                    }
                }
            }

            modal.style.display = 'block';
        });

        closeButton.addEventListener('click', () => {
            closeModal();
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.display = 'none';
            if (iframe) {
                iframe.src = '';
            }
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        }
    });
}
