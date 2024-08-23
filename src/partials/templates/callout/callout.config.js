module.exports = {
    title: 'Callout',
    defaultTitle: 'Callout',
    context: {
        innerContent: 'default',
        class: 'has-border',
        borderColor: 'var(--red)',
        bg: {
            color: 'light-grey',
        },
    },
    variants: [
        {
            title: 'Callout up to right',
            context: {
                innerContent: 'default',
                class: 'up-to-right',
                borderColor: 'var(--red)',
                bg: {
                    color: 'light-grey',
                },
            },
        },
    ],
};
