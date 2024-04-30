export default {
    "plugins": [
        "prettier-plugin-multiline-arrays",
        "prettier-plugin-css-order"
    ],
    "tabWidth": 4,
    "bracketSameLine": true,
    "printWidth": 1000,
    "singleQuote": true,
    "multilineArraysWrapThreshold": 1,
    "overrides": [
        {
            "files": [
                "**/*.css",
                "**/*.scss",
                "**/*.html"
            ],
            "options": {
                "singleQuote": false
            }
        }
    ]
};