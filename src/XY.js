import line from 'd3-shape/src/line';
import { monotoneX } from 'd3-shape/src/curve/monotone';
import select from 'd3-selection/src/select';
import scaleLinear from 'd3-scale/src/linear';
import scaleTime from 'd3-scale/src/time';
import dayjs from 'dayjs';

import addAxis from './utils/addAxis';
import addLabels from './utils/addLabels';
import Tooltip from './components/Tooltip';
import Legend from './components/Legend';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = {
  top: 50, right: 30, bottom: 50, left: 50,
};

class XY {
  constructor(svg, {
    title, xLabel, yLabel, data: { datasets },
    options = {
      dotSize: 1, showLine: false, timeFormat: '', xTickCount: 3, yTickCount: 3, legendPosition: config.positionType.upLeft,
    },
  }) {
    // TODO: extract a function?
    if (title) {
      this.title = title;
      margin.top = 60;
    }
    if (xLabel) {
      this.xLabel = xLabel;
      margin.bottom = 50;
    }
    if (yLabel) {
      this.yLabel = yLabel;
      margin.left = 70;
    }
    this.data = {
      datasets,
    };
    this.options = options;
    this.svgEl = select(svg).style('stroke-width', '3')
      .attr('width', svg.parentElement.clientWidth)
      .attr('height', Math.min((svg.parentElement.clientWidth * 2) / 3, window.innerHeight));

    this.chart = this.svgEl.append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);
    this.width = this.svgEl.attr('width') - margin.left - margin.right;
    this.height = this.svgEl.attr('height') - margin.top - margin.bottom;
    this.tooltip = new Tooltip({
      parent: this.svgEl,
      title: '',
      items: [{ color: 'red', text: 'weweyang' }, { color: 'blue', text: 'timqian' }],
      position: { x: 60, y: 60, type: config.positionType.dowfnRight },
    });
    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) addLabels.title(this.svgEl, this.title);
    if (this.xLabel) addLabels.xLabel(this.svgEl, this.xLabel);
    if (this.yLabel) addLabels.yLabel(this.svgEl, this.yLabel);

    if (this.options.timeFormat) {
      this.data.datasets.forEach((dataset) => {
        dataset.data.forEach((d) => {
          // eslint-disable-next-line no-param-reassign
          d.x = dayjs(d.x);
        });
      });
    }

    const allData = this.data.datasets
      .reduce((pre, cur) => pre.concat(cur.data), []);

    const allDataX = allData.map((d) => d.x);
    const allDataY = allData.map((d) => d.y);

    let xScale = scaleLinear()
      .domain([Math.min(...allDataX), Math.max(...allDataX)])
      .range([0, this.width]);

    if (this.options.timeFormat) {
      xScale = scaleTime()
        .domain([Math.min(...allDataX), Math.max(...allDataX)])
        .range([0, this.width]);
    }

    const yScale = scaleLinear()
      .domain([Math.min(...allDataY), Math.max(...allDataY)])
      .range([this.height, 0]);

    const graphPart = this.chart.append('g')
      .attr('pointer-events', 'all');

    // axis
    addAxis.xAxis(graphPart, { xScale, tickCount: this.options.xTickCount || 3, moveDown: this.height });
    addAxis.yAxis(graphPart, { yScale, tickCount: this.options.yTickCount || 3 });

    // lines
    if (this.options.showLine) {
      const theLine = line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(monotoneX);

      graphPart.selectAll('.xkcd-chart-xyline')
        .data(this.data.datasets)
        .enter()
        .append('path')
        .attr('class', 'xkcd-chart-xyline')
        .attr('d', (d) => theLine(d.data))
        .attr('fill', 'none')
        .attr('stroke', (d, i) => colors[0][i])
        .attr('filter', 'url(#xkcdify)');
    }

    // dots
    const dotInitSize = 3.5 * (this.options.dotSize === undefined ? 1 : this.options.dotSize);
    const dotHoverSize = 6 * (this.options.dotSize === undefined ? 1 : this.options.dotSize);
    graphPart.selectAll('.xkcd-chart-xycircle-group')
      .data(this.data.datasets)
      .enter()
      .append('g')
      .attr('class', '.xkcd-chart-xycircle-group')
      .attr('filter', 'url(#xkcdify)')
      .attr('xy-group-index', (d, i) => i)
      .selectAll('.xkcd-chart-xycircle-circle')
      .data((dataset) => dataset.data)
      .enter()
      .append('circle')
      .style('stroke', (d, i, nodes) => {
        // FIXME: here I want to pass xyGroupIndex down to the circles by reading parent attrs
        // It might have perfomance issue with a large dataset, not sure there are better ways
        const xyGroupIndex = Number(select(nodes[i].parentElement).attr('xy-group-index'));
        return colors[0][xyGroupIndex];
      })
      .style('fill', (d, i, nodes) => {
        const xyGroupIndex = Number(select(nodes[i].parentElement).attr('xy-group-index'));
        return colors[0][xyGroupIndex];
      })
      .attr('r', dotInitSize)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('pointer-events', 'all')
      .on('mouseover', (d, i, nodes) => {
        const xyGroupIndex = Number(select(nodes[i].parentElement).attr('xy-group-index'));
        select(nodes[i])
          .attr('r', dotHoverSize);

        const tipX = xScale(d.x) + margin.left + 5;
        const tipY = yScale(d.y) + margin.top + 5;
        let tooltipPositionType = config.positionType.downRight;
        if (tipX > this.width / 2 && tipY < this.height / 2) {
          tooltipPositionType = config.positionType.downLeft;
        } else if (tipX > this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upLeft;
        } else if (tipX < this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upRight;
        }
        this.tooltip.update({
          title: this.options.timeFormat ? dayjs(this.data.datasets[xyGroupIndex].data[i].x).format(this.options.timeFormat) : `${this.data.datasets[xyGroupIndex].data[i].x}`,
          items: [{
            color: colors[0][xyGroupIndex],
            text: `${this.data.datasets[xyGroupIndex].label || ''}: ${d.y}`,
          }],
          position: {
            x: tipX,
            y: tipY,
            type: tooltipPositionType,
          },
        });
        this.tooltip.show();
      })
      .on('mouseout', (d, i, nodes) => {
        select(nodes[i])
          .attr('r', dotInitSize);

        this.tooltip.hide();
      });


    // Legend
    const legendItems = this.data.datasets.map(
      (dataset, i) => ({ color: colors[0][i], text: dataset.label }),
    );
    if (this.options.legendPosition === config.positionType.upLeft
       || !this.options.legendPosition) {
      new Legend({
        parent: graphPart,
        items: legendItems,
        position: { x: 3, y: 3, type: config.positionType.downRight },
      });
    } else if (this.options.legendPosition === config.positionType.upRight) {
      new Legend({
        parent: graphPart,
        items: legendItems,
        position: { x: this.width - 3, y: 3, type: config.positionType.downLeft },
      });
    } else {
      throw new Error('legendPosition only support upLeft and upRight for now');
    }
  }

  // TODO: update chart
  update() {
  }
}

export default XY;
