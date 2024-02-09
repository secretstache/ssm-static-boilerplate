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
                class: 'align-center',
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
