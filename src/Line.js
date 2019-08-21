import line from 'd3-shape/src/line'
import { monotoneX } from 'd3-shape/src/curve/monotone'
import select from 'd3-selection/src/select';
import selectAll from 'd3-selection/src/selectAll';
import mouse from 'd3-selection/src/mouse';
import { point as scalePoint } from 'd3-scale/src/band';
import scaleLinear from 'd3-scale/src/linear';
import {axisBottom, axisLeft } from 'd3-axis/src/axis';

import Tooltip from './components/Tooltip';
import Legend from './components/Legend';
import addFont from './utils/addFont';
import addFilter from './utils/addFilter';
import colors from './utils/colors';

const margin = {top: 50, right: 30, bottom: 50, left: 50};

class Line {
  constructor(svg, { title, xLabel, yLabel, data: { labels, datasets } }) {
    if(title) {
      this.title = title;
      margin.top = 60
    }
    if(xLabel) {
      this.xLabel = xLabel;
      margin.bottom = 50;
    }
    if (yLabel) {
      this.yLabel = yLabel;
      margin.left = 80;
    }
    this.data = {
      labels,
      datasets
    }
    this.svgEl = select(svg).style("stroke-width", '3')
    .attr('width', svg.parentElement.clientWidth)
    .attr('height', Math.min(svg.parentElement.clientWidth * 2 / 3, window.innerHeight)); 

    this.chart = this.svgEl.append('g')
      .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");
    this.width = this.svgEl.attr('width') - margin.left - margin.right,
    this.height = this.svgEl.attr('height') - margin.top - margin.bottom;
    this.tooltip = new Tooltip({
      parent: this.svgEl,
      title: '', 
      items: [{color: 'red', text: 'weweyang'},{color: 'blue', text: 'timqian'}], 
      position: {x:60, y:60, type: Tooltip.positionType.dowfnRight}
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
    
    if (this.xLabel) this.svgEl
      .append('text')
      .attr("font-family", 'xkcd')
      .attr("font-size", 17)
      // .attr('font-weight', 'bold')
      .attr('x', '50%')
      .attr('y', this.svgEl.attr('height') - 10)
      .attr("text-anchor","middle")
      .text(this.xLabel)

    if (this.yLabel) this.svgEl.append("text")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("x",0 - (this.height / 2))
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .attr("font-family", 'xkcd')
      .attr("font-size", 17)
      .text(this.yLabel);

    const xScale = scalePoint()
      .range([0, this.width])
      .domain(this.data.labels);

    const allData = this.data.datasets
      .reduce((pre, cur) => pre.concat(cur.data), []);

    const yScale = scaleLinear()
      .domain([Math.min(...allData), Math.max(...allData)])
      .range([this.height, 0]);

    const graphPart = this.chart.append('g')
      // .attr("filter", "url(#xkcdify)")
      .attr('pointer-events', 'all')

    // axis
    graphPart.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(
        axisBottom(xScale)
          .tickSize(0)
          .tickPadding(6)
      )
      .attr('font-family', 'xkcd')
      .attr('font-size', '16')
      
    graphPart.append('g')
      .call(axisLeft(yScale).tickSize(0).tickPadding(10).ticks(3))
      .attr('font-family', 'xkcd')
      .attr('font-size', '16')
      
    selectAll('.domain')
      .attr("filter", "url(#xkcdify)")

    const theLine = line()
      .x((d, i) => xScale(this.data.labels[i]))
      .y(d => yScale(d))
      .curve(monotoneX)

    graphPart.selectAll('.xkcd-chart-line')
      .data(this.data.datasets)
      .enter()
      .append('path')
      .attr('class', 'xkcd-chart-line')
      .attr("d", d => theLine(d.data))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => colors[0][i])
      .attr("filter", "url(#xkcdify)")

    // hover effect
    const verticalLine = graphPart.append('line')
      .attr('x1', 30)
      .attr('y1', 0)
      .attr('x2', 30)
      .attr('y2', this.height)
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '7,7')
      .style("visibility", "hidden")

    const circles = this.data.datasets.map((dataset, i) => 
      graphPart
        .append("circle")
        .style("stroke", colors[0][i])
        .style("fill", colors[0][i])
        .attr("r", 3.5)
        .style("visibility", "hidden")
    );

    const hoverRect = graphPart.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
      // .attr('stroke', 'black')
      .on('mouseover', () => {
        circles.forEach(circle => circle.style('visibility', 'visible'));
        verticalLine.style('visibility', 'visible')
        this.tooltip.show();
      })
      .on('mouseout', () => {
        circles.forEach(circle => circle.style('visibility', 'hidden'));
        verticalLine.style('visibility', 'hidden')
        this.tooltip.hide();
      })
      .on('mousemove', (d, i, nodes) => {
        const tipX = mouse(nodes[i])[0] + margin.left + 10;
        const tipY = mouse(nodes[i])[1] + margin.top + 10;

        const labelXs = this.data.labels.map(label => xScale(label) + margin.left);
        const mouseLableDistances = labelXs.map(labelX => Math.abs(labelX - mouse(nodes[i])[0] - margin.left));
        const mostNearLabelIndex = mouseLableDistances.indexOf(Math.min(...mouseLableDistances))
   
        verticalLine
          .attr('x1', xScale(this.data.labels[mostNearLabelIndex]))
          .attr('x2', xScale(this.data.labels[mostNearLabelIndex]))

        this.data.datasets.forEach((dataset, i) => {
          circles[i]
            .style('visibility', 'visible')
            .attr('cx', xScale(this.data.labels[mostNearLabelIndex]))
            .attr('cy', yScale(dataset.data[mostNearLabelIndex]))
        });

        const tooltipItems = this.data.datasets.map((dataset, i) => ({
          color: colors[0][i],
          text: `${this.data.datasets[i].label || '' }: ${this.data.datasets[i].data[mostNearLabelIndex]}`
        }));
        
        let tooltipPositionType = Tooltip.positionType.downRight;
        if (tipX > this.width / 2 && tipY < this.height / 2) {
          tooltipPositionType = Tooltip.positionType.downLeft;
        } else if (tipX > this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = Tooltip.positionType.upLeft;
        } else if (tipX < this.width / 2 && tipY > this.height / 2) {
          tooltipPositionType = Tooltip.positionType.upRight;
        }

        this.tooltip.update({
          title: this.data.labels[mostNearLabelIndex], 
          items: tooltipItems,
          position: {
            x: tipX,
            y: tipY,
            type: tooltipPositionType,
          }
        });
      })

    new Legend({
      parent: graphPart, 
      items: this.data.datasets.map((dataset, i) => ({color: colors[0][i], text: dataset.label})), 
      position: {x:3, y:3, type: Tooltip.positionType.downRight}
    });
  
    }


  // TODO: update chart
  update() {

  }
}

export default Line;
