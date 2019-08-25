export default function addFont(parent) {
  parent.append('defs')
    .append('style')
    .attr('type', 'text/css')
    .text(`@font-face {
      font-family: "xkcd";
      src: url('https://github.com/tonyrewin/chart.xkcd/raw/master/assets/xkcd-script-extended.woff');
    }`);
}
