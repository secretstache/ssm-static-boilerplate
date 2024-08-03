module.exports = {
    title: 'Scroll Rotation',
    context: {
        rotateX: true,
        rotateY: true,
    },
    variants: [
        {
            title: 'Scroll Rotation X Direction',
            context: {
                rotateX: false,
                rotateY: true,
            },
        },
        {
            title: 'Scroll Rotation Y Direction',
            context: {
                rotateX: true,
                rotateY: false,
            },
        },
    ],
};
