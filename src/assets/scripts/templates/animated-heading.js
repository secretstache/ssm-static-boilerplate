const WORDS_CONTAINER_SELECTOR = '.template-animated-heading__words-animation-wrapper';
const WORD_SELECTOR = '.template-animated-heading__words-animation-wrapper span';

const animateWords = (words) => {
    let currentWordIndex = 0;

    const startAnimation = () => {
        let currentWord = words[currentWordIndex];
        let nextWordIndex = currentWordIndex === words.length - 1 ? 0 : currentWordIndex + 1;
        let newWord = words[nextWordIndex];

        currentWord.classList.remove('is-active');
        newWord.classList.add('is-active');

        currentWordIndex = nextWordIndex;
    };

    setInterval(startAnimation, 4000);
};

export default function HeadingWordsAnimation() {
    document.querySelectorAll(WORDS_CONTAINER_SELECTOR).forEach((wordsContainer) => {
        const arrWords = [...wordsContainer.querySelector(WORD_SELECTOR).textContent.trim().split(' ')];

        let outputWords = arrWords.map((word) => {
            let formWord = word;
            word = formWord.replace(/[^A-Za-z0-9]/g, '_');

            return `<span class="template-animated-heading__word">${word}</span>`;
        });

        wordsContainer.innerHTML = outputWords.join(' ');

        const words = wordsContainer.querySelectorAll(WORD_SELECTOR);

        if (!words) return;

        words[0].classList.add('is-active');

        wordsContainer.classList.add('is-ready');

        animateWords(words);
    });
}
