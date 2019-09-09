import { axisBottom, axisLeft } from 'd3-axis/src/axis';

const yAxis = (parent, {
  yScale, tickCount, fontFamily, unxkcdify,
}) => {
  parent
    .append('g')
    .call(
      axisLeft(yScale)
        .tickSize(0)
        .tickPadding(10)
        .ticks(tickCount, 's'),
    );

  parent.selectAll('.domain')
    .attr('filter', !unxkcdify ? 'url(#xkcdify)' : null)
    .style('stroke', 'black');

  parent.selectAll('.tick > text')
    .style('font-family', fontFamily)
    .style('font-size', '16');
};

const xAxis = (parent, {
  xScale, tickCount, moveDown, fontFamily, unxkcdify,
}) => {
  parent
    .append('g')
    .attr('transform', `translate(0,${moveDown})`)
    .call(
      axisBottom(xScale)
        .tickSize(0)
        .tickPadding(6)
        .ticks(tickCount),
    );

  parent.selectAll('.domain')
    .attr('filter', !unxkcdify ? 'url(#xkcdify)' : null)
    .style('stroke', 'black');

  parent.selectAll('.tick > text')
    .style('font-family', fontFamily)
    .style('font-size', '16');
};

export default {
  xAxis, yAxis,
};
