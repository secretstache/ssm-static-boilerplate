export default function Modals() {
    document.querySelectorAll(".modal").forEach((el) => {
        const modal = new Modal(el);
        modal.init();
    });
}
class Modal {
    constructor(el) {
        this.modal = el;
        this.openModalBtns = document.querySelectorAll(
            '.js-modal[href="#' + this.modal.id + '"]'
        );
        this.closeModalBtn = this.modal.querySelector(".js-close-modal");
        this.overlay = this.modal.querySelector(".modal-overlay");
    }

    move() {
        $(this.modal).appendTo(document.body);
        this.modal.classList.add("initiated");
    }

    close() {
        document.querySelector("body").classList.remove("has-opened-modal");
        document
            .querySelector("body")
            .classList.remove("translate-modal-content");
        $(this.modal).fadeOut(200);
        this.modal.classList.remove("is-open");
        this.modal.classList.add("closed");
    }

    open() {
        this.close();
        document.querySelector("body").classList.add("has-opened-modal");
        $(this.modal).fadeIn(200);
        this.modal.classList.remove("closed");
        this.modal.classList.add("is-open");

        setTimeout(function () {
            document
                .querySelector("body")
                .classList.add("translate-modal-content");
        }, 300);
    }

    init() {
        const app = this;

        if (app.modal.classList.contains("initiated")) return;

        app.move();

        app.openModalBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                app.open();
            });
        });

        app.closeModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            app.close();
        });

        app.overlay.addEventListener("click", () => {
            app.close();
        });
    }
}
