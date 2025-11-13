# Chart.xkcd AI Chat Interface 🤖📊

An **AI-powered** chat interface for creating beautiful hand-drawn style charts using Chart.xkcd. Simply describe what you want to visualize in natural language, and let AI handle the rest!

## 🌟 Key Features

### ✨ True AI Integration
- **Natural Language Understanding**: Describe your charts conversationally
- **Intelligent Data Parsing**: AI extracts data from messy, unstructured input
- **Smart Chart Type Selection**: AI recommends the best visualization for your data
- **Multi-Provider Support**: Use OpenAI, Anthropic Claude, Google Gemini, or other models via OpenRouter

### 🎯 Capabilities

- **Flexible Data Input**:
  - "Show sales: Mon 100, Tue 150, Wed 120"
  - "Chrome 60%, Firefox 20%, Safari 20%"
  - "Product A $45K, Product B $62K"
  - Any natural format!

- **All Chart Types Supported**:
  - 📈 Line Charts
  - 📊 Bar Charts
  - 📚 Stacked Bar Charts
  - 🥧 Pie/Doughnut Charts
  - 🎯 XY Scatter Charts
  - 🕸️ Radar Charts

- **Conversational Modifications**:
  - "Make the title more descriptive"
  - "Change this to a bar chart instead"
  - "Add a second dataset with [data]"

## 🚀 Getting Started

### Step 1: Get an OpenRouter API Key

1. Visit [openrouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Go to [Keys](https://openrouter.ai/keys) and create an API key
4. **Costs**: Pay-per-use, typically $0.001-0.02 per request depending on model

### Step 2: Open the Interface

1. Open `ai-chat-interface.html` in your web browser
2. Click "Configure API" in the yellow banner
3. Paste your OpenRouter API key
4. Select your preferred model (GPT-4o recommended)
5. Click "Save"

### Step 3: Start Creating!

Just type naturally:
- "Create a line chart showing weekly sales data"
- "Make a pie chart of market share: Chrome 65%, Firefox 15%, Safari 12%, Others 8%"
- "I need a bar chart comparing Q1 revenue across products A, B, and C"

## 💡 Example Prompts

### Simple Data Entry
```
"Show me a line chart: Jan 100, Feb 150, Mar 120, Apr 200"
```

### Complex Requests
```
"Create a stacked bar chart showing quarterly sales by region:
Q1: North 12, South 8, East 15
Q2: North 19, South 12, East 10
Q3: North 15, South 18, East 12"
```

### Percentage Data
```
"Make a doughnut chart of our customer segments:
Enterprise 45%, SMB 30%, Startup 15%, Individual 10%"
```

### Correlation Analysis
```
"I want to see the correlation between temperature and ice cream sales:
65°F → 20 units, 70°F → 35 units, 75°F → 50 units, 80°F → 70 units"
```

### Multivariate Comparison
```
"Create a radar chart comparing two products:
Product A: Quality 8, Price 6, Support 9, Features 7
Product B: Quality 7, Price 8, Support 7, Features 9"
```

## 🎨 Supported Models

Via OpenRouter, you can use:

| Model | Best For | Speed | Cost |
|-------|----------|-------|------|
| **OpenAI GPT-4o** | Best overall quality | Fast | $$ |
| **OpenAI GPT-4o Mini** | Budget-friendly | Very Fast | $ |
| **Claude 3.5 Sonnet** | Complex data parsing | Fast | $$ |
| **Claude 3 Haiku** | Quick tasks | Very Fast | $ |
| **Google Gemini Pro 1.5** | Large context | Fast | $$ |
| **Llama 3.1 70B** | Open source option | Fast | $ |

### Model Recommendations

- **For best results**: OpenAI GPT-4o or Claude 3.5 Sonnet
- **For speed/cost**: GPT-4o Mini or Claude 3 Haiku
- **For experimentation**: Any model works!

## 🔧 How It Works

### Architecture

```
User Input (Natural Language)
    ↓
OpenRouter API → Selected AI Model
    ↓
AI processes request using system prompt
    ↓
AI generates structured JSON chart config
    ↓
Interface parses JSON and renders chart
    ↓
Chart.xkcd creates beautiful hand-drawn chart
```

### System Prompt

The AI is given detailed instructions about:
- All 6 chart types and their data formats
- How to parse various natural language inputs
- Chart.xkcd-specific options and configurations
- JSON output format requirements

### Data Flow

1. **User types message** → Sent to AI with conversation history
2. **AI analyzes** → Determines chart type, extracts data, generates config
3. **AI responds** → Returns JSON + explanation
4. **Interface parses** → Extracts chart configuration
5. **Chart renders** → Using Chart.xkcd library

## 🎯 Advanced Usage

### Multi-Turn Conversations

The AI maintains conversation context, so you can iteratively improve charts:

```
You: "Create a line chart of monthly sales"
AI: [Creates basic chart]

You: "Add a second line for last year's sales"
AI: [Adds comparison line]

You: "Make the title more descriptive"
AI: [Updates title based on data]
```

### Data Format Flexibility

The AI understands many formats:

- **Lists**: "Jan 100, Feb 150, Mar 120"
- **Ranges**: "Sales from 100 to 500 over 5 months"
- **Percentages**: "40%, 30%, 20%, 10%"
- **Currency**: "$45K, $62K, $38K"
- **Units**: "20 units, 35 units, 50 units"
- **Coordinates**: "point at (10, 20), (15, 35), (20, 50)"

### Chart Type Intelligence

The AI automatically suggests appropriate chart types:

- **Trend data** → Line chart
- **Category comparison** → Bar chart
- **Part-to-whole** → Pie chart
- **Correlation** → XY scatter
- **Multi-dimensional** → Radar chart
- **Stacked comparison** → Stacked bar

## 📊 Features & Actions

### During Chat
- 💬 Natural conversation with AI
- 🔄 Iterative chart refinement
- 📝 Automatic data extraction
- 🎨 Smart chart type selection

### After Creation
- 💾 **Download SVG**: Save chart as vector image
- 📝 **View Code**: See the generated Chart.xkcd code
- ✨ **New Chart**: Start fresh conversation
- 🔧 **Modify**: Continue chatting to refine

## 🔒 Privacy & Security

### API Key Storage
- Stored locally in browser `localStorage`
- Never sent to any server except OpenRouter
- Clear storage to remove: `localStorage.clear()`

### Data Privacy
- All chart data processed by selected AI model
- Sent to OpenRouter → Your chosen provider
- Review provider's privacy policy
- No data stored by this interface

### Best Practices
- Use API keys with spending limits
- Don't share sensitive data unless comfortable
- Monitor your OpenRouter usage dashboard
- Rotate API keys periodically

## 💰 Cost Estimates

Typical costs per chart generation (varies by model):

- **GPT-4o Mini**: $0.001 - $0.003 per chart
- **GPT-4o**: $0.01 - $0.03 per chart
- **Claude 3 Haiku**: $0.001 - $0.002 per chart
- **Claude 3.5 Sonnet**: $0.01 - $0.02 per chart

Most users spend **< $1/month** for regular usage.

## 🛠️ Troubleshooting

### "API key not configured"
→ Click "Configure API" and enter your OpenRouter key

### "API request failed"
→ Check your API key is valid and has credits
→ Verify internet connection
→ Check OpenRouter status

### "Couldn't parse into a chart"
→ AI response wasn't valid JSON
→ Try rephrasing your request
→ Switch to a different model

### Chart looks wrong
→ Describe the issue to the AI: "The data looks incorrect"
→ AI will regenerate with corrections

### Slow responses
→ Switch to faster model (GPT-4o Mini, Claude Haiku)
→ Keep requests concise

## 🆚 Comparison: AI vs Rule-Based

| Feature | AI Chat (`ai-chat-interface.html`) | Rule-Based (`chat-interface.html`) |
|---------|-----------------------------------|-----------------------------------|
| **Natural Language** | ✅ Full understanding | ❌ Keywords only |
| **Data Formats** | ✅ Any format | ❌ Specific format required |
| **Intelligence** | ✅ Context-aware | ❌ Scripted responses |
| **Flexibility** | ✅ Handles ambiguity | ❌ Rigid flows |
| **Chart Recommendations** | ✅ AI suggests best type | ❌ User must choose |
| **Conversation Flow** | ✅ Natural dialogue | ❌ Step-by-step forms |
| **Cost** | 💰 API costs (~$0.01/chart) | 🆓 Free |
| **Setup** | 🔑 Requires API key | ✅ Works immediately |
| **Offline** | ❌ Needs internet | ✅ Works offline |

### When to Use Each

**Use AI Chat** (`ai-chat-interface.html`) when:
- You want natural language interaction
- Data is in various formats
- You need intelligent suggestions
- Cost is acceptable (~$1/month)

**Use Rule-Based** (`chat-interface.html`) when:
- No API key/cost concerns
- Data is already structured
- Offline usage needed
- Following guided steps is fine

## 🔮 Future Enhancements

Potential improvements:

- [ ] Image upload for data extraction (OCR)
- [ ] CSV/Excel file upload
- [ ] Voice input support
- [ ] Chart comparison ("compare these two datasets")
- [ ] Export to multiple formats (PNG, PDF)
- [ ] Sharing via URL
- [ ] Chart templates library
- [ ] Multi-chart dashboards
- [ ] Real-time data connections

## 📚 Technical Details

### Dependencies
- **Chart.xkcd**: v1.1+ (via CDN)
- **OpenRouter API**: For AI model access
- Modern browser with localStorage support

### API Integration
- Uses OpenRouter's OpenAI-compatible API
- Supports streaming responses (future)
- Maintains conversation context
- Handles errors gracefully

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📖 Resources

- **OpenRouter**: [openrouter.ai](https://openrouter.ai/)
- **OpenRouter Docs**: [openrouter.ai/docs](https://openrouter.ai/docs)
- **Chart.xkcd**: [timqian.com/chart.xkcd](https://timqian.com/chart.xkcd/)
- **Model Comparison**: [openrouter.ai/models](https://openrouter.ai/models)

## 🤝 Contributing

Ideas for improvement:
1. Better error handling
2. More example prompts
3. Additional AI providers
4. Enhanced chart customization
5. Better mobile experience

## 📄 License

This interface is part of the Chart.xkcd project. See main repository for license information.

## 🙏 Credits

- Built with [Chart.xkcd](https://github.com/timqian/chart.xkcd) by [@timqian](https://github.com/timqian)
- Powered by [OpenRouter](https://openrouter.ai/)
- AI models by OpenAI, Anthropic, Google, Meta, and others

---

**Ready to create charts with AI?** 🚀

Open `ai-chat-interface.html` and start chatting!
