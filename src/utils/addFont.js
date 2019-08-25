export default function addFont(parent) {
  parent.append('defs')
    .append('style')
    .attr('type', 'text/css')
    .text(`@font-face {
      font-family: "xkcd";
      src: url('/fonts/xkcd-script-extended.woff');
    }`);
}
