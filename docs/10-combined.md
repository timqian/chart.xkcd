---
title: Combined chart
---

A combined chart displays bar datasets and line datasets in the same chart. It is useful when related series share the same labels and y axis but need different visual treatments.

## JS part

```js
const combinedChart = new chartXkcd.Combined(svg, {
  title: 'Monthly visitors and signups', // optional
  xLabel: 'Month', // optional
  yLabel: 'Count', // optional
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Visitors',
      type: 'bar',
      data: [120, 180, 150, 220, 260, 310],
    }, {
      label: 'Signups',
      type: 'line',
      data: [15, 20, 18, 32, 44, 56],
    }],
  },
  options: { // optional
    yTickCount: 3,
    legendPosition: chartXkcd.config.positionType.upLeft
  }
});
```

Datasets with `type: 'bar'` render as bars. Datasets with `type: 'line'` render as lines.

## Customize chart by defining options

- `yTickCount`: customize tick numbers you want to see on the y axis (default `3`)
- `showLegend`: display legend near chart (default `true`)
- `legendPosition`: specify where you want to place the legend. (default `chartXkcd.config.positionType.upLeft`)
  Possible values:
    - up left: `chartXkcd.config.positionType.upLeft`
    - up right: `chartXkcd.config.positionType.upRight`
    - bottom left: `chartXkcd.config.positionType.downLeft`
    - bottom right: `chartXkcd.config.positionType.downRight`
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
- `unxkcdify`: disable xkcd effect (default `false`)
- `strokeColor`: stroke colors (default `black`)
- `backgroundColor`: color for BG (default `white`)
