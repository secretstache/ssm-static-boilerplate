
export default function VideoModal(){
    document.querySelectorAll('.module.video-modal').forEach(module => {
        const button = module.querySelector('.video-modal__open-modal');
        const modal = module.querySelector('.video-modal__modal-window');
        const closeButton = module.querySelector('.video-modal__close-btn');
        const iframe = module.querySelector('.video-modal__iframe');
    
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const youtubeUrl = event.currentTarget.getAttribute('data-youtube-url');
            iframe.src = `${youtubeUrl}?autoplay=1`;
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
            iframe.src = '';
        }
    });
    
}