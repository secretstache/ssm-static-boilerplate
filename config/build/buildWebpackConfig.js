const { buildPlugins } = require('./buildPlugins');
const { buildLoaders } = require('./buildLoaders');
const { buildOptimization } = require('./buildOptimization');

function buildWebpackConfig(options) {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: './assets/scripts/[name].js',
            path: paths.dist,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        optimization: buildOptimization(),
        devtool: isDev ? 'inline-source-map' : undefined,
        stats: 'errors-only',
        watch: !!isDev
    };
}

exports.buildWebpackConfig = buildWebpackConfig;
