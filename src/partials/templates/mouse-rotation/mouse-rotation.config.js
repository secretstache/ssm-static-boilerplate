module.exports = {
    title: 'Mouse Rotation',
    context: {
        rotateX: true,
        rotateY: true,
    },
    variants: [
        {
            title: 'Mouse Rotation X Direction',
            context: {
                rotateX: false,
                rotateY: true,
            },
        },
        {
            title: 'Mouse Rotation Y Direction',
            context: {
                rotateX: true,
                rotateY: false,
            },
        },
    ],
};
