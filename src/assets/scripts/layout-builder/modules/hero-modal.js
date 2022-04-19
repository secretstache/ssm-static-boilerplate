// import test from '../../lib/tingle.js';
import tingle from 'tingle.js/src/tingle';

export default function setHeroModal(openButtonSelector){

    // instanciate new modals
    const modal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['hero-modal'],

        beforeClose: function() {
            return true; // close the modal
            return false; // nothing happens
        }
    });

    const openButtons = document.querySelectorAll(openButtonSelector);

    for( let i = 0; i < openButtons.length; i++){

        let currentButton = openButtons[i];
        let videoSource = currentButton.getAttribute('data-video-src');

        currentButton.addEventListener('click', function(){
            modal.setContent(`
                    <iframe 
                        width="560"
                        height="315"
                        src=${videoSource}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer;
                        autoplay; clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture"
                        allowfullscreen>
                    </iframe>
            `);

            modal.open();
        })
    }
}