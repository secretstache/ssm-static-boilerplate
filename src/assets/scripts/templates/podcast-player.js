import Plyr from 'plyr';

const AUDIO_SELECTOR = '.template-podcast-player__podcast';

export default function PodcastPlayer() {
    document.querySelectorAll(AUDIO_SELECTOR).forEach((el) => {
        const audio = el.querySelector('audio');

        if (!audio) return;

        const player = new Plyr(audio, {
            controls: [
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
            ],
        });

        window.player = player;
    });
}
