export default function OffCanvas() {
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('body').classList.toggle('offcanvas-active');
    });
}
