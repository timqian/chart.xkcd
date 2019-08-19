class Legend {
  static positionType = {
    upLeft: 1,
    upRight: 2,
    downLeft: 3,
    downRight: 4
  }
  /**
   * 
   * @param {String} parent
   * @param {Array} items 
   * @param {Object} position 
   * @example
   * {
   *    parent: {}, // a d3 selection component
   *    items:[{
   *      color: 'red',
   *      text: 'tim'   
   *    }],
   *    position: { 
   *      type: 'upleft',
   *      x: 100,
   *      y: 230,
   *    }
   * }
   */
  constructor({parent, items, position}) {
    this.items = items;
    this.position = position;

    this.svg = parent.append('svg')
      .attr('x', this.#getUpLeftX())
      .attr('y', this.#getUpLeftY())

    this.tipBackground = this.svg.append('rect')
      .style('fill', 'white')
      .attr('fill-opacity', 0.85)
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr("filter", "url(#xkcdify)")
      .attr('width',this.#getBackgroundWidth())
      .attr('height', this.#getBackgroundHeight())
      .attr('x', 5)
      .attr('y', 5)

    this.tipItems = items.map((item, i) => {
      const g = this.svg.append('g');
      g.append('rect')
        .style("fill", item.color)
        .attr("width", 8)
        .attr("height", 8)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr("filter", "url(#xkcdify)")
        .attr('x', 15)
        .attr('y', 17 + 20 * i)

      g.append("text")
        .attr("font-family", 'xkcd')
        .attr("font-size", '15')
        .attr('font-weight', 'lighter')
        .attr('x', 15 + 12)
        .attr('y', 17 + 20 * i + 8)
        .text(item.text)

      return g;
    })

  }

  #getBackgroundWidth() {
    const maxLength = this.items.reduce((pre, cur) => pre > cur.text.length ? pre : cur.text.length, 0);
    return maxLength * 7.5 + 30;
  }

  #getBackgroundHeight() {
    const rows = this.items.length;
    return rows * 20 + 10;
  }

  #getUpLeftX() {
    if(this.position.type === Legend.positionType.upRight || this.position.type === Legend.positionType.downRight) {
      return this.position.x
    }
    return this.position.x - this.#getBackgroundWidth() - 20;
  }

  #getUpLeftY() {
    if(this.position.type === Legend.positionType.downLeft || this.position.type === Legend.positionType.downRight) {
      return this.position.y;
    }
    return this.position.y - this.#getBackgroundHeight() - 20;
  }

}

export default Legend;