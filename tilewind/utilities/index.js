//converts px to rem
export function rem(px) {
    return (parseInt(px) / 16) + 'rem';
}
  
//converts line height in pixels to absolute values
export function lh(fs,lh) {
    return (parseInt(lh) / parseInt(fs));
}