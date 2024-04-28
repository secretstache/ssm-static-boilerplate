module.exports = {
    title: 'Split content',
    context: {
        innerContent: 'inner',
    },
    variants: [
        {
            title: 'Reversed',
            context: {
                class: 'is-reversed',
                innerContent: 'inner',
            },
        },
    ],
};
