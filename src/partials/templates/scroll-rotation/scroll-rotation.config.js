module.exports = {
    title: 'Scroll Rotation',
    context: {
        rotateX: true,
        rotateY: true,
        items: [
            {
                itemTitle: 'Front',
                itemClass: 'front',
            },
            {
                itemTitle: 'Back',
                itemClass: 'back',
            },
            {
                itemTitle: 'Left',
                itemClass: 'left',
            },
            {
                itemTitle: 'Right',
                itemClass: 'right',
            },
            {
                itemTitle: 'Top',
                itemClass: 'top',
            },
            {
                itemTitle: 'Bottom',
                itemClass: 'bottom',
            },
        ],
    },
    variants: [
        {
            title: 'Scroll Rotation X Direction',
            context: {
                rotateX: false,
                rotateY: true,
                items: [
                    {
                        itemTitle: 'Front',
                        itemClass: 'front',
                    },
                    {
                        itemTitle: 'Back',
                        itemClass: 'back',
                    },
                    {
                        itemTitle: 'Left',
                        itemClass: 'left',
                    },
                    {
                        itemTitle: 'Right',
                        itemClass: 'right',
                    },
                    {
                        itemTitle: 'Top',
                        itemClass: 'top',
                    },
                    {
                        itemTitle: 'Bottom',
                        itemClass: 'bottom',
                    },
                ],
            },
        },
        {
            title: 'Scroll Rotation Y Direction',
            context: {
                rotateX: true,
                rotateY: false,
                items: [
                    {
                        itemTitle: 'Front',
                        itemClass: 'front',
                    },
                    {
                        itemTitle: 'Back',
                        itemClass: 'back',
                    },
                    {
                        itemTitle: 'Left',
                        itemClass: 'left',
                    },
                    {
                        itemTitle: 'Right',
                        itemClass: 'right',
                    },
                    {
                        itemTitle: 'Top',
                        itemClass: 'top',
                    },
                    {
                        itemTitle: 'Bottom',
                        itemClass: 'bottom',
                    },
                ],
            },
        },
    ],
};
