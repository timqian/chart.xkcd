import line from 'd3-shape/src/line';
import { monotoneX } from 'd3-shape/src/curve/monotone';
import select from 'd3-selection/src/select';
import mouse from 'd3-selection/src/mouse';
import { point as scalePoint } from 'd3-scale/src/band';
import scaleLinear from 'd3-scale/src/linear';

import addAxis from './utils/addAxis';
import addLabels from './utils/addLabels';
import Tooltip from './components/Tooltip';
import addLegend from './utils/addLegend';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = {
  top: 50, right: 30, bottom: 50, left: 50,
};

class Line {
  constructor(svg, {
    title, xLabel, yLabel, data: { labels, datasets },
    options = {
      unxkcdify: false,
      yTickCount: 3,
      legendPosition: config.positionType.upLeft,
      dataColors: [],
      fontFamily: 'xkcd',
      strokeColor: 'black',
      backgroundColor: 'white',
    },
  }) {
    if(!options.strokeColor) {
      options.strokeColor = 'black';
    }
    if(!options.backgroundColor) {
      options.backgroundColor = 'white';
    }
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
      labels,
      datasets,
    };
    this.options = options;
    this.strokeColor = options.strokeColor;
    this.backgroundColor = options.backgroundColor;
    this.filter = 'url(#xkcdify)';
    this.fontFamily = this.options.fontFamily || 'xkcd';
    if (options.unxkcdify) {
      this.filter = null;
      this.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    }

    this.svgEl = select(svg)
      .style('stroke-width', '3')
      .style('font-family', this.fontFamily)
      .style('background', this.backgroundColor)
      .attr('width', svg.parentElement.clientWidth)
      .attr('height', Math.min((svg.parentElement.clientWidth * 2) / 3, window.innerHeight));
    this.svgEl.selectAll('*').remove();

    this.chart = this.svgEl.append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);
    this.width = this.svgEl.attr('width') - margin.left - margin.right;
    this.height = this.svgEl.attr('height') - margin.top - margin.bottom;

    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) addLabels.title(this.svgEl, this.title, this.strokeColor);
    if (this.xLabel) addLabels.xLabel(this.svgEl, this.xLabel, this.strokeColor);
    if (this.yLabel) addLabels.yLabel(this.svgEl, this.yLabel, this.strokeColor);
    const tooltip = new Tooltip({
      parent: this.svgEl,
      title: '',
      items: [{ color: 'red', text: 'weweyang' }, { color: 'blue', text: 'timqian' }],
      position: { x: 60, y: 60, type: config.positionType.downRight },
      unxkcdify: this.options.unxkcdify,
      backgroundColor: this.backgroundColor,
      strokeColor: this.strokeColor,
    });

    const xScale = scalePoint()
      .domain(this.data.labels)
      .range([0, this.width]);

    const allData = this.data.datasets
      .reduce((pre, cur) => pre.concat(cur.data), []);

    const yScale = scaleLinear()
      .domain([Math.min(...allData), Math.max(...allData)])
      .range([this.height, 0]);

    const graphPart = this.chart.append('g')
      .attr('pointer-events', 'all');

    // axis
    addAxis.xAxis(graphPart, {
      xScale,
      tickCount: 3,
      moveDown: this.height,
      fontFamily: this.fontFamily,
      unxkcdify: this.options.unxkcdify,
      stroke: this.strokeColor
    });
    addAxis.yAxis(graphPart, {
      yScale,
      tickCount: this.options.yTickCount || 3,
      fontFamily: this.fontFamily,
      unxkcdify: this.options.unxkcdify,
      stroke: this.strokeColor,
    });

    this.svgEl.selectAll('.domain')
      .attr('filter', this.filter);

    const theLine = line()
      .x((d, i) => xScale(this.data.labels[i]))
      .y((d) => yScale(d))
      .curve(monotoneX);

    graphPart.selectAll('.xkcd-chart-line')
      .data(this.data.datasets)
      .enter()
      .append('path')
      .attr('class', 'xkcd-chart-line')
      .attr('d', (d) => theLine(d.data))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => (this.options.dataColors
        ? this.options.dataColors[i]
        : colors[i]))
      .attr('filter', this.filter);

    // hover effect
    const verticalLine = graphPart.append('line')
      .attr('x1', 30)
      .attr('y1', 0)
      .attr('x2', 30)
      .attr('y2', this.height)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '7,7')
      .style('visibility', 'hidden');

    const circles = this.data.datasets.map((dataset, i) => graphPart
      .append('circle')
      .style('stroke', this.options.dataColors ? this.options.dataColors[i] : colors[i])
      .style('fill', this.options.dataColors ? this.options.dataColors[i] : colors[i])
      .attr('r', 3.5)
      .style('visibility', 'hidden'));

    graphPart.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
      // .attr('stroke', 'black')
      .on('mouseover', () => {
        circles.forEach((circle) => circle.style('visibility', 'visible'));
        verticalLine.style('visibility', 'visible');
        tooltip.show();
      })
      .on('mouseout', () => {
        circles.forEach((circle) => circle.style('visibility', 'hidden'));
        verticalLine.style('visibility', 'hidden');
        tooltip.hide();
      })
      .on('mousemove', (d, i, nodes) => {
        const tipX = mouse(nodes[i])[0] + margin.left + 10;
        const tipY = mouse(nodes[i])[1] + margin.top + 10;

        const labelXs = this.data.labels.map((label) => xScale(label) + margin.left);
        const mouseLableDistances = labelXs.map(
          (labelX) => Math.abs(labelX - mouse(nodes[i])[0] - margin.left),
        );
        const mostNearLabelIndex = mouseLableDistances.indexOf(Math.min(...mouseLableDistances));

        verticalLine
          .attr('x1', xScale(this.data.labels[mostNearLabelIndex]))
          .attr('x2', xScale(this.data.labels[mostNearLabelIndex]));

        this.data.datasets.forEach((dataset, j) => {
          circles[j]
            .style('visibility', 'visible')
            .attr('cx', xScale(this.data.labels[mostNearLabelIndex]))
            .attr('cy', yScale(dataset.data[mostNearLabelIndex]));
        });

        const tooltipItems = this.data.datasets.map((dataset, j) => ({
          color: this.options.dataColors ? this.options.dataColors[j] : colors[j],
          text: `${this.data.datasets[j].label || ''}: ${this.data.datasets[j].data[mostNearLabelIndex]}`,
        }));

        let tooltipPositionType = config.positionType.downRight;
        if (tipX > this.width / 2 && tipY < this.height / 2) {
          tooltipPositionType = config.positionType.downLeft;
        } else if (tipX > this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upLeft;
        } else if (tipX < this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upRight;
        }

        tooltip.update({
          title: this.data.labels[mostNearLabelIndex],
          items: tooltipItems,
          position: {
            x: tipX,
            y: tipY,
            type: tooltipPositionType,
          },
        });
      });

    // Legend
    const legendItems = this.data.datasets
      .map((dataset, i) => ({
        color: this.options.dataColors ? this.options.dataColors[i] : colors[i],
        text: dataset.label,
      }));

    addLegend(graphPart, {
      items: legendItems,
      position: this.options.legendPosition,
      unxkcdify: this.options.unxkcdify,
      parentWidth: this.width,
      parentHeight: this.height,
      backgroundColor: this.backgroundColor,
      strokeColor: this.strokeColor,
    });
  }

  // TODO: update chart
  update() {
  }
}

export default Line;
