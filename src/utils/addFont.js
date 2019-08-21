export default function addFont(parent) {
  parent.append('defs')
    .append('style')
    .attr('type', 'text/css')
    .text(`@font-face {
      font-family: "xkcd";
      src: url('https://cdn.rawgit.com/ipython/xkcd-font/master/xkcd-script/font/xkcd-script.woff');
    }`);
}
