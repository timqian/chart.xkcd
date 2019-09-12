import config from '../config';

export default function addLegend(parent, {
  items, position, unxkcdify, parentWidth, parentHeight,
}) {
  const backgroundWidth = items.reduce(
    (pre, cur) => (pre > cur.text.length ? pre : cur.text.length),
    0,
  ) * 7.5 + 30;

  const backgroundHeight = items.length * 20 + 10;

  const filter = !unxkcdify ? 'url(#xkcdify)' : null;

  let legendX = 0;
  let legendY = 0;
  if (
    position === config.positionType.downLeft
    || position === config.positionType.downRight
  ) {
    legendY = parentHeight - backgroundHeight - 13;
  }
  if (
    position === config.positionType.upRight
    || position === config.positionType.downRight
  ) {
    legendX = parentWidth - backgroundWidth - 13;
  }
  // get legend
  const legend = parent.append('svg')
    .attr('x', legendX)
    .attr('y', legendY);

  // add background
  legend.append('rect')
    .style('fill', 'white')
    .attr('fill-opacity', 0.85)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('filter', filter)
    .attr('width', backgroundWidth)
    .attr('height', backgroundHeight)
    .attr('x', 8)
    .attr('y', 5);

  // add items
  items.forEach((item, i) => {
    const g = legend.append('g');
    g.append('rect')
      .style('fill', item.color)
      .attr('width', 8)
      .attr('height', 8)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('filter', filter)
      .attr('x', 15)
      .attr('y', 17 + 20 * i);

    g.append('text')
      .style('font-size', '15')
      .attr('x', 15 + 12)
      .attr('y', 17 + 20 * i + 8)
      .text(item.text);
  });
}
