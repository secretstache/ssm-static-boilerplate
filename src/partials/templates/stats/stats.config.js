const options = {
    duration: 2000,
    start: 50,
};

module.exports = {
    title: 'Stats',
    options,
    context: {
        items: [
            {
                count: 100,
                start: options['start'],
            },
            {
                count: 200,
            },
            {
                count: 300,
            },
            {
                count: 400,
                duration: options['duration'],
            },
        ],
    },
};
