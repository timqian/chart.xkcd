---
title: Pie/Doughnut chart
---

<p class="codepen" data-height="470" data-theme-id="light" data-default-tab="result" data-user="timqian" data-slug-hash="VwZjOPR" style="height: 470px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="chart.xkcd pie">
  <span>See the Pen <a href="https://codepen.io/timqian/pen/VwZjOPR/">
  chart.xkcd pie</a> by timqian (<a href="https://codepen.io/timqian">@timqian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## JS part

```js
const pieChart = new chartXkcd.Pie(svg, {
  title: 'What Tim made of', // optional
  data: {
    labels: ['a', 'b', 'e', 'f', 'g'],
    datasets: [{
      data: [500, 200, 80, 90, 100],
    }],
  },
  options: { // optional
    innerRadius: 0.5,
    legendPosition: chartXkcd.config.positionType.upRight,
  },
});
```

## Customize chart by defining options

- `innerRadius`: specify empty pie chart radius (default: `0.5`)
  - Want a pie chart? set `innerRadius` to `0`
- `legendPosition`: specify where you want to place the legend. (default `chartXkcd.config.positionType.upLeft`)
  Possible values:
    - up left: `chart.Xkcd.positionType.upLeft`
    - up right: `chart.Xkcd.positionType.upLeft
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
- `unxkcdify`: disable xkcd effect for serious people (default `false`)
