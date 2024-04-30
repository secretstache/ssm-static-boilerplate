import js from '@eslint/js';
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    {
        ignores: ['src/assets/scripts/libs/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.amd
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
];