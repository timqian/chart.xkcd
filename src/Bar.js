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
      strokeColorTitle: 'grey',
      backgroundColor: 'white',
      isShorterLabelActive: false,
      charNum: 5,
      shorterLabels: [],
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
    datasets
  };

  this.XdataLongLabels = this.data.labels; 
 

  if (this.options.isShorterLabelActive) {

this.options.shorterLabels = getShorterLabels(this.data.labels,this.options.charNum);
this.data.labels = this.options.shorterLabels ;
console.log(this.options.shorterLabels)
 }

  function getShorterLabels(labels , charNumber) {
    var shorterLabels = [] ;
    labels.forEach(element => {

      (element.length > charNumber) ?
      element = element.slice(0,charNumber) + '...' : element ;
      shorterLabels.push(element) ;
    });
    return shorterLabels ;
  }

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
    if (this.title) addLabels.title(this.svgEl, this.title, this.options.strokeColorTitle);
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

      // const yScale = scaleLinear()
      // .domain([0, Math.max(...allData)])
      // .range([this.height, 0]);

    const yScale = getYScale(this.height, Math.min(...allData), Math.max(...allData))

    function getYScale(height,min,max){
      if (min < 0 && max > 0 ) 
      {
          return scaleLinear()
          .domain([min,max])
          .range([height, 0]);
      } 
      else if ( max < 0)
      {
        return scaleLinear()
        .domain([min, 0])
        .range([height, 0]) ;
      }
      else{
        return scaleLinear()
        .domain([0, max])
        .range([height, 0]) ;
      }
    }

    const graphPart = this.chart.append('g');

    // axis

 function getXlabelsMoveDownValue(height){
  const max = Math.max(...allData);
  const min = Math.min(...allData);
  if (min < 0 && max > 0) 
  {
    return getRectHeight(min,height) ;
  }
  else if ( max < 0) {
 return -25 ;
  }
  else {
return 0;
  }
 }
      addAxis.xAxis(graphPart, {
        moveLabelsDown:  getXlabelsMoveDownValue(this.height),
        tickPaddingValue:6,
        xScale,
        tickCount: 6,
        moveDown: getValueXaxisMove(this.height),   
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


   function getValueXaxisMove(height){
    const max = Math.max(...allData);
    const min = Math.min(...allData);
    const valueMinNeg = Math.abs(min*height)/Math.abs(max-min);
   if (min < 0 && max > 0) {
     return (height - valueMinNeg) ;
   } else if ( max < 0){
   return 0 ;
   }
   else {
    return height ;}
   }

    function getRectY(height,d){

      const max = Math.max(...allData);
      const min = Math.min(...allData);
      const valueMinNeg = Math.abs(min*height)/Math.abs(max-min);
      const valueMaxNeg = Math.abs(max*height)/Math.abs(max-min);
      
     if (min < 0 && max > 0) {
          if (d>0) {
          return height  - yScale(max-d)  - valueMinNeg ;
          }
          else {
            return (height - valueMinNeg) ;
          }
     } 
     else if ( max < 0)
     {
     return 0 ;
     }
     else {return yScale(d) ;}
     }


    function getRectHeight(d,height){
  
      const max = Math.max(...allData);
      const min = Math.min(...allData);

      if ((min < 0 && max > 0)) {

        if (d>0) {
          return height*d/(max-min) ;
        } else 
        {
          return (yScale(d)-getRectY(height,d)) ;
        }
      } 
      else if ( max < 0)
      {
      return (yScale(d)) ;
      }
      else 
      {return height - yScale(d) ;}
      }


    // Bars
    graphPart.selectAll('.xkcd-chart-bar')
      .data(this.data.datasets[0].data)
      .enter()
      .append('rect')
      .attr('class', 'xkcd-chart-bar')
      .attr('x', (d, i) => xScale(this.data.labels[i]))
      .attr('width', xScale.bandwidth())
      // .attr('y', (d) => yScale(d))   
      // .attr('height', (d) => this.height - yScale(d))
      .attr('y', (d) => getRectY(this.height,d)  )          ///////////////////////
      .attr('height', (d) => getRectHeight(d,this.height) ) ////////////////
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
        // title: this.data.labels[i],
          title: this.XdataLongLabels[i],
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
