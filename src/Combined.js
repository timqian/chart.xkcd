import line from 'd3-shape/src/line';
import { monotoneX } from 'd3-shape/src/curve/monotone';
import select from 'd3-selection/src/select';
import mouse from 'd3-selection/src/mouse';
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
      .attr('transform',
        `translate(${margin.left},${margin.top})`);
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

    const tooltip = new Tooltip({
      parent: this.svgEl,
      title: '',
      items: [],
      position: { x: 60, y: 60, type: config.positionType.downRight },
      unxkcdify: this.options.unxkcdify,
      backgroundColor: this.options.backgroundColor,
      strokeColor: this.options.strokeColor,
    });

    const barDatasets = this.data.datasets
      .filter((dataset) => dataset.type !== 'line');
    const lineDatasets = this.data.datasets
      .filter((dataset) => dataset.type === 'line');

    const xScale = scaleBand()
      .range([0, this.width])
      .domain(this.data.labels)
      .padding(0.4);

    const allData = this.data.datasets
      .reduce((pre, cur) => pre.concat(cur.data), []);

    const yScale = scaleLinear()
      .domain([0, Math.max(...allData)])
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
      stroke: this.options.strokeColor,
    });
    addAxis.yAxis(graphPart, {
      yScale,
      tickCount: this.options.yTickCount || 3,
      fontFamily: this.fontFamily,
      unxkcdify: this.options.unxkcdify,
      stroke: this.options.strokeColor,
    });

    this.svgEl.selectAll('.domain')
      .attr('filter', this.filter);

    const barCount = Math.max(barDatasets.length, 1);
    const barWidth = xScale.bandwidth() / barCount;

    barDatasets.forEach((dataset, datasetIndex) => {
      graphPart.selectAll(`.xkcd-chart-combined-bar-${datasetIndex}`)
        .data(dataset.data)
        .enter()
        .append('rect')
        .attr('class', `xkcd-chart-combined-bar-${datasetIndex}`)
        .attr('x', (d, i) => xScale(this.data.labels[i]) + datasetIndex * barWidth)
        .attr('width', barWidth)
        .attr('y', (d) => yScale(d))
        .attr('height', (d) => this.height - yScale(d))
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .attr('stroke', this.options.strokeColor)
        .attr('stroke-width', 3)
        .attr('rx', 2)
        .attr('filter', this.filter)
        .on('mouseover', (d, i, nodes) => {
          select(nodes[i]).attr('fill', this.options.dataColors[datasetIndex]);
          tooltip.show();
        })
        .on('mouseout', (d, i, nodes) => {
          select(nodes[i]).attr('fill', 'none');
          tooltip.hide();
        })
        .on('mousemove', (d, i, nodes) => {
          this.updateTooltip({
            tooltip,
            node: nodes[i],
            labelIndex: i,
          });
        });
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
      .attr('stroke', (d, i) => this.options.dataColors[barDatasets.length + i])
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

    const circles = lineDatasets.map((dataset, i) => graphPart
      .append('circle')
      .style('stroke', this.options.dataColors[barDatasets.length + i])
      .style('fill', this.options.dataColors[barDatasets.length + i])
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
      .on('mousemove', (d, i, nodes) => {
        const labelXs = this.data.labels.map(
          (label) => xScale(label) + xScale.bandwidth() / 2 + margin.left,
        );
        const mouseLabelDistances = labelXs.map(
          (labelX) => Math.abs(labelX - mouse(nodes[i])[0] - margin.left),
        );
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

        this.updateTooltip({
          tooltip,
          node: nodes[i],
          labelIndex: mostNearLabelIndex,
        });
      });

    if (this.options.showLegend) {
      const legendItems = this.data.datasets
        .map((dataset, i) => ({
          color: this.options.dataColors[i],
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

  updateTooltip({ tooltip, node, labelIndex }) {
    const tipX = mouse(node)[0] + margin.left + 10;
    const tipY = mouse(node)[1] + margin.top + 10;

    const tooltipItems = this.data.datasets.map((dataset, i) => ({
      color: this.options.dataColors[i],
      text: `${dataset.label || ''}: ${dataset.data[labelIndex]}`,
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
      title: this.data.labels[labelIndex],
      items: tooltipItems,
      position: {
        x: tipX,
        y: tipY,
        type: tooltipPositionType,
      },
    });
  }

  update() {
  }
}

export default Combined;
