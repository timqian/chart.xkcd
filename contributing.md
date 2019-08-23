> drafting

# Contributing

Before contributing to chart.xkcd you'll need a few things:

- install npm

## Setup

```bash
# install dependencies
npm i
```

```bash
# start examples (example/npm)
npm start
```

Then you can open `localhost:1234` to see the examples, and you can start to edit the code. Thanks to [parcel](), the website will be auto updated when you make changes.

## Layout

- [docs](./docs): Documentation used to generate timqian.com/chart.xkcd
- [examples](./example): Examples showing how to use chart.xkcd. The npm example is also used for developing and debug features for now.
- [src](./src): where the meat locates

## Releases

Notes for myself:

- before building chart.xkcd, shut down parcel server
- `npm run release`(TODO)