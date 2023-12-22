module.exports = {
    title: 'Buttons',
    context: {
        buttons: [
            {
                label: 'Button',
                type: 'is-style-fill',
                url: '/#',
            },
            {
                label: 'Button',
                type: 'is-style-outline',
                url: '/#',
            },
        ],
    },
    variants: [
        {
            title: 'Aligned center',
            context: {
                justification: 'center',
                buttons: [
                    {
                        label: 'Button',
                        type: 'is-style-fill',
                        url: '/#',
                    },
                    {
                        label: 'Button',
                        type: 'is-style-outline',
                        url: '/#',
                    },
                ],
            },
        },
        {
            title: 'Stacked',
            context: {
                stacked: true,
                buttons: [
                    {
                        label: 'Button',
                        type: 'is-style-fill',
                        url: '/#',
                    },
                    {
                        label: 'Button',
                        type: 'is-style-outline',
                        url: '/#',
                    },
                ],
            },
        },
        {
            title: 'Stacked - aligned center',
            context: {
                stacked: true,
                justification: 'center',
                buttons: [
                    {
                        label: 'Button',
                        type: 'is-style-fill',
                        url: '/#',
                    },
                    {
                        label: 'Button',
                        type: 'is-style-outline',
                        url: '/#',
                    },
                ],
            },
        },
    ],
};
