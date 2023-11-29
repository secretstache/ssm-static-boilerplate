const support = (type) => window && window[type];

const onIntersection = () => (entries) => {
    entries.forEach((entry) => {
        const video = entry.target;

        if (video.classList.contains('lazy-load')) {
            if (!video.dataset.loaded) return;
        }

        if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            video.play();
        } else {
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    video.pause();
                });
            }
        }
    });
};

const VideoPlayInViewportOnly = (video) => {
    if (support('IntersectionObserver')) {
        const observer = new IntersectionObserver(onIntersection(), {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        });

        observer.observe(video);
    }
};

export default VideoPlayInViewportOnly;
