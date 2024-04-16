/** @type {import('tailwindcss').Config} */
const remCalc = (px) => `${px / 16}rem`;

// The min-max function rewritten in TypeScript
const minMax = (minSize, maxSize, minBreakpoint = 480, maxBreakpoint = 1024, unit = 'vw') => {
    const slope = (maxSize - minSize) / (maxBreakpoint - minBreakpoint);
    const slopeToUnit = slope * 100;

    const interceptRem = remCalc(minSize - slope * minBreakpoint);
    const minSizeRem = remCalc(minSize);
    const maxSizeRem = remCalc(maxSize);

    return `clamp(${minSizeRem}, ${slopeToUnit}${unit} + ${interceptRem}, ${maxSizeRem})`;
};

module.exports = {
    content: ['./src/**/*.{njk,js}', './dist/design-system/**/*.html', './eleventy.js'],
    darkMode: ['selector', '.bg-dark'],
    theme: {
        container: {
            center: true,
            padding: remCalc(24),
        },
        extend: {
            fontSize: {
                base: [remCalc(16), 1.5],
            },
            fontFamily: {
                primary: ['"Open Sans"', 'sans-serif'],
                secondary: ['"Times New Romans"', 'sans-serif'],
            },
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },
        },
    },
    plugins: [],
    safelist: ['w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-5/12', 'w-6/12', 'w-7/12', 'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12'],
};
