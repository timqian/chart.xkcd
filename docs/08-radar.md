---
title: Radar chart
---

<p class="codepen" data-height="434" data-theme-id="light" data-default-tab="result" data-user="timqian" data-slug-hash="VwZQBoj" style="height: 434px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="chart.xkcd radar">
  <span>See the Pen <a href="https://codepen.io/timqian/pen/VwZQBoj/">
  chart.xkcd radar</a> by timqian (<a href="https://codepen.io/timqian">@timqian</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

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
    - up left: `chartXkcd.config.positionType.upLeft`
    - up right: `chartXkcd.config.positionType.upRight`
    - bottom left: `chartXkcd.config.positionType.downLeft`
    - bottom right: `chartXkcd.config.positionType.downRight`
- `dataColors`: array of colors for different datasets
- `fontFamily`: customize font family used in the chart
- `unxkcdify`: disable xkcd effect (default `false`)
- `strokeColor`: stroke colors (default `black`)
- `backgroundColor`: color for BG (default `white`)