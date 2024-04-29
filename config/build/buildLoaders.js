const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isBlocks = process.env.project === 'blocks';

function buildLoaders() {
    const jsLoader = {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
        },
    };

    const cssLoader = [
        {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require.resolve('autoprefixer'), require.resolve('postcss-import'), require.resolve('postcss-for')],
                        },
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        additionalData: '$isBlocks: ' + isBlocks + ';',
                    },
                },
            ],
        },
    ];

    return [jsLoader, ...cssLoader];
}

exports.buildLoaders = buildLoaders;
