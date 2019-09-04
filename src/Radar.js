import select from 'd3-selection/src/select';
// import mouse from 'd3-selection/src/mouse';
import line from 'd3-shape/src/line';
import curveLinearClosed from 'd3-shape/src/curve/linearClosed';
import scaleLinear from 'd3-scale/src/linear';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = 50;
const angleOffset = -Math.PI / 2;
const areaOpacity = 0.3;
const ticksCount = 3;

class Radar {
  constructor(svg, {
    title,
    data: { labels, datasets },
    options = {
      legendPosition: config.positionType.upLeft,
      dataColors: [],
      fontFamily: 'xkcd',
    },
  }) {
    this.title = title;
    this.data = {
      labels,
      datasets,
    };
    // TODO: find the longest dataset
    this.directionsCount = datasets[0].data.length;
    this.options = options;
    this.svgEl = select(svg)
      .style('stroke-width', '3')
      .style('font-family', this.options.fontFamily || 'xkcd')
      .attr('width', svg.parentElement.clientWidth)
      .attr('height', Math.min((svg.parentElement.clientWidth * 2) / 3, window.innerHeight));
    this.svgEl.selectAll('*').remove();

    this.width = this.svgEl.attr('width');
    this.height = this.svgEl.attr('height');

    this.chart = this.svgEl.append('g')
      .attr('transform',
        `translate(${this.width / 2},${this.height / 2})`);

    // this.tooltip = new Tooltip
    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) {
      this.svgEl.append('text')
        .style('font-size', '20')
        .style('font-weight', 'bold')
        .attr('x', '50%')
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .text(this.title);
    }

    // FIXME: read from options or 1 by default
    const dotInitSize = 3.5 * 0.5;
    const radius = Math.min(this.width, this.height) / 2 - margin;
    const angleStep = (Math.PI * 2) / this.directionsCount;

    const allDataValues = this.data.datasets
      .reduce((acc, cur) => acc.concat(cur.data), []);
    const maxValue = Math.max(...allDataValues);
    const allMaxData = Array(this.directionsCount).fill(maxValue);
    const valueScale = scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);
    const getX = (d, i) => valueScale(d) * Math.cos(angleStep * i + angleOffset);
    const getY = (d, i) => valueScale(d) * Math.sin(angleStep * i + angleOffset);

    const theLine = line()
      .x(getX)
      .y(getY)
      .curve(curveLinearClosed);

    // grid
    const grid = this.chart.append('g')
      .attr('class', 'xkcd-chart-radar-grid')
      .attr('stroke-width', '1')
      .attr('filter', 'url(#xkcdify-pie)');

    grid.selectAll('.xkcd-chart-radar-level')
      .data(valueScale.ticks(ticksCount))
      .enter()
      .append('path')
      .attr('class', 'xkcd-chart-radar-level')
      .attr('d', d => theLine(Array(this.directionsCount).fill(d)))
      .style('fill', 'none')
      .attr('stroke', '#aaa')
      .attr('stroke-dasharray', '7,7');

    grid.selectAll('.xkcd-chart-radar-line')
      .data(allMaxData)
      .enter()
      .append('line')
      .attr('class', '.xkcd-chart-radar-line')
      .attr('stroke', 'black')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', getX)
      .attr('y2', getY);

    grid.selectAll('.xkcd-chart-radar-tick')
      .data(valueScale.ticks(ticksCount))
      .enter()
      .append('text')
      .attr('class', 'xkcd-chart-radar-tick')
      .attr('x', (d) => getX(d, 0))
      .attr('y', (d) => getY(d, 0))
      .style('font-size', '16')
      .attr('text-anchor', 'end')
      .attr('dx', '-.125em')
      .attr('dy', '.35em')
      .text(d => (d))

    // layers
    const layers = this.chart.selectAll('.xkcd-chart-radar-group')
      .data(this.data.datasets)
      .enter()
      .append('g')
      .attr('class', 'xkcd-chart-radar-group')
      .attr('filter', 'url(#xkcdify-pie)')
      .attr('stroke', (d, i) => colors[i])
      .attr('fill', (d, i) => colors[i]);

    layers.selectAll('circle')
      .data((dataset) => dataset.data)
      .enter()
      .append('circle')
      .attr('pointer-events', 'all')
      .attr('r', dotInitSize)
      .attr('cx', getX)
      .attr('cy', getY);

    layers.selectAll('path')
      .data((dataset) => ([dataset.data]))
      .enter()
      .append('path')
      .attr('d', theLine)
      .style('fill-opacity', areaOpacity);
  }

  update() {
  }
}

export default Radar;
