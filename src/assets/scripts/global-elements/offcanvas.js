export default function Offcanvas(){

    const mainContainer = document.querySelector('body');

    const toggleButtons = document.querySelectorAll('.offcanvas-toggler');

    toggleButtons.forEach(toggleButton => {
        toggleButton.addEventListener('click', () => {
            mainContainer.classList.toggle('offcanvas-active')
        })
    })
}