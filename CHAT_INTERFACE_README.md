# Chart.xkcd Chat Interface 📊💬

An interactive chat-based interface for creating beautiful hand-drawn style charts using Chart.xkcd. Create any type of chart through natural conversation!

## 🌟 Features

- **Conversational Interface**: Create charts by chatting with an AI assistant
- **6 Chart Types Supported**:
  - 📈 Line Chart
  - 📊 Bar Chart
  - 📚 Stacked Bar Chart
  - 🥧 Pie/Doughnut Chart
  - 🎯 XY Scatter Chart
  - 🕸️ Radar Chart
- **Example Templates**: Quick-start with pre-built example charts
- **Live Preview**: See your chart update in real-time
- **Modify Charts**: Change titles, toggle legends, and more through conversation
- **Export Options**: Download as SVG or view the JavaScript code
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Quick Start

1. Open `chat-interface.html` in your web browser
2. Start chatting! Try saying:
   - "Create a line chart"
   - "Show me an example"
   - "I want to make a pie chart"

### Using Example Templates

The fastest way to see the interface in action:

1. Type "show me an example" or click the quick action button
2. Select from pre-built examples:
   - **Line Chart**: Weekly sales data
   - **Bar Chart**: Monthly revenue by product
   - **Stacked Bar**: Quarterly sales by region
   - **Pie Chart**: Browser market share
   - **XY Scatter**: Temperature vs sales correlation
   - **Radar Chart**: Player statistics comparison

## 📖 How to Use

### Creating a Custom Chart

The chat assistant will guide you through these steps:

1. **Choose Chart Type**
   ```
   User: "Create a line chart"
   Bot: "Great! Let's create a Line Chart. What title would you like?"
   ```

2. **Set Title**
   ```
   User: "Monthly Sales 2024"
   Bot: "Great! Now, what labels would you like on the X-axis?"
   ```

3. **Define Labels** (for most chart types)
   ```
   User: "Jan, Feb, Mar, Apr, May"
   Bot: "Perfect! You have 5 categories. Let's add a dataset..."
   ```

4. **Add Data**
   ```
   User: "100, 150, 120, 200, 180"
   Bot: "Dataset added! Would you like to add another dataset?"
   ```

5. **Additional Datasets** (optional)
   ```
   User: "yes"
   Bot: "Enter the values for the next dataset..."
   ```

6. **Axis Labels** (optional)
   ```
   User: "X: Month, Y: Revenue ($K)"
   Bot: "Awesome! Your chart is ready!"
   ```

### Modifying Existing Charts

Once a chart is created, you can modify it:

- **Change Title**: "Change the title to Q1 Sales Report"
- **Toggle Legend**: "Show the legend" or "Hide the legend"
- **Start Over**: Click "New Chart" button

## 📊 Chart Type Details

### Line Chart
- **Best for**: Trends over time, comparing multiple series
- **Data format**: Labels + numeric values
- **Example use**: Weekly sales, temperature trends, stock prices

### Bar Chart
- **Best for**: Comparing categories
- **Data format**: Category labels + values
- **Example use**: Monthly revenue, product comparison

### Stacked Bar Chart
- **Best for**: Part-to-whole relationships over categories
- **Data format**: Labels + multiple datasets
- **Example use**: Regional sales breakdown, budget allocation

### Pie/Doughnut Chart
- **Best for**: Showing proportions of a whole
- **Data format**: Labels + values
- **Example use**: Market share, expense breakdown

### XY Scatter Chart
- **Best for**: Correlation between two variables
- **Data format**: X,Y coordinate pairs
- **Example use**: Temperature vs sales, age vs income
- **Input format**: `x1,y1; x2,y2; x3,y3`

### Radar Chart
- **Best for**: Multivariate comparison
- **Data format**: Multiple metrics + values
- **Example use**: Player stats, skill comparison

## 💡 Tips & Tricks

### Quick Commands

- `"show me an example"` - Browse example charts
- `"use sample data"` - Load a demo chart
- `"create a [type] chart"` - Start creating specific chart type
- `"change the title to X"` - Update chart title
- `"show/hide the legend"` - Toggle legend visibility

### Data Input Formats

**Regular data (Line, Bar, Stacked Bar, Pie, Radar)**:
```
30, 70, 200, 80, 100
```

**XY data (Scatter charts)**:
```
10,20; 15,35; 20,50; 25,70
```
Format: `x1,y1; x2,y2; x3,y3`

### Best Practices

1. **Use descriptive titles**: Make your charts self-explanatory
2. **Keep labels short**: Especially for X-axis labels
3. **Limit datasets**: 2-3 datasets work best for readability
4. **Try examples first**: Get familiar with the interface
5. **Use appropriate chart types**: Match the chart to your data story

## 🎨 Customization Options

### Available Options (in code view)

```javascript
{
  title: 'Chart Title',
  xLabel: 'X Axis Label',
  yLabel: 'Y Axis Label',
  data: { /* chart data */ },
  options: {
    // Common options
    showLegend: true,           // Show/hide legend
    legendPosition: 1,          // 1: upLeft, 2: upRight, 3: downLeft, 4: downRight
    yTickCount: 3,              // Number of Y-axis ticks

    // Chart-specific options
    innerRadius: 0.5,           // Pie charts: 0 = pie, 0.5 = doughnut
    showLine: true,             // XY charts: connect points
    dotSize: 1,                 // XY/Radar: dot size multiplier
    showLabels: true,           // Radar: show axis labels
    ticksCount: 3               // Radar: number of radial ticks
  }
}
```

## 🔧 Technical Details

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to load Chart.xkcd from CDN)

### Dependencies

- [Chart.xkcd](https://github.com/timqian/chart.xkcd) v1.1+ (loaded from CDN)

### File Structure

```
chat-interface.html          # Standalone HTML file with embedded CSS and JavaScript
```

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 Use Cases

### Education
- Teaching data visualization concepts
- Creating charts for presentations
- Learning about different chart types

### Business
- Quick data visualization for meetings
- Creating reports and dashboards
- Exploratory data analysis

### Personal Projects
- Blog post illustrations
- Social media graphics
- Personal data tracking

## 📝 Examples

### Example 1: Creating a Sales Trend Chart

```
User: Create a line chart
Bot: Great! Let's create a Line Chart. What title would you like?

User: Monthly Sales Trend
Bot: Great! Now, what labels would you like on the X-axis?

User: Jan, Feb, Mar, Apr, May, Jun
Bot: Perfect! You have 6 categories. Let's add a dataset...

User: 4500, 5200, 4800, 6100, 5900, 6800
Bot: Dataset added! Would you like to add another dataset?

User: no
Bot: Would you like to add axis labels?

User: X: Month, Y: Sales ($)
Bot: Awesome! Your chart is ready!
```

### Example 2: Using a Template

```
User: show me an example
Bot: Great! Here are some example charts you can try:
[Shows buttons for different chart types]

User: [Clicks "Line Chart (Sales)"]
Bot: Loading Line Chart example...
Bot: Example chart loaded! You can now download it, view the code, or modify it...

User: change the title to Q4 Sales Performance
Bot: Title updated to "Q4 Sales Performance"! ✨
```

## 🚧 Limitations

- No data import from files (CSV, JSON)
- No real-time data updates
- No collaborative editing
- Chart customization limited to common options
- No chart animations

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Import data from CSV/JSON files
- [ ] Save charts to local storage
- [ ] More customization options (colors, fonts, styles)
- [ ] Export to PNG/JPG formats
- [ ] Chart templates library
- [ ] Undo/redo functionality
- [ ] Share charts via URL

## 📄 License

This chat interface is part of the Chart.xkcd project. See the main project repository for license information.

## 🙏 Credits

- Built with [Chart.xkcd](https://github.com/timqian/chart.xkcd) by [@timqian](https://github.com/timqian)
- Inspired by xkcd comics by Randall Munroe

## 💬 Feedback & Support

If you encounter any issues or have suggestions:

1. Check the [Chart.xkcd documentation](https://timqian.com/chart.xkcd/)
2. Review this README for common solutions
3. Open an issue on the GitHub repository

---

**Happy charting! 📊✨**
