import select from 'd3-selection/src/select';
import selectAll from 'd3-selection/src/selectAll';
import mouse from 'd3-selection/src/mouse';
import scaleBand from 'd3-scale/src/band';
import scaleLinear from 'd3-scale/src/linear';
import { axisBottom, axisLeft } from 'd3-axis/src/axis';

import Tooltip from './components/Tooltip';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = {
  top: 50, right: 50, bottom: 50, left: 50,
};

class Bar {
  constructor(svg, {
    title, xLabel, yLabel, data: { labels, datasets },
  }) {
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
      margin.left = 80;
    }
    this.data = {
      labels,
      datasets,
    };
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
      title: 'tooltip',
      items: [{ color: 'red', text: 'weweyang: 12' }, { color: 'blue', text: 'timqian: 13' }],
      position: { x: 30, y: 30, type: config.positionType.upRight },
    });
    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) {
      this.svgEl
        .append('text')
        .attr('font-family', 'xkcd')
        .attr('font-size', '20')
        .attr('font-weight', 'bold')
        .attr('x', '50%')
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .text(this.title);
    }

    if (this.xLabel) {
      this.svgEl
        .append('text')
        .attr('font-family', 'xkcd')
        .attr('font-size', 17)
      // .attr('font-weight', 'bold')
        .attr('x', '50%')
        .attr('y', this.svgEl.attr('height') - 10)
        .attr('text-anchor', 'middle')
        .text(this.xLabel);
    }

    if (this.yLabel) {
      this.svgEl.append('text')
        .attr('text-anchor', 'end')
        .attr('y', 6)
        .attr('x', 0 - (this.height / 2))
        .attr('dy', '.75em')
        .attr('transform', 'rotate(-90)')
        .attr('font-family', 'xkcd')
        .attr('font-size', 17)
        .text(this.yLabel);
    }

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
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .attr('rx', 2)
      // .attr('cursor','crosshair')
      .attr('filter', 'url(#xkcdify)')
      .on('mouseover', (d, i, nodes) => {
        select(nodes[i]).attr('fill', colors[0][i]);
        // select(nodes[i]).attr('fill', 'url(#hatch00)');
        this.tooltip.show();
      })
      .on('mouseout', (d, i, nodes) => {
        select(nodes[i]).attr('fill', 'none');
        this.tooltip.hide();
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
        this.tooltip.update({
          title: this.data.labels[i],
          items: [{
            color: colors[0][i],
            text: `${this.data.datasets[0].label || ''}: ${d}`,
          }],
          position: {
            x: tipX,
            y: tipY,
            type: tooltipPositionType,
          },
        });
      });

    graphPart.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(axisBottom(xScale).tickSize(0).tickPadding(6))
      .attr('font-family', 'xkcd')
      .attr('font-size', '16');

    graphPart.append('g')
      .call(axisLeft(yScale).tickSize(0).tickPadding(10).ticks(6))
      .attr('font-family', 'xkcd')
      .attr('font-size', '16');

    selectAll('.domain')
      .attr('filter', 'url(#xkcdify)');
  }

  // TODO: update chart
  update() {

  }
}

export default Bar;
