// import chartXkcd from 'chart.xkcd';
// import chartXkcd from '../../dist/chart.xkcd';
import chartXkcd from '../../src';

const svg = document.querySelector('.bar-chart');

new chartXkcd.Bar(svg, {
  title: 'Monthly income of an indie developer',
  xLabel: 'Month',
  yLabel: '$ Dollors',
  data: {
    labels: ['github stars', 'patrons'],
    datasets: [{
      data: [100, 2],
    }],
  },
  options: {
    yTickCount: 2,
  },
});

const svgPie = document.querySelector('.pie-chart');
new chartXkcd.Pie(svgPie, {
  title: 'What Tim made of',
  data: {
    labels: ['a', 'b', 'e', 'f', 'g'],
    datasets: [{
      data: [500, 200, 80, 90, 100],
    }],
  },
  options: {
    innerRadius: 0,
    legendPosition: chartXkcd.config.positionType.upRight,
  },
});

const svgLine = document.querySelector('.line-chart');
new chartXkcd.Line(svgLine, {
  title: 'Monthly income of an indie developer',
  xLabel: 'Month',
  yLabel: '$ Dollors',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'Plan',
      data: [30, 70, 200, 300, 500, 800, 1500, 2900, 5000, 8000],
    }, {
      label: 'Reality',
      data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150],
    }],
  },
  options: {

  },
});

const svgXY = document.querySelector('.xyline-chart');
new chartXkcd.XY(svgXY, {
  title: 'stars',
  xLabel: 'wo',
  yLabel: 'Stars count',
  data: {
    datasets: [{
      label: 'timqian',
      data: [{ x: 3, y: 10 }, { x: 4, y: 122 }, { x: 10, y: 100 }, { x: 1, y: 2 }, { x: 2, y: 4 }],
    }, {
      label: 'wewean',
      data: [{ x: 3, y: 122 }, { x: 4, y: 212 }, { x: -3, y: 100 }, { x: 1, y: 1 }, { x: 1.5, y: 12 }],
    }],
  },
  options: {
    xTickCount: 5,
    yTickCount: 5,
    legendPosition: chartXkcd.config.positionType.upRight,
    showLine: false,
  },
});

const svgXY2 = document.querySelector('.xyline-chart2');
new chartXkcd.XY(svgXY2, {
  title: 'Github star history',
  xLabel: 'Month',
  yLabel: 'Stars abc',
  data: {
    datasets: [{
      label: 'timqian/chart.xkcd',
      data: [{ x: '2015-03-01', y: 0 }, { x: '2015-04-01', y: 2 }, { x: '2015-05-01', y: 4 }, { x: '2015-06-01', y: 10 }, { x: '2015-07-01', y: 122 }],
    }, {
      label: 'timqian/star-history',
      data: [{ x: '2015-01-01', y: 0 }, { x: '2015-03-01', y: 1 }, { x: '2015-04-01', y: 12 }, { x: '2015-05-01', y: 122 }, { x: '2015-06-01', y: 212 }],
    }],
  },
  options: {
    xTickCount: 3,
    yTickCount: 4,
    legendPosition: chartXkcd.config.positionType.upLeft,
    showLine: true,
    timeFormat: 'MM/DD/YYYY',
    dotSize: 0.5,
  },
});
