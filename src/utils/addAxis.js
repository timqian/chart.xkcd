import { axisBottom, axisLeft } from 'd3-axis/src/axis';
import selectAll from 'd3-selection/src/selectAll';

const yAxis = (parent, { yScale, tickCount }) => {
  parent
    .append('g')
    .call(
      axisLeft(yScale)
        .tickSize(0)
        .tickPadding(10)
        .ticks(tickCount, 's'),
    )
    .attr('font-family', 'xkcd')
    .attr('font-size', '16');

  selectAll('.domain')
    .attr('filter', 'url(#xkcdify)');
};

const xAxis = (parent, { xScale, tickCount, moveDown }) => {
  parent
    .append('g')
    .attr('transform', `translate(0,${moveDown})`)
    .call(
      axisBottom(xScale)
        .tickSize(0)
        .tickPadding(6)
        .ticks(tickCount),
    )
    .attr('font-family', 'xkcd')
    .attr('font-size', '16');

  selectAll('.domain')
    .attr('filter', 'url(#xkcdify)');
};

export default {
  xAxis, yAxis,
};
