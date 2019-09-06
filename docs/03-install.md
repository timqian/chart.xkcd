---
title: Installation
---

You can install chart.xkcd via script tag in HTML or via npm

## Via Script Tag

```js
<script src="https://cdn.jsdelivr.net/npm/chart.xkcd@1.1.2/dist/chart.xkcd.min.js" integrity="sha256-NkH6G4XRcQ5Bsfs7O6yh9mw1SJLEOJWCtWqko6VjF34=" crossorigin="anonymous"></script>
<script>
    const myChart = new chartXkcd.Line(svg, {...});
</script>
```

## Via npm

**Install**

```bash
npm i chart.xkcd
```

**Usage**

```js
import chartXkcd from 'chart.xkcd';
const myChart = new chartXkcd.Line(svg, {...});
```

**Other ways**

- React wrapper: [chart.xkcd-react](https://github.com/obiwankenoobi/chart.xkcd-react) <br/>
- Vue wrapper:
    - [chart.xkcd-vue](https://github.com/shiyiya/chart.xkcd-vue)
    - [chart.xkcd-vue-wrapper](https://github.com/wistcc/chart.xkcd-vue-wrapper)
