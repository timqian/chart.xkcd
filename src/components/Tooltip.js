/* eslint-disable no-underscore-dangle */
import config from '../config';

class Tooltip {
  /**
   *
   * @param {String} parent
   * @param {String} title
   * @param {Array} items
   * @param {Object} position
   * @example
   * {
   *    parent: {}, // a d3 selection component
   *    title: 'tooltip title',
   *    items:[{
   *      color: 'red',
   *      text: 'tim: 13'
   *    }],
   *    position: {
   *      type: 'upleft'
   *      x: 100,
   *      y: 230,
   *    }
   * }
   */
  constructor({
    parent, title, items, position, unxkcdify, backgroundColor, strokeColor,
  }) {
    this.title = title;
    this.items = items;
    this.position = position;
    this.filter = !unxkcdify ? 'url(#xkcdify)' : null;
    this.backgroundColor = backgroundColor;
    this.strokeColor = strokeColor;

    this.svg = parent.append('svg')
      .attr('x', this._getUpLeftX())
      .attr('y', this._getUpLeftY())
      .style('visibility', 'hidden');

    this.tipBackground = this.svg.append('rect')
      .style('fill', this.backgroundColor)
      .attr('fill-opacity', 0.9)
      .attr('stroke', strokeColor) // FIXME: find a good way to calculate boder color form this.strokeColor
      .attr('stroke-width', 2)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('filter', this.filter)
      .attr('width', this._getBackgroundWidth())
      .attr('height', this._getBackgroundHeight())
      .attr('x', 5)
      .attr('y', 5);

    this.tipTitle = this.svg.append('text')
      .style('font-size', 15)
      .style('font-weight', 'bold')
      .style('fill', this.strokeColor)
      .attr('x', 15)
      .attr('y', 25)
      .text(title);

    this.tipItems = items.map((item, i) => {
      const g = this._generateTipItem(item, i);
      return g;
    });
  }

  show() {
    this.svg.style('visibility', 'visible');
  }

  hide() {
    this.svg.style('visibility', 'hidden');
  }

  // update tooltip position / content
  update({ title, items, position }) {
    if (title && title !== this.title) {
      this.title = `${title}`;
      this.tipTitle.text(title);
    }

    if (items && JSON.stringify(items) !== JSON.stringify(this.items)) {
      this.items = items;

      this.tipItems.forEach((g) => g.svg.remove());

      this.tipItems = this.items.map((item, i) => {
        const g = this._generateTipItem(item, i);
        return g;
      });

      const maxWidth = Math.max(
        ...this.tipItems.map((item) => item.width),
        this.tipTitle.node().getBBox().width,
      );

      this.tipBackground
        .attr('width', maxWidth + 15)
        .attr('height', this._getBackgroundHeight());
    }

    if (position) {
      this.position = position;
      this.svg.attr('x', this._getUpLeftX());
      this.svg.attr('y', this._getUpLeftY());
    }
  }

  _generateTipItem(item, i) {
    const svg = this.svg.append('svg');

    svg.append('rect')
      .style('fill', item.color)
      .attr('width', 8)
      .attr('height', 8)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('filter', this.filter)
      .attr('x', 15)
      .attr('y', 37 + 20 * i);

    svg.append('text')
      .style('font-size', '15')
      .style('fill', this.strokeColor)
      .attr('x', 15 + 12)
      .attr('y', 37 + 20 * i + 8)
      .text(item.text);

    const bbox = svg.node().getBBox();
    const width = bbox.width + 15;
    const height = bbox.height + 10;
    return {
      svg,
      width,
      height,
    };
  }

  _getBackgroundWidth() {
    const maxItemLength = this.items.reduce(
      (pre, cur) => (pre > cur.text.length ? pre : cur.text.length), 0,
    );
    const maxLength = this.title ? Math.max(maxItemLength, this.title.length) : maxItemLength;

    return maxLength * 7.4 + 25;
  }

  _getBackgroundHeight() {
    const rows = this.items.length + 1;
    return rows * 20 + 10;
  }

  _getUpLeftX() {
    if (this.position.type === config.positionType.upRight
      || this.position.type === config.positionType.downRight) {
      return this.position.x;
    }
    return this.position.x - this._getBackgroundWidth() - 20;
  }

  _getUpLeftY() {
    if (this.position.type === config.positionType.downLeft
      || this.position.type === config.positionType.downRight) {
      return this.position.y;
    }
    return this.position.y - this._getBackgroundHeight() - 20;
  }
}

export default Tooltip;
