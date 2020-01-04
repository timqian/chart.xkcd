// import chartXkcd from 'chart.xkcd';
// import chartXkcd from '../../dist/chart.xkcd';
import chartXkcd from '../src';

const svg = document.querySelector('.bar-chart');

new chartXkcd.Bar(svg, {
  title: 'Github stars VS patron number',
  xLabel: 'Month',
  yLabel: 'Count',
  data: {
    labels: ['github stars', 'patrons'],
    datasets: [{
      data: [100, 2],
    }],
  },
  // options: {
  //   yTickCount: 2,
  //   // unxkcdify: true,
  //   // strokeColor: 'white',
  //   // backgroundColor: 'black',
  // },
});

const svgStackedBar = document.querySelector('.stacked-bar-chart');
new chartXkcd.StackedBar(svgStackedBar, {
  title: 'Issues and PR Submissions',
  xLabel: 'Month',
  yLabel: 'Count',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
    datasets: [{
      label: 'Issues',
      data: [12, 19, 11, 29, 17],
    }, {
      label: 'PRs',
      data: [3, 5, 2, 4, 1],
    }, {
      label: 'Merges',
      data: [2, 3, 0, 1, 1],
    }],
  },
  // options: {
  // showLegend: true,
  //   yTickCount: 2,
  //   // unxkcdify: true,
  //   // strokeColor: 'white',
  //   // backgroundColor: 'black',
  // },
});

const svgPie = document.querySelector('.pie-chart');
new chartXkcd.Pie(svgPie, {
  title: 'What Tim is made of',
  data: {
    labels: ['a', 'b', 'e', 'f', 'g'],
    datasets: [{
      data: [500, 200, 80, 90, 100],
    }],
  },
  options: {
    innerRadius: 0.6,
    legendPosition: chartXkcd.config.positionType.upRight,
    // showLegend: true,
    // unxkcdify: true,
    // strokeColor: 'white',
    // backgroundColor: 'black',
  },
});

const svgLine = document.querySelector('.line-chart');
new chartXkcd.Line(svgLine, {
  title: 'Monthly income of an indie developer',
  xLabel: 'Month',
  yLabel: '$ Dollars',
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
    // unxkcdify: true,
    // strokeColor: 'black',
    // backgroundColor: 'white',
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
      data: [{ x: 3, y: 10 }, { x: 4, y: 122 }, { x: 10, y: 180 }, { x: 1, y: 2 }, { x: 2, y: 4 }],
    }, {
      label: 'wewean',
      data: [{ x: 3, y: 122 }, { x: 4, y: 212 }, { x: -3, y: 100 }, { x: 1, y: 1 }, { x: 1.5, y: 12 }],
    }],
  },
  options: {
    xTickCount: 5,
    yTickCount: 5,
    legendPosition: chartXkcd.config.positionType.downRight,
    showLine: false,
    // showLegend: true,
    // unxkcdify: true,
    // strokeColor: 'blue',
    // backgroundColor: 'black',

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
    // unxkcdify: true,
    // strokeColor: 'white',
    // backgroundColor: 'black',
  },
});

const svgRadar = document.querySelector('.radar-chart');
new chartXkcd.Radar(svgRadar, {
  title: 'Radar',
  data: {
    labels: ['c', 'h', 'a', 'r', 't'],
    datasets: [{
      label: 'ccharrrt',
      data: [2, 1, 1, 3, 1],
    }, {
      label: 'chhaart',
      data: [1, 2, 2, 1, 1],
    }],
  },
  options: {
    showLegend: true,
    dotSize: 0.8,
    showLabels: true,
    legendPosition: chartXkcd.config.positionType.upRight,
    // unxkcdify: true,
    // strokeColor: 'white',
    // backgroundColor: 'black',
  },
});

const svgLineCus = document.querySelector('.line-chart-cus');
new chartXkcd.Line(svgLineCus, {
  title: 'Customize Font & colors (定制外观)',
  xLabel: 'this is x label',
  yLabel: 'y label',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'font',
      data: [30, 70, 200, 300, 500, 800, 100, 290, 500, 300],
    }, {
      label: 'color',
      data: [0, 1, 30, 70, 80, 100, 500, 80, 40, 250],
    }],
  },
  options: {
    fontFamily: 'ZCOOL KuaiLe',
    dataColors: ['black', '#aaa'],
    legendPosition: chartXkcd.config.positionType.upRight,
    // strokeColor: 'white',
    // backgroundColor: 'black',
  },
});


const svgLineUnxkcdify = document.querySelector('.line-chart-unxkcdify');
new chartXkcd.Line(svgLineUnxkcdify, {
  title: 'Unxkcdify',
  xLabel: 'this is x label',
  yLabel: 'y label',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'font',
      data: [30, 70, 200, 300, 500, 800, 100, 290, 500, 300],
    }, {
      label: 'color',
      data: [0, 1, 30, 70, 80, 100, 500, 80, 40, 250],
    }],
  },
  options: {
    unxkcdify: true,
    // strokeColor: 'white',
    // backgroundColor: 'black',
  },
});

const svgDark = document.querySelector('.line-chart-dark');
new chartXkcd.XY(svgDark, {
  title: 'stars',
  xLabel: 'wo',
  yLabel: 'Stars count',
  data: {
    datasets: [{
      label: 'timqian',
      data: [{ x: 3, y: 10 }, { x: 4, y: 122 }, { x: 10, y: 180 }, { x: 1, y: 2 }, { x: 2, y: 4 }],
    }, {
      label: 'wewean',
      data: [{ x: 3, y: 122 }, { x: 4, y: 212 }, { x: -3, y: 100 }, { x: 1, y: 1 }, { x: 1.5, y: 12 }],
    }],
  },
  options: {
    xTickCount: 5,
    yTickCount: 5,
    legendPosition: chartXkcd.config.positionType.downRight,
    showLine: false,
    // unxkcdify: true,
    strokeColor: 'white',
    backgroundColor: 'black',

  },
});
