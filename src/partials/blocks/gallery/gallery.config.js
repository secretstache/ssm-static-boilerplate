module.exports = {
    title: 'Gallery',
    context: {
        images: [
            '/assets/images/cms/placeholder.svg',
            '/assets/images/cms/placeholder.svg',
            '/assets/images/cms/placeholder.svg',
        ],
    },
    variants: [
        {
            title: '6 columns',
            context: {
                columns: 6,
                images: [
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                ],
            },
        },
        {
            title: 'Lightbox',
            context: {
                class: 'is-style-lightbox',
                layoutLightbox: true,
                images: [
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                ],
            },
        },
        {
            title: 'Slider',
            context: {
                class: 'is-style-carousel',
                images: [
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                    '/assets/images/cms/placeholder.svg',
                ],
            },
        },
    ],
};
