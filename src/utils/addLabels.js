const title = (parent, text, fill) => {
  parent
    .append('text')
    .style('font-size', '20')
    .style('font-weight', 'bold')
    .style('fill', fill)
    .attr('x', '50%')
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .text(text);
};

const xLabel = (parent, text, fill) => {
  parent
    .append('text')
    .style('font-size', 17)
    .style('fill', fill)
    .attr('x', '50%')
    .attr('y', parent.attr('height') - 10)
    .attr('text-anchor', 'middle')
    .text(text);
};

const yLabel = (parent, text, fill) => {
  parent
    .append('text')
    .attr('text-anchor', 'end')
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .style('font-size', 17)
    .style('fill', fill)
    .text(text)
    .attr('y', 6)
    .call((f) => {
      const textLength = f.node().getComputedTextLength();
      f.attr('x', 0 - (parent.attr('height') / 2) + (textLength / 2));
    });
};

export default {
  title, xLabel, yLabel,
};
