import colors from './colors';

export default function addFilter(parent) {
  parent.append('filter')
    .attr('id', 'xkcdify')
    .attr('filterUnits', 'userSpaceOnUse')
    .attr('x', -5)
    .attr('y', -5)
    .attr('width', '100%')
    .attr('height', '100%')
    .call((f) => f.append('feTurbulence')
      .attr('type', 'fractalNoise')
      .attr('baseFrequency', '0.05')
      .attr('result', 'noise'))
    .call((f) => f.append('feDisplacementMap')
      .attr('scale', '5')
      .attr('xChannelSelector', 'R')
      .attr('yChannelSelector', 'G')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'noise'));

  parent.append('filter')
    .attr('id', 'xkcdify-pie')
    .call((f) => f.append('feTurbulence')
      .attr('type', 'fractalNoise')
      .attr('baseFrequency', '0.05')
      .attr('result', 'noise'))
    .call((f) => f.append('feDisplacementMap')
      .attr('scale', '5')
      .attr('xChannelSelector', 'R')
      .attr('yChannelSelector', 'G')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'noise'));

  parent.append('pattern')
    .attr('id', 'hatch00')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 10)
    .attr('height', 10)
    .call((f) => f.append('path')
      .attr('d', 'M3,0 l7,7 l0,-2 l-5,-5 l-2,0 M0,7 l3,3 l2,0 l-5,-5 l0,2')
      .attr('fill', colors[0][1])
      .attr('stroke', 'none'));
}
