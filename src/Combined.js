import line from 'd3-shape/src/line';
import { monotoneX } from 'd3-shape/src/curve/monotone';
import select from 'd3-selection/src/select';
import pointer from 'd3-selection/src/pointer';
import scaleBand from 'd3-scale/src/band';
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

const getTooltipPositionType = (tipX, tipY, width, height) => {
  if (tipX > width / 2 && tipY < height / 2) {
    return config.positionType.downLeft;
  }
  if (tipX > width / 2 && tipY > height / 2) {
    return config.positionType.upLeft;
  }
  if (tipX < width / 2 && tipY > height / 2) {
    return config.positionType.upRight;
  }
  return config.positionType.downRight;
};

class Combined {
  constructor(svg, {
    title, xLabel, yLabel, data: { labels, datasets }, options,
  }) {
    this.options = {
      unxkcdify: false,
      yTickCount: 3,
      legendPosition: config.positionType.upLeft,
      dataColors: colors,
      fontFamily: 'xkcd',
      strokeColor: 'black',
      backgroundColor: 'white',
      showLegend: true,
      ...options,
    };
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
    this.filter = 'url(#xkcdify)';
    this.fontFamily = this.options.fontFamily || 'xkcd';
    if (this.options.unxkcdify) {
      this.filter = null;
      this.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    }

    this.svgEl = select(svg)
      .style('stroke-width', '3')
      .style('font-family', this.fontFamily)
      .style('background', this.options.backgroundColor)
      .attr('width', svg.parentElement.clientWidth)
      .attr('height', Math.min((svg.parentElement.clientWidth * 2) / 3, window.innerHeight));
    this.svgEl.selectAll('*').remove();

    this.chart = this.svgEl.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    this.width = this.svgEl.attr('width') - margin.left - margin.right;
    this.height = this.svgEl.attr('height') - margin.top - margin.bottom;

    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) addLabels.title(this.svgEl, this.title, this.options.strokeColor);
    if (this.xLabel) addLabels.xLabel(this.svgEl, this.xLabel, this.options.strokeColor);
    if (this.yLabel) addLabels.yLabel(this.svgEl, this.yLabel, this.options.strokeColor);

    const datasets = this.data.datasets.map((dataset, datasetIndex) => ({
      ...dataset,
      datasetIndex,
      type: dataset.type || 'line',
    }));
    const barDatasets = datasets.filter((dataset) => dataset.type === 'bar');
    const lineDatasets = datasets.filter((dataset) => dataset.type !== 'bar');

    const tooltip = new Tooltip({
      parent: this.svgEl,
      title: '',
      items: datasets.map((dataset) => ({
        color: this.options.dataColors[dataset.datasetIndex],
        text: dataset.label,
      })),
      position: { x: 60, y: 60, type: config.positionType.downRight },
      unxkcdify: this.options.unxkcdify,
      backgroundColor: this.options.backgroundColor,
      strokeColor: this.options.strokeColor,
    });

    const xScale = scaleBand()
      .range([0, this.width])
      .domain(this.data.labels)
      .padding(0.4);

    const allData = datasets
      .reduce((pre, cur) => pre.concat(cur.data), []);

    const yScale = scaleLinear()
      .domain([Math.min(0, ...allData), Math.max(...allData)])
      .range([this.height, 0]);

    const graphPart = this.chart.append('g')
      .attr('pointer-events', 'all');

    addAxis.xAxis(graphPart, {
      xScale,
      tickCount: 3,
      moveDown: this.height,
      fontFamily: this.fontFamily,
      unxkcdify: this.options.unxkcdify,
      stroke: this.options.strokeColor,
    });
    addAxis.yAxis(graphPart, {
      yScale,
      tickCount: this.options.yTickCount || 3,
      fontFamily: this.fontFamily,
      unxkcdify: this.options.unxkcdify,
      stroke: this.options.strokeColor,
    });

    const zeroY = yScale(0);
    const barWidth = barDatasets.length
      ? xScale.bandwidth() / barDatasets.length
      : xScale.bandwidth();

    barDatasets.forEach((dataset, datasetOrder) => {
      const barData = dataset.data.map((value, labelIndex) => ({
        value,
        labelIndex,
      }));

      graphPart.selectAll(`.xkcd-chart-combined-bar-${datasetOrder}`)
        .data(barData)
        .enter()
        .append('rect')
        .attr('class', `xkcd-chart-combined-bar xkcd-chart-combined-bar-${datasetOrder}`)
        .attr('x', (d) => xScale(this.data.labels[d.labelIndex]) + barWidth * datasetOrder)
        .attr('width', barWidth)
        .attr('y', (d) => yScale(Math.max(0, d.value)))
        .attr('height', (d) => Math.abs(yScale(d.value) - zeroY))
        .attr('fill', this.options.dataColors[dataset.datasetIndex])
        .attr('pointer-events', 'all')
        .attr('stroke', this.options.strokeColor)
        .attr('stroke-width', 3)
        .attr('rx', 2)
        .attr('filter', this.filter);
    });

    const theLine = line()
      .x((d, i) => xScale(this.data.labels[i]) + xScale.bandwidth() / 2)
      .y((d) => yScale(d))
      .curve(monotoneX);

    graphPart.selectAll('.xkcd-chart-combined-line')
      .data(lineDatasets)
      .enter()
      .append('path')
      .attr('class', 'xkcd-chart-combined-line')
      .attr('d', (d) => theLine(d.data))
      .attr('fill', 'none')
      .attr('stroke', (d) => this.options.dataColors[d.datasetIndex])
      .attr('filter', this.filter);

    const verticalLine = graphPart.append('line')
      .attr('x1', 30)
      .attr('y1', 0)
      .attr('x2', 30)
      .attr('y2', this.height)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '7,7')
      .style('visibility', 'hidden');

    const circles = lineDatasets.map((dataset) => graphPart
      .append('circle')
      .style('stroke', this.options.dataColors[dataset.datasetIndex])
      .style('fill', this.options.dataColors[dataset.datasetIndex])
      .attr('r', 3.5)
      .style('visibility', 'hidden'));

    graphPart.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
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
      .on('mousemove', (event, d, i, nodes) => {
        const mouseX = pointer(event, nodes[i])[0];
        const tipX = mouseX + margin.left + 10;
        const tipY = pointer(event, nodes[i])[1] + margin.top + 10;

        const labelXs = this.data.labels.map(
          (label) => xScale(label) + xScale.bandwidth() / 2,
        );
        const mouseLabelDistances = labelXs.map((labelX) => Math.abs(labelX - mouseX));
        const mostNearLabelIndex = mouseLabelDistances.indexOf(Math.min(...mouseLabelDistances));

        verticalLine
          .attr('x1', xScale(this.data.labels[mostNearLabelIndex]) + xScale.bandwidth() / 2)
          .attr('x2', xScale(this.data.labels[mostNearLabelIndex]) + xScale.bandwidth() / 2);

        lineDatasets.forEach((dataset, j) => {
          circles[j]
            .style('visibility', 'visible')
            .attr('cx', xScale(this.data.labels[mostNearLabelIndex]) + xScale.bandwidth() / 2)
            .attr('cy', yScale(dataset.data[mostNearLabelIndex]));
        });

        const tooltipItems = datasets.map((dataset) => ({
          color: this.options.dataColors[dataset.datasetIndex],
          text: `${dataset.label || ''}: ${dataset.data[mostNearLabelIndex]}`,
        }));

        tooltip.update({
          title: this.data.labels[mostNearLabelIndex],
          items: tooltipItems,
          position: {
            x: tipX,
            y: tipY,
            type: getTooltipPositionType(tipX, tipY, this.width, this.height),
          },
        });
      });

    if (this.options.showLegend) {
      const legendItems = datasets.map((dataset) => ({
        color: this.options.dataColors[dataset.datasetIndex],
        text: dataset.label,
      }));

      addLegend(graphPart, {
        items: legendItems,
        position: this.options.legendPosition,
        unxkcdify: this.options.unxkcdify,
        parentWidth: this.width,
        parentHeight: this.height,
        backgroundColor: this.options.backgroundColor,
        strokeColor: this.options.strokeColor,
      });
    }
  }

  // TODO: update chart
  // eslint-disable-next-line class-methods-use-this
  update() {
  }
}

export default Combined;
