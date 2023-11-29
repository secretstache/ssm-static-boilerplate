const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

function buildLoaders() {
    const jsLoader = {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        { targets: 'defaults' },
                    ],
                ],
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
                            plugins: [
                                require.resolve('autoprefixer'),
                            ],
                        },
                    },
                },
                'sass-loader',
            ],
        },
    ];

    return [
        jsLoader,
        ...cssLoader,
    ];
}

exports.buildLoaders = buildLoaders;
