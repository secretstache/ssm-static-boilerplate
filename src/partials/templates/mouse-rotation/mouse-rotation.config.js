module.exports = {
    title: 'Mouse Rotation',
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
            title: 'Mouse Rotation X Direction',
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
            title: 'Mouse Rotation Y Direction',
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
