const svgLine = document.querySelector('.line-chart');
new chartXkcd.Line(svgLine, {
  // title: 'Monthly income of an indie developer',
  // xLabel: 'Month',
  // yLabel: '$ Dollors',
  data: {
    labels:['1', '2', '3', '4', '5', '6','7', '8', '9', '10'], 
    datasets: [{
      label: 'Plan',
      data: [30, 70, 200, 300, 500 ,800, 1500, 2900, 5000, 8000],
    }, {
      label: 'Reality',
      data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150],
    // // }, {
    // //   label: 'vivi',
    // //   data: [5, 12, 20, 7, 10,  35,15, 9, 20, 9, 10, 6],
    // }, {
      // label: 'weweyang',
      // data: [10, 20, 7, 12,  10, 15, 9, 20, 35, 9, 6, 17],
    }]
  },
})