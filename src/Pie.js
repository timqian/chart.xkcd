import select from 'd3-selection/src/select';
import mouse from 'd3-selection/src/mouse';
import pie from 'd3-shape/src/pie';
import arc from 'd3-shape/src/arc';
import Tooltip from './components/Tooltip';
import Legend from './components/Legend';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';

let margin = 50; 

class Pie {
  constructor(svg, {title, data: { labels, datasets } }) {
    this.title = title;
    this.data = {
      labels,
      datasets
    }
    this.svgEl = select(svg).style("stroke-width", '3')
      .attr('width', svg.parentElement.clientWidth)
      .attr('height', Math.min(svg.parentElement.clientWidth * 2 / 3, window.innerHeight));
    this.width = this.svgEl.attr('width'),
    this.height = this.svgEl.attr('height');

    this.chart = this.svgEl.append('g')
      .attr("transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")")

    this.tooltip = new Tooltip({
      parent: this.svgEl,
      title: 'tooltip',
      items: [{color: 'red', text: 'weweyang: 12'},{color: 'blue', text: 'timqian: 13'}],
      position: {x:30, y:30, type: Tooltip.positionType.upRight}
    });
  
    addFont(this.svgEl);
    addFilter(this.svgEl);
    this.render();
  }

  render() {
    if (this.title) this.svgEl
      .append('text')
      .attr("font-family", 'xkcd')
      .attr("font-size", '20')
      .attr('font-weight', 'bold')
      .attr('x', '50%')
      .attr('y', 30)
      .attr("text-anchor","middle")
      .text(this.title)
  
    const radius = Math.min(this.width, this.height) / 2 - margin;

    const thePie = pie()

    const dataReady = thePie(this.data.datasets[0].data);

    const theArc = arc()
      .innerRadius(radius/2)
      .outerRadius(radius);

    this.chart.selectAll('.xkcd-chart-arc')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('class', '.xkcd-chart-arc')
      .attr('d', theArc)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', (d, i) => colors[0][i]) 
      .attr("filter", "url(#xkcdify-pie)")
      // .attr("fill-opacity", 0.6)
      .on('mouseover', (d, i, nodes) => {
        select(nodes[i]).attr('fill-opacity', 0.6);
        this.tooltip.show();
      })
      .on('mouseout', (d, i, nodes) => {
        select(nodes[i]).attr("fill-opacity", 1);
        this.tooltip.hide();
      })
      .on('mousemove', (d, i, nodes) => {
        const tipX = mouse(nodes[i])[0] + (this.width / 2) + 10;
        const tipY = mouse(nodes[i])[1] + (this.height / 2) + 10;

        this.tooltip.update({
          title: this.data.labels[i], 
          items: [{
            color: colors[0][i],
            text: `${this.data.datasets[0].label || ''}: ${d.data}`
          }], 
          position: {
            x: tipX,
            y: tipY,
            type: Tooltip.positionType.downRight,
          }
        });
      })


    new Legend({
      parent: this.svgEl,
      items: this.data.datasets[0].data.map((data, i) => ({color: colors[0][i], text: this.data.labels[i]})), 
      position: {x:this.width - 3, y:3, type: Legend.positionType.downLeft}
    });
  
  }

  // TODO: update chart
  update() {

  }
}

export default Pie;