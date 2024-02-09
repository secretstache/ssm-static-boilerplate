const prettify = require('html-prettify');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const fs = require('fs');
const prettier = require('prettier');

const dir = {
    input: 'src/pages',
    output: 'dist',
    includes: '../partials',
    layouts: '../layouts',
    data: '../data',
};

const yaml = require('js-yaml');

const assets = [
    'images',
    'video',
    'fonts',
    'animations',
];

const mode = process.env.mode || 'development';
const isDev = mode === 'development';
const isBlocks = process.env.project === 'blocks';

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(syntaxHighlight);

    //Copy assets to the output folder
    assets.forEach((asset) => {
        eleventyConfig.addPassthroughCopy({ [`./src/assets/${asset}`]: `assets/${asset}` });
    });

    //Enable quiet mode to reduce console noise
    eleventyConfig.setQuietMode(true);

    //Use yaml for data files
    eleventyConfig.addDataExtension('yml, yaml', (contents) => yaml.load(contents));

    // Automatically import macros on every page
    // (otherwise we need to manually include on each page that uses them)
    eleventyConfig.addCollection('everything', (collectionApi) => {
        // Note: Update the path to point to your macro file
        let macroImport = '{% from "macros/default.njk" import columns, column, module, template %}';

        if (isBlocks) {
            macroImport = '{% from "macros/blocks.njk" import column, block %}';
        }

        // Note: Collections don’t include layouts or includes, which still require importing macros manually
        let collection = collectionApi.getFilteredByGlob('src/**/*.njk');
        collection.forEach((item) => {
            item.template.frontMatter.content = `${macroImport}\n${item.template.frontMatter.content}`;
        });
        return collection;
    });

    /* next commands for the design system */

    eleventyConfig.addPairedShortcode('prettify', (content) => {
        return prettify(content, { count: 4 });
    });

    eleventyConfig.addFilter('console', function (value) {
        return JSON.stringify(value, null, 2);
    });

    eleventyConfig.addShortcode('rawCodeSnippet', async function (fileUrl) {
        let result = await fs.promises.readFile('./src/partials/' + fileUrl, { encoding: 'utf-8' });

        return `${result}`;
    });

    eleventyConfig.addPairedShortcode('brace', function (content, type = 'curly') {
        const [
            opening,
            closing,
        ] = {
            curly: [
                '{{',
                '}}',
            ],
            call: [
                '{%',
                '%}',
            ],
            silent: [
                '{%-',
                '-%}',
            ],
        }[type];
        return `${opening}${content}${closing}`;
    });

    eleventyConfig.addFilter('toRem', function (value) {
        return parseInt(value) / 16 + 'rem';
    });

    /* end next commands for the design system */

    /* adds prefix to urls */
    eleventyConfig.addNunjucksGlobal('root', process.env.prefix);

    /* adds prefix to urls */
    eleventyConfig.addNunjucksGlobal('isBlocks', isBlocks);

    /* server options */
    eleventyConfig.setServerOptions({
        watch: [
            'dist/assets/scripts/**/*.*',
            'dist/assets/styles/**/*.*',
        ],
    });

    /* unique id */
    eleventyConfig.addNunjucksGlobal('uid', () => {
        return `${Date.now() + Math.floor(Math.random() * 100)}`;
    });

    /* custom filters */
    eleventyConfig.addFilter('toClassNames', function (arr) {
        const classes = arr.filter((item) => Boolean(item)).join(' ');

        if (classes) return ' ' + classes;

        return '';
    });

    eleventyConfig.addFilter('toStyleString', function (arr) {
        const styles = arr.filter((item) => Boolean(item)).join(';');

        if (styles) return ' style="' + styles + '"';

        return '';
    });

    function sortByTitle(values) {
        return values.slice().sort((a, b) => a.data.title.localeCompare(b.data.title));
    }

    eleventyConfig.addFilter('sortByTitle', sortByTitle);

    // eleventyConfig.addTransform('prettier', (content, outputPath) => {
    //     console.log(outputPath);
    //     if (outputPath.endsWith('.html') && !isDev) {
    //         return prettier.format(content, { parser: 'html' });
    //     }
    //     return content;
    // });

    return {
        dir,
        passthroughFileCopy: true,
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
    };
};
