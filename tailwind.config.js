const TILEWIND_PATHS =  ['./src/pages/**/*.html', './src/{layouts,partials}/**/*.html', './src/data/**/*.{js,json,yml}', './src/helpers/**/*.js', './src/assets/styles/**/*.css'];

const utilities = require('./tilewind/utilities/utilities');

const rem = utilities.rem;


/*
  -----------------------------------------------------------------------------
  COLORS    
  Usage: .text-{option}-{modifier}, .bg-{option}-{modifier}, .border-{option}-{modifier}
  -----------------------------------------------------------------------------
*/
let colors = {
  'black': '#000',
  'white': '#fff',
}

/*
  -----------------------------------------------------------------------------
  FONT FAMILIES    
  Usage: .font-{option}
  -----------------------------------------------------------------------------
*/
let fontFamily = {
  'body': ['Helvetica', 'Arial', 'sans-serif'],
  'headings': ['Helvetica', 'Arial', 'serif']
}

/*
  -----------------------------------------------------------------------------
  FONT SIZES 
  Usage: .text-{option}   
  -----------------------------------------------------------------------------
*/
let fontSize = {
  'base': [rem(16), '1.5'],
  'small': [rem(14), '1.4'],
  'large': [rem(20), '1.4'],
  'h1': [rem(48), '1'],
  'h2': [rem(36), '1'],
  'h3': [rem(28), '1'],
  'h4': [rem(24), '1'],
  'h5': [rem(20), '1'],
  'h6': [rem(18), '1']
}

/*
  -----------------------------------------------------------------------------
  MAX WIDTHS
  Usage: .max-w-{option}
  -----------------------------------------------------------------------------
*/
let maxWidth = {
  'initial': 'initial'
}

/*
  -----------------------------------------------------------------------------
  SPACING
  By default the spacing scale is inherited by the padding, margin, width, 
  height, maxHeight, gap, inset, space, and translate core plugins.
  -----------------------------------------------------------------------------
*/
let spacing = {
  'p': rem(16),
  'module': rem(30),
  'section': rem(120),
  'col': rem(15)
}


/*
  -----------------------------------------------------------------------------
  MARGINS
  Usage: .m-{option}, .mb-{option}, .mt-{option}, .ml-{option}, .mr-{option}
  -----------------------------------------------------------------------------
*/
let margin = {
 
}

/*
  -----------------------------------------------------------------------------
  PADDINGS
  Usage: .p-{option}, .pb-{option}, .pt-{option}, .pl-{option}, .pr-{option}
  -----------------------------------------------------------------------------
*/
let padding = {

}

/*
  -----------------------------------------------------------------------------
  Z-INDEX
  Usage: .z-{option}
  -----------------------------------------------------------------------------
*/
let zIndex = {
  '9998': '9998',
  '9999': '9999',
  '-9999': '-9999'
}


/*
  -----------------------------------------------------------------------------
  TRANSLATE
  Usage: .transform.translate-{x,y}-{option}
  -----------------------------------------------------------------------------
*/
let translate = {
  '100vw': '100vw',
  '-100vw': '-100vw'
}

/*
  -----------------------------------------------------------------------------
  THEME
  -----------------------------------------------------------------------------
*/
const theme = {
  extend: {
    colors: colors,
    fontFamily: fontFamily,
    fontSize: fontSize,
    maxWidth: maxWidth,
    spacing: spacing,
    margin: margin,
    padding: padding,
    zIndex: zIndex,
    translate: translate
  },
  fluidContainer: {
    'default': {
      maxWidth: rem(1200), 
      padding: rem(16), 
    },
  },
}


/*
  -----------------------------------------------------------------------------
  VARIANTS
  -----------------------------------------------------------------------------
*/
const variants = {
  fluidContainer: ['responsive']
}


/*
  -----------------------------------------------------------------------------
  PLUGINS
  -----------------------------------------------------------------------------
*/
const plugins = [
  //https://github.com/benface/tailwindcss-fluid-container
  require('tailwindcss-fluid-container')({
    componentPrefix: 'fluid-'
  }),
];


/*
  -----------------------------------------------------------------------------
  FULL CONFIG
  -----------------------------------------------------------------------------
*/
module.exports = {
    mode: 'jit',
    purge: TILEWIND_PATHS,
    darkMode: false, // or 'media' or 'class'
    theme: theme,
    variants: variants,
    plugins: plugins,
}