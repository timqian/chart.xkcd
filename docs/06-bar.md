---
title: Bar chart
---

A bar chart provides a way of showing data values represented as vertical bars

<p class="codepen" data-height="509" data-theme-id="light" data-default-tab="result" data-user="timqian" data-slug-hash="QWLERdG" style="height: 509px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="chart.xkcd bar">
  <span>See the Pen <a href="https://codepen.io/timqian/pen/QWLERdG/">
  chart.xkcd bar</a> by timqian (<a href="https://codepen.io/timqian">@timqian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## JS part

```js
const barChart = new chartXkcd.Bar(svg, {
  title: 'github stars VS patron number', // optional
  // xLabel: '', // optional
  // yLabel: '', // optional
  data: {
    labels: ['github stars', 'patrons'],
    datasets: [{
      data: [100, 2],
    }],
  },
  options: { // optional
    yTickCount: 2,
  },
});
```

## Customize chart by defining options

- `yTickCount`: customize tick numbers you want to see on the y axis
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
- `disableEffect`: disable xkcd effect for serious people (default `false`)
