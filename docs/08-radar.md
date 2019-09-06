---
title: Radar chart
---

## JS part

```js
const radar = new chartXkcd.Radar(svg, {
  title: 'Letters in random words', // optional
  data: {
    labels: ['c', 'h', 'a', 'r', 't'],
    datasets: [{
      label: 'ccharrrt', // optional
      data: [2, 1, 1, 3, 1],
    }, {
      label: 'chhaart', // optional
      data: [1, 2, 2, 1, 1],
    }],
  },
  options: { // optional
    showLegend: true,
    dotSize: .8,
    showLabels: true,
    legendPosition: chartXkcd.config.positionType.upRight,
  },
});
```

## Customize chart by defining options

- `showLabels`: display labels near every line (default `false`)
- `ticksCount`: customize tick numbers you want to see on the main line (default `3`)
- `dotSize`: you can change size of the dots if you want (default `1`)
- `showLegend`: display legend near chart (default `false`)
- `legendPosition`: specify where you want to place the legend. (default `chartXkcd.config.positionType.upLeft`)
  Possible values:
    - up left: `chart.Xkcd.positionType.upLeft`
    - up right: `chart.Xkcd.positionType.upRight`
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
