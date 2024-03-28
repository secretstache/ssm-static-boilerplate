const options = {};

module.exports = {
    title: 'Free form',
    options,
    context: {
        innerContent: 'with-1-col',
        templateHeader: {
            headers: [
                {
                    tag: 'p',
                    text: 'Template preheadline',
                },
                {
                    tag: 'h1',
                    text: 'Template headline',
                },
                {
                    tag: 'h2',
                    text: 'Template subheadline',
                },
            ],
        },
    },
    variants: [
        {
            title: '2 columns',
            context: {
                innerContent: 'with-2-cols',
            },
        },
        {
            title: 'With image background',
            context: {
                innerContent: 'with-2-cols',
                bg: {
                    image: 'https://via.placeholder.com/1920x1080',
                },
            },
        },
        {
            title: 'With video background',
            context: {
                innerContent: 'with-2-cols',
                class: 'bg-dark',
                bg: {
                    video: '/assets/video/placeholder.mp4',
                    overlay: true,
                },
            },
        },
    ],
};
