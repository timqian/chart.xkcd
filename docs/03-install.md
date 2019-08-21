---
title: Installation
---

You can install chart.xkcd via npm or download the latest version on GitHub.

**Via Script Tag**

```js
<script src="https://cdn.jsdelivr.net/npm/chart.xkcd@1/dist/chart.xkcd.min.js"></script>
<script>
    const myChart = new chartXkcd.Line(svg, {...});
</script>
```

**Via npm**

```bash
npm i chart.xkcd
```

```js
import chartXkcd from 'chart.xkcd';
const myChart = new chartXkcd.Line(svg, {...});
```

**Other ways**

React wrapper: [chart.xkcd-react](https://github.com/obiwankenoobi/chart.xkcd-react)
