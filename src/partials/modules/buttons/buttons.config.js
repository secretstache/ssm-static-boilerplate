const options = {
    Align: {
        Center: 'justify-center',
        Right: 'justify-end',
    },
    Stacked: {
        Default: 'flex-col items-start',
        Center: 'flex-col items-center',
        Right: 'flex-col items-end'
    },
};

module.exports = {
    title: 'Buttons',
    options,
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
            title: 'Aligned center',
            context: {
                align: 'center',
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
            title: 'Aligned right',
            context: {
                align: 'right',
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
                stacked: true,
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
            title: 'Stacked aligned center',
            context: {
                stacked: true,
                align: 'center',
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
            title: 'Stacked aligned right',
            context: {
                stacked: true,
                align: 'right',
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
