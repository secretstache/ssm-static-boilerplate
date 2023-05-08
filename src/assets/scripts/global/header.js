export default function Header() {
    const header = document.querySelector('.site-header');
    const sticky = 0;
    const stickyHeader = () => {
        if (window.scrollY > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    stickyHeader();
    window.onscroll = () => stickyHeader();
}
