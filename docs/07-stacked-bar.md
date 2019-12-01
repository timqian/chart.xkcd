---
title: Stacked bar chart
---

A stacked bar chart provides a way of showing data values represented as vertical bars

<p class="codepen" data-height="429" data-theme-id="default" data-default-tab="result" data-user="timqian" data-slug-hash="KKwPrEm" style="height: 429px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="chart.xkcd stacked bar">
  <span>See the Pen <a href="https://codepen.io/timqian/pen/KKwPrEm">
  chart.xkcd stacked bar</a> by timqian (<a href="https://codepen.io/timqian">@timqian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## JS part

```js
new chartXkcd.StackedBar(svg, {
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
});
```

## Customize chart by defining options

- `yTickCount`: customize tick numbers you want to see on the y axis
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
- `unxkcdify`: disable xkcd effect (default `false`)
- `strokeColor`: stroke colors (default `black`)
- `backgroundColor`: color for BG (default `white`)
- `legendPosition`: specify where you want to place the legend (default `chartXkcd.config.positionType.upLeft`)
  Possible values:
    - up left: `chartXkcd.config.positionType.upLeft`
    - up right: `chartXkcd.config.positionType.upLeft`
    - bottom left: `chartXkcd.config.positionType.downLeft`
    - bottom right: `chartXkcd.config.positionType.downRight`