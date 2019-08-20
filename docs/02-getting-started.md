---
title: Getting started
---

It's easy to get started with chart.xkcd. All that's required is the script included in your page along with a single `<svg>` node to render the chart.

In the following example we create a line chart.

```html
<svg class="line-chart"></svg>
<script src="https://cdn.jsdelivr.net/npm/chart.xkcd@1/dist/chart.xkcd.min.js"></script>
<script>
  const svg = document.querySelector('.line-chart')

  new chartXkcd.Line(svg, {
    title: 'Monthly income of an indie developer',
    xLabel: 'Month',
    yLabel: '$ Dollors',
    data: {
      labels:['1', '2', '3', '4', '5', '6','7', '8', '9', '10'],
      datasets: [{
        label: 'Plan',
        data: [30, 70, 200, 300, 500 ,800, 1500, 2900, 5000, 8000],
      }, {
        label: 'Reality',
        data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150],
      }]
    },
  });
</script>
```

**Result**

<p class="codepen" data-height="424" data-theme-id="light" data-default-tab="result" data-user="timqian" data-slug-hash="GRKqLaL" style="height: 424px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="chart.xkcd example">
  <span>See the Pen <a href="https://codepen.io/timqian/pen/GRKqLaL/">
  chart.xkcd example</a> by timqian (<a href="https://codepen.io/timqian">@timqian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>