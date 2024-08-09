
export default function OpenCards() {

    document.querySelectorAll('.template-open-cards').forEach(template => {

        template.querySelector('.main-card').addEventListener('click', function() {
            document.querySelectorAll('.bottom-card, .left-card, .diagonal-card').forEach(card => {
                card.classList.add('showing');
            });
        });

        template.querySelectorAll('.return-btn').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.template-open-cards__card');
                card.classList.remove('showing');
            });
        });
    });
}