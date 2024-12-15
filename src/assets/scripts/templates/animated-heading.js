const WORDS_CONTAINER_SELECTOR = '.template-animated-heading__words-animation-wrapper';
const WORD_SELECTOR = '.template-animated-heading__words-animation-wrapper span';
const ACTIVE_CLASS = 'is-active';
const READY_CLASS = 'is-ready';

const animateWords = (words) => {
    let currentWordIndex = 0;

    const startAnimation = () => {
        const currentWord = words[currentWordIndex];
        const nextWordIndex = (currentWordIndex + 1) % words.length;
        const newWord = words[nextWordIndex];

        currentWord.classList.remove(ACTIVE_CLASS);
        newWord.classList.add(ACTIVE_CLASS);

        currentWordIndex = nextWordIndex;

        setTimeout(startAnimation, 4000);
    };

    startAnimation();
};

export default function HeadingWordsAnimation() {
    document.querySelectorAll(WORDS_CONTAINER_SELECTOR).forEach((wordsContainer) => {
        const arrWords = wordsContainer
            .querySelector(WORD_SELECTOR)
            .textContent.trim()
            .split(' ');

        const outputWords = arrWords.map((word) =>
            `<span class="template-animated-heading__word">${word.replace(/[^A-Za-z0-9]/g, '_')}</span>`
        );

        wordsContainer.innerHTML = outputWords.join(' ');

        const words = wordsContainer.querySelectorAll(WORD_SELECTOR);

        if (words.length === 0) return;

        words[0].classList.add(ACTIVE_CLASS);

        wordsContainer.classList.add(READY_CLASS);

        animateWords(words);
    });
}
