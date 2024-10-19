module.exports = {
    title: 'Numbered Blocks',
    defaultTitle: 'Numbered Blocks - 2up',
    context: {
        style: '--profile-color: var(--aspen-gold)',
        items: [
            {
                title: 'Headline goes here',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit sollicitudin. Nunc fermentum lacinia accumsan. Suspendisse porta non turpis eget tristique. Ut sodales tincidunt urna volutpat finibus. Cras at elit rhoncus sem faucibus elementum. Phasellus condimentum sem in sapien consectetur, a tincidunt leo elementum.',
                buttons: [
                    {
                        label: 'Button Goes Here',
                        link: '#',
                    },
                ],
            },
            {
                title: 'Headline goes here',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit sollicitudin. Nunc fermentum lacinia accumsan. Suspendisse porta non turpis eget tristique. Ut sodales tincidunt urna volutpat finibus. Cras at elit rhoncus sem faucibus elementum. Phasellus condimentum sem in sapien consectetur, a tincidunt leo elementum.',
                buttons: [
                    {
                        label: 'Button Goes Here',
                        link: '#',
                    },
                ],
            },
        ],
    },
    variants: [
        {
            title: 'Numbered Blocks - 3up',
            context: {
                style: '--profile-color: var(--crimson)',
                class: 'has-3-up-cards',
                items: [
                    {
                        title: 'Headline goes here',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit.',
                        buttons: [
                            {
                                label: 'Button Goes Here',
                                link: '#',
                            },
                        ],
                    },
                    {
                        title: 'Headline goes here',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit.',
                        buttons: [
                            {
                                label: 'Button Goes Here',
                                link: '#',
                            },
                        ],
                    },
                    {
                        title: 'Headline goes here',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit.',
                        buttons: [
                            {
                                label: 'Button Goes Here',
                                link: '#',
                            },
                        ],
                    },
                ],
            },
        },
        {
            title: 'Numbered Blocks - Layout Card',
            context: {
                style: '--profile-color: var(--red)',
                class: 'layout-card',
                layoutCard: true,
                items: [
                    {
                        title: 'Headline goes here',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit.',
                        buttons: [
                            {
                                label: 'Button Goes Here',
                                link: '#',
                            },
                        ],
                    },
                    {
                        title: 'Headline goes here',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit.',
                        buttons: [
                            {
                                label: 'Button Goes Here',
                                link: '#',
                            },
                        ],
                    },
                    {
                        title: 'Headline goes here',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus venenatis nunc sed vulputate viverra. Donec tempus porttitor ipsum suscipit.',
                        buttons: [
                            {
                                label: 'Button Goes Here',
                                link: '#',
                            },
                        ],
                    },
                ],
            },
        }
    ],
};
