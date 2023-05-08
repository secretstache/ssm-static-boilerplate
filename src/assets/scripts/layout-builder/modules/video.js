import Plyr from 'plyr';

export default function Video() {
    document.querySelectorAll('.module.video .video-player').forEach(video => {
        new Plyr(video, {
            loop: {
                active: false,
            },
        });
    })
}
