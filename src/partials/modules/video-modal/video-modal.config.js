const options = {};

module.exports = {
    title: 'Video Modal',
    options,
    context: {
        src: '/assets/video/placeholder.mp4',
    },
    variants: [
        {
            title: 'Iframe',
            context: {
                type: 'iframe',
                src: 'https://www.youtube.com/embed/bTqVqk7FSmY',
            },
        },
    ],
};
