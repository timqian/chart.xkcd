![](https://raw.githubusercontent.com/timqian/images/master/20190817164203.png)

# chart.xkcd

xkcd styled chart lib

## Quick start

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

## Install

Install via npm

```bash
npm i chart.xkcd
```

Or using script tag

```html
<script src="path/to/chartjs/dist/Chart.js"></script>
<script>
    var myChart = new chartXkcd.Bar(svg, {...});
</script>
```

## Document

