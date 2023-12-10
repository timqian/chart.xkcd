import select from 'd3-selection/src/select';
import mouse from 'd3-selection/src/mouse';
import scaleBand from 'd3-scale/src/band';
import scaleLinear from 'd3-scale/src/linear';

import addAxis from './utils/addAxis';
import addLabels from './utils/addLabels';
import Tooltip from './components/Tooltip';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = {
  top: 50, right: 30, bottom: 50, left: 50,
};

class Bar {
  constructor(svg, {
    title, xLabel, yLabel, data: { labels, datasets }, options,
  }) {
    this.options = {
      unxkcdify: false,
      yTickCount: 3,
      dataColors: colors,
      fontFamily: 'xkcd',
      strokeColor: 'black',
      backgroundColor: 'white',
      heightRatio: 3,
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
      .attr('height', Math.min((svg.parentElement.clientWidth * 2) / this.options.heightRatio, window.innerHeight));

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
      title: 'tooltip',
      items: [{ color: 'red', text: 'weweyang: 12' }, { color: 'blue', text: 'timqian: 13' }],
      position: { x: 30, y: 30, type: config.positionType.upRight },
      unxkcdify: this.options.unxkcdify,
      backgroundColor: this.options.backgroundColor,
      strokeColor: this.options.strokeColor,
    });

    const xScale = scaleBand()
      .range([0, this.width])
      .domain(this.data.labels)
      .padding(0.4);

    const allData = this.data.datasets
      .reduce((pre, cur) => pre.concat(cur.data), []);

    const yScale = scaleLinear()
      .domain([0, Math.max(...allData)])
      .range([this.height, 0]);

    const graphPart = this.chart.append('g');

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

    // Bars
    graphPart.selectAll('.xkcd-chart-bar')
      .data(this.data.datasets[0].data)
      .enter()
      .append('rect')
      .attr('class', 'xkcd-chart-bar')
      .attr('x', (d, i) => xScale(this.data.labels[i]))
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d))
      .attr('height', (d) => this.height - yScale(d))
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('stroke', this.options.strokeColor)
      .attr('stroke-width', 3)
      .attr('rx', 2)
      // .attr('cursor','crosshair')
      .attr('filter', this.filter)
      .on('mouseover', (d, i, nodes) => {
        select(nodes[i]).attr('fill', this.options.dataColors[i]);
        // select(nodes[i]).attr('fill', 'url(#hatch00)');
        tooltip.show();
      })
      .on('mouseout', (d, i, nodes) => {
        select(nodes[i]).attr('fill', 'none');
        tooltip.hide();
      })
      .on('mousemove', (d, i, nodes) => {
        const tipX = mouse(nodes[i])[0] + margin.left + 10;
        const tipY = mouse(nodes[i])[1] + margin.top + 10;

        let tooltipPositionType = config.positionType.downRight;
        if (tipX > this.width / 2 && tipY < this.height / 2) {
          tooltipPositionType = config.positionType.downLeft;
        } else if (tipX > this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upLeft;
        } else if (tipX < this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = config.positionType.upRight;
        }
        tooltip.update({
          title: this.data.labels[i],
          items: [{
            color: this.options.dataColors[i],
            text: `${this.data.datasets[0].label || ''}: ${d}`,
          }],
          position: {
            x: tipX,
            y: tipY,
            type: tooltipPositionType,
          },
        });
      });
  }

  // TODO: update chart
  update() {

  }
}

export default Bar;
