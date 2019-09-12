---
title: Line chart
---

Line chart displays series of data points in the form of lines. It can be used to show trend data, or comparison of different data sets.

<p class="codepen" data-height="424" data-theme-id="light" data-default-tab="result" data-user="timqian" data-slug-hash="GRKqLaL" style="height: 424px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="chart.xkcd example">
  <span>See the Pen <a href="https://codepen.io/timqian/pen/GRKqLaL/">
  chart.xkcd example</a> by timqian (<a href="https://codepen.io/timqian">@timqian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## JS part

```js
const lineChart = new chartXkcd.Line(svg, {
  title: 'Monthly income of an indie developer', // optional
  xLabel: 'Month', // optional
  yLabel: '$ Dollors', // optional
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
  options: { // optional
    yTickCount: 3,
    legendPosition: chartXkcd.config.positionType.upLeft
  }
})
```

## Customize chart by defining options

- `yTickCount`: customize tick numbers you want to see on the y axis (default `3`)
- `legendPosition`: specify where you want to place the legend. (default `chartXkcd.config.positionType.upLeft`)
  Possible values:
    - up left: `chartXkcd.config.positionType.upLeft`
    - up right: `chartXkcd.config.positionType.upRight`
    - bottom left: `chartXkcd.config.positionType.downLeft`
    - bottom right: `chartXkcd.config.positionType.downRight`
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
- `unxkcdify`: disable xkcd effect (default `false`)
