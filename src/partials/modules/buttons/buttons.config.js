module.exports = {
    title: 'Buttons',
    context: {
        buttons: [
            {
                label: 'Button',
                type: 'button--primary',
                url: '#',
            },
            {
                label: 'Button',
                type: 'button--outlined',
                url: '#',
            },
        ],
    },
    variants: [
        {
            title: 'Centered',
            context: {
                class: 'is-centered',
                buttons: [
                    {
                        label: 'Button',
                        type: 'button--primary',
                        url: '#',
                    },
                    {
                        label: 'Button',
                        type: 'button--outlined',
                        url: '#',
                    },
                ],
            },
        },
        {
            title: 'Stacked',
            context: {
                class: 'is-vertical',
                buttons: [
                    {
                        label: 'Button',
                        type: 'button--primary',
                        url: '#',
                    },
                    {
                        label: 'Button',
                        type: 'button--outlined',
                        url: '#',
                    },
                ],
            },
        },
    ],
};
