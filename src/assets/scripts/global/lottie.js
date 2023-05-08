import lottie from 'lottie-web';
export default function Lottie() {
    document.querySelectorAll('.lottie-animation').forEach(function(lottieSingle) {
        let animation = lottie.loadAnimation({
            container: lottieSingle,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: lottieSingle.dataset.file,
        });

        let observer = new IntersectionObserver(observerFunc);
        observer.observe(lottieSingle);

        function observerFunc(entries) {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    animation.play();
                } else {
                    animation.stop();
                }
            })
        }
    })
}
