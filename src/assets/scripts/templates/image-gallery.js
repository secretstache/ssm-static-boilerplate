import { Splide } from '@splidejs/splide';

const SECTION_SELECTOR = '.template-image-gallery';
const SPLIDE_SELECTOR = '.splide';

export default function ImageGallery() {
	document.querySelectorAll(SECTION_SELECTOR).forEach((template) => {
		const carousel = template.querySelector(SPLIDE_SELECTOR);

		if (!carousel) return;

		const options = {
			arrows: true,
			pagination: false,
			type: 'loop',
			focus: 'center',
		};

		const splide = new Splide(carousel, options);

		splide.mount();
	});
}
