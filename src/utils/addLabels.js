const title = (parent, text) => {
  parent
    .append('text')
    .style('font-size', '20')
    .style('font-weight', 'bold')
    .attr('x', '50%')
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .text(text);
};

const xLabel = (parent, text) => {
  parent
    .append('text')
    .style('font-size', 17)
    .attr('x', '50%')
    .attr('y', parent.attr('height') - 10)
    .attr('text-anchor', 'middle')
    .text(text);
};

const yLabel = (parent, text) => {
  parent
    .append('text')
    .attr('text-anchor', 'end')
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .style('font-size', 17)
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
