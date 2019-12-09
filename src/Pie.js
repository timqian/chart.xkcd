import select from 'd3-selection/src/select';
import mouse from 'd3-selection/src/mouse';
import pie from 'd3-shape/src/pie';
import arc from 'd3-shape/src/arc';
import Tooltip from './components/Tooltip';
import addLegend from './utils/addLegend';
import addLabels from './utils/addLabels';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';
import config from './config';

const margin = 50;

class Pie {
  constructor(svg, {
    title, data: { labels, datasets }, options,
  }) {
    this.options = {
      unxkcdify: false,
      innerRadius: 0.5,
      legendPosition: config.positionType.upLeft,
      dataColors: colors,
      fontFamily: 'xkcd',
      strokeColor: 'black',
      backgroundColor: 'white',
      ...options,
    };
    this.title = title;
    this.data = {
      labels,
      datasets,
    };
    this.filter = 'url(#xkcdify-pie)';
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

    this.width = this.svgEl.attr('width');
    this.height = this.svgEl.attr('height');

    this.chart = this.svgEl.append('g')
      .attr('transform',
        `translate(${this.width / 2},${this.height / 2})`);


    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) {
      addLabels.title(this.svgEl, this.title, this.options.strokeColor);
    }

    const tooltip = new Tooltip({
      parent: this.svgEl,
      title: 'tooltip',
      items: [{ color: 'red', text: 'weweyang: 12' }, { color: 'blue', text: 'timqian: 13' }],
      position: { x: 30, y: 30, type: config.positionType.upRight },
      unxkcdify: this.options.unxkcdify,
      strokeColor: this.options.strokeColor,
      backgroundColor: this.options.backgroundColor,
    });

    const radius = Math.min(this.width, this.height) / 2 - margin;

    const thePie = pie();

    const dataReady = thePie(this.data.datasets[0].data);

    const theArc = arc()
      .innerRadius(radius
        * (this.options.innerRadius === undefined ? 0.5 : this.options.innerRadius))
      .outerRadius(radius);

    this.chart.selectAll('.xkcd-chart-arc')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('class', '.xkcd-chart-arc')
      .attr('d', theArc)
      .attr('fill', 'none')
      .attr('stroke', this.options.strokeColor)
      .attr('stroke-width', 2)
      .attr('fill', (d, i) => this.options.dataColors[i])
      .attr('filter', this.filter)
      // .attr("fill-opacity", 0.6)
      .on('mouseover', (d, i, nodes) => {
        select(nodes[i]).attr('fill-opacity', 0.6);
        tooltip.show();
      })
      .on('mouseout', (d, i, nodes) => {
        select(nodes[i]).attr('fill-opacity', 1);
        tooltip.hide();
      })
      .on('mousemove', (d, i, nodes) => {
        const tipX = mouse(nodes[i])[0] + (this.width / 2) + 10;
        const tipY = mouse(nodes[i])[1] + (this.height / 2) + 10;

        tooltip.update({
          title: this.data.labels[i],
          items: [{
            color: this.options.dataColors[i],
            text: `${this.data.datasets[0].label || ''}: ${d.data}`,
          }],
          position: {
            x: tipX,
            y: tipY,
            type: config.positionType.downRight,
          },
        });
      });

    // Legend
    const legendItems = this.data.datasets[0].data
      .map((data, i) => ({ color: this.options.dataColors[i], text: this.data.labels[i] }));

    // move legend down to prevent overlaping with title
    const legendG = this.svgEl.append('g')
      .attr('transform', 'translate(0, 30)');

    addLegend(legendG, {
      items: legendItems,
      position: this.options.legendPosition,
      unxkcdify: this.options.unxkcdify,
      parentWidth: this.width,
      parentHeight: this.height,
      strokeColor: this.options.strokeColor,
      backgroundColor: this.options.backgroundColor,
    });
  }

  // TODO: update chart
  update() {
  }
}

export default Pie;
