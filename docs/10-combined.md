---
title: Combined chart
---

A combined chart overlays line datasets on top of bar datasets. Use `type: 'line'`
on datasets that should be rendered as a line; datasets without a `type` render as
bars.

```js
const svg = document.querySelector('.combined-chart')

new chartXkcd.Combined(svg, {
  title: 'Coffee sales and ratings',
  xLabel: 'Month',
  yLabel: 'Cups',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Cups sold',
      data: [30, 52, 47, 61, 75],
    }, {
      label: 'Rating',
      type: 'line',
      data: [22, 30, 42, 52, 60],
    }],
  },
  options: {
    dataColors: ['#f4a261', '#2a9d8f'],
    legendPosition: chartXkcd.config.positionType.upLeft,
  },
})
```

## Customize combined chart by defining options

- `yTickCount`: customize tick numbers you want to see on the y axis
- `dataColors`: array of colors for different datasets
- `showLegend`: show legend
- `legendPosition`: specify where you want to put the legend
