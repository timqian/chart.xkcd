import config from '../config';

export default function addLegend(parent, {
  items, position, unxkcdify, parentWidth, parentHeight, strokeColor, legendColor,
}) {
  const filter = !unxkcdify ? 'url(#xkcdify)' : null;

  const legend = parent.append('svg');
  const backgroundLayer = legend.append('svg');
  const textLayer = legend.append('svg');

  items.forEach((item, i) => {
    textLayer.append('rect')
      .style('fill', item.color)
      .attr('width', 8)
      .attr('height', 8)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('filter', filter)
      .attr('x', 15)
      .attr('y', 17 + 20 * i);

    textLayer.append('text')
      .style('font-size', '15')
      .style('fill', strokeColor)
      .attr('x', 15 + 12)
      .attr('y', 17 + 20 * i + 8)
      .text(item.text);
  });

  const bbox = textLayer.node().getBBox();
  const backgroundWidth = bbox.width + 15;
  const backgroundHeight = bbox.height + 10;

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

  // add background
  backgroundLayer.append('rect')
    .style('fill', legendColor)
    .attr('fill-opacity', 0.85)
    .attr('stroke', strokeColor)
    .attr('stroke-width', 2)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('filter', filter)
    .attr('width', backgroundWidth)
    .attr('height', backgroundHeight)
    .attr('x', 8)
    .attr('y', 5);

  // get legend
  legend
    .attr('x', legendX)
    .attr('y', legendY);
}
