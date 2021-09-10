//converts px to rem
exports.rem = (px) => {
    return (parseFloat(px) / 16).toFixed(4).replace(/\.?0+$/, '') + 'rem'
}