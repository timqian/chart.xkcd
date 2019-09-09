import select from 'd3-selection/src/select';
import line from 'd3-shape/src/line';
import curveLinearClosed from 'd3-shape/src/curve/linearClosed';
import scaleLinear from 'd3-scale/src/linear';
import Legend from './components/Legend';
import Tooltip from './components/Tooltip';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = 50;
const angleOffset = -Math.PI / 2;
const areaOpacity = 0.2;

class Radar {
  constructor(svg, {
    title,
    data: { labels, datasets },
    options = {
      showLabels: false,
      ticksCount: 3,
      showLegend: false,
      legendPosition: config.positionType.upLeft,
      dataColors: [],
      fontFamily: 'xkcd',
      dotSize: 1,
    },
  }) {
    this.title = title;
    this.data = {
      labels,
      datasets,
    };
    // TODO: find the longest dataset or throw an error for inconsistent datasets
    this.directionsCount = datasets[0].data.length;
    this.options = options;
    this.filter = 'url(#xkcdify-pie)';
    this.fontFamily = this.options.fontFamily || 'xkcd';
    if (options.unxkcdify) {
      this.filter = null;
      this.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    }
    this.svgEl = select(svg)
      .style('stroke-width', '3')
      .style('font-family', this.fontFamily)
      .attr('width', svg.parentElement.clientWidth)
      .attr('height', Math.min((svg.parentElement.clientWidth * 2) / 3, window.innerHeight));
    this.svgEl.selectAll('*').remove();

    this.width = this.svgEl.attr('width');
    this.height = this.svgEl.attr('height');

    this.chart = this.svgEl.append('g')
      .attr('transform',
        `translate(${this.width / 2},${this.height / 2})`);

    this.tooltip = new Tooltip({
      parent: this.svgEl,
      title: '',
      items: [],
      position: { x: 0, y: 0, type: config.positionType.downRight },
      unxkcdify: this.options.unxkcdify,
    });
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

    const dotInitSize = 3.5 * (this.options.dotSize || 1);
    const dotHoverSize = 6 * (this.options.dotSize || 1);
    const dataColors = this.options.dataColors || colors;
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
    const ticks = valueScale.ticks(this.options.ticksCount || 3);
    const grid = this.chart.append('g')
      .attr('class', 'xkcd-chart-radar-grid')
      .attr('stroke-width', '1')
      .attr('filter', this.filter);

    grid.selectAll('.xkcd-chart-radar-level')
      .data(ticks)
      .enter()
      .append('path')
      .attr('class', 'xkcd-chart-radar-level')
      .attr('d', (d) => theLine(Array(this.directionsCount).fill(d)))
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
      .data(ticks)
      .enter()
      .append('text')
      .attr('class', 'xkcd-chart-radar-tick')
      .attr('x', (d) => getX(d, 0))
      .attr('y', (d) => getY(d, 0))
      .style('font-size', '16')
      .attr('text-anchor', 'end')
      .attr('dx', '-.125em')
      .attr('dy', '.35em')
      .text((d) => d);

    if (this.options.showLabels) {
      grid.selectAll('.xkcd-chart-radar-label')
        .data(allMaxData.map((d) => d * 1.15))
        .enter()
        .append('text')
        .attr('class', 'xkcd-chart-radar-label')
        .style('font-size', '16')
        .attr('x', (d, i) => (radius + 10) * Math.cos(angleStep * i + angleOffset))
        .attr('y', (d, i) => (radius + 10) * Math.sin(angleStep * i + angleOffset))
        .attr('dy', '.35em')
        .attr('text-anchor', (d, i, nodes) => {
          const node = select(nodes[i]);
          let anchor = 'start';

          if (node.attr('x') < 0) {
            anchor = 'end';
          }

          return anchor;
        })
        .text((d, i) => this.data.labels[i]);
    }

    // layers
    const layers = this.chart.selectAll('.xkcd-chart-radar-group')
      .data(this.data.datasets)
      .enter()
      .append('g')
      .attr('class', 'xkcd-chart-radar-group')
      .attr('filter', this.filter)
      .attr('stroke', (d, i) => dataColors[i])
      .attr('fill', (d, i) => dataColors[i]);

    layers.selectAll('circle')
      .data((dataset) => dataset.data)
      .enter()
      .append('circle')
      .attr('r', dotInitSize)
      .attr('cx', getX)
      .attr('cy', getY)
      .attr('pointer-events', 'all')
      .on('mouseover', (d, i, nodes) => {
        select(nodes[i]).attr('r', dotHoverSize);

        const tipX = getX(d, i) + this.width / 2;
        const tipY = getY(d, i) + this.height / 2;
        let tooltipPositionType = config.positionType.downRight;
        if (tipX > this.width / 2 && tipY < this.height / 2) {
          tooltipPositionType = config.positionType.downLeft;
        } else if (tipX > this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upLeft;
        } else if (tipX < this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upRight;
        }
        this.tooltip.update({
          title: this.data.labels[i],
          items: this.data.datasets.map((dataset, datasetIndex) => ({
            color: dataColors[datasetIndex],
            text: `${dataset.label || ''}: ${dataset.data[i]}`,
          })),
          position: {
            x: tipX,
            y: tipY,
            type: tooltipPositionType,
          },
        });
        this.tooltip.show();
      })
      .on('mouseout', (d, i, nodes) => {
        select(nodes[i]).attr('r', dotInitSize);

        this.tooltip.hide();
      });

    layers.selectAll('path')
      .data((dataset) => ([dataset.data]))
      .enter()
      .append('path')
      .attr('d', theLine)
      .attr('pointer-events', 'none')
      .style('fill-opacity', areaOpacity);

    // legend
    if (this.options.showLegend) {
      const legendItems = this.data.datasets
        .map((data, i) => ({ color: dataColors[i], text: data.label || '' }));
      if (this.options.legendPosition === config.positionType.upLeft
        || !this.options.legendPosition) {
        new Legend({
          parent: this.svgEl,
          items: legendItems,
          position: {
            x: 3,
            y: this.title ? 30 : 3,
            type: config.positionType.downRight,
          },
          unxkcdify: this.options.unxkcdify,
        });
      } else if (this.options.legendPosition === config.positionType.upRight) {
        new Legend({
          parent: this.svgEl,
          items: legendItems,
          position: {
            x: this.width - 3,
            y: this.title ? 30 : 3,
            type: config.positionType.downLeft,
          },
          unxkcdify: this.options.unxkcdify,
        });
      } else {
        throw new Error('legendPosition only support upLeft and upRight for now');
      }
    }
  }

  update() {
  }
}

export default Radar;
