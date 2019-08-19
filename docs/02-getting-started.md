---
title: Getting started
---

It's easy to get started with chart.xkcd. All that's required is the script included in your page along with a single `<svg>` node to render the chart.

In the following example we create a bar chart and render that in our page.

```html
<svg class="bar-chart" width="600" height="400" ></svg>
<script src="../dist/chart.xkcd.js"></script>
<script>
  const svg = document.querySelector('.bar-chart')

  new chartXkcd.Bar(svg, {
    data: {
      labels:['github stars', 'patrons'],
      datasets: [{
        data: [100, 2],
      }]
    },
  });
</script>
```

**Result**

<svg class="line-chart" ></svg>
<script src="../dist/chart.xkcd.js"></script>
<script src="../docs/gettingStarted.js"></script>
