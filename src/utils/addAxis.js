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
    );

  selectAll('.domain')
    .attr('filter', 'url(#xkcdify)');

  selectAll('.tick > text')
    .style('font-family', 'xkcd')
    .style('font-size', '16');
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
    );

  selectAll('.domain')
    .attr('filter', 'url(#xkcdify)');

  selectAll('.tick > text')
    .style('font-family', 'xkcd')
    .style('font-size', '16');
};

export default {
  xAxis, yAxis,
};
