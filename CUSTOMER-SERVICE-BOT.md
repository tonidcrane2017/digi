# AI Customer Service Bot Documentation 💬

## Overview

The AI Customer Service Bot is an intelligent help and support system integrated into the neurodivergent support app. It provides instant assistance with app features, troubleshooting, and frequently asked questions through three main interfaces: Live Chat, FAQ, and Quick Guide.

## Features

### 1. Live Chat 💭

An interactive chatbot that understands natural language questions and provides relevant answers from a comprehensive knowledge base.

**Key Capabilities:**
- Keyword-based pattern matching for intelligent responses
- 20+ predefined FAQ responses covering all app features
- Contextual answers with category tagging
- Support for greetings and thank you responses
- Quick question buttons for common queries
- Real-time chat interface with user and bot message styling

**Example Questions:**
- "How do I change the theme?"
- "Where is my data stored?"
- "Can I use this offline?"
- "How do breathing exercises work?"
- "How do I install this as an app?"

### 2. FAQ Section 📚

A comprehensive, searchable database of frequently asked questions organized by category.

**Categories:**
- **Settings** - Theme, text size, fonts, personalization
- **Privacy** - Data storage, export, tracking, deletion
- **Features** - Breathing, quotes, mood tracker, library, journal, templates
- **Technical** - Offline use, installation, browser support
- **Accessibility** - Screen readers, keyboard navigation, reduced motion
- **Emergency** - Crisis support resources

**Features:**
- 20 detailed FAQ items with comprehensive answers
- Organized by category for easy navigation
- Expandable/collapsible answers
- Search functionality to filter questions
- Clean, accessible interface

### 3. Quick Guide 📖

A step-by-step getting started guide covering essential app features.

**Sections:**
- 🎨 **Customize Your Experience** - Settings and personalization
- 🫁 **Using Breathing Exercises** - How to use breathing tools
- 📊 **Track Your Progress** - Mood logging and journaling
- 🆘 **Emergency Support** - Crisis resources
- 🔒 **Your Privacy** - Data security information
- 📱 **Install as App** - PWA installation instructions

## Technical Implementation

### CustomerServiceBot Class

Located in `neurodivergent-app.js`, the `CustomerServiceBot` class handles all chatbot logic:

```javascript
class CustomerServiceBot {
    constructor() {
        this.faqDatabase = [...]; // 20 FAQ items
        this.quickResponses = {...}; // Greeting, thank you, unclear responses
    }
    
    findAnswer(userMessage) {
        // Keyword matching and scoring algorithm
    }
    
    searchFAQ(searchTerm) {
        // Search through FAQ database
    }
    
    getFAQsByCategory(category) {
        // Filter FAQs by category
    }
}
```

### Key Methods

**`findAnswer(userMessage)`**
- Analyzes user input using keyword matching
- Scores potential matches based on keyword relevance
- Returns best matching answer or unclear response
- Handles greetings and thank you messages

**`searchFAQ(searchTerm)`**
- Searches questions, answers, keywords, and categories
- Returns filtered results matching the search term

**`getFAQsByCategory(category)`**
- Filters FAQ items by specific category
- Supports "all" to return all items

## UI Components

### HTML Structure

```html
<!-- Customer Service Section -->
<section id="customer-service" class="content-section">
    <!-- Tabs -->
    <div class="cs-tabs">
        <button class="cs-tab-btn active" data-tab="chat">Live Chat</button>
        <button class="cs-tab-btn" data-tab="faq">FAQ</button>
        <button class="cs-tab-btn" data-tab="guide">Quick Guide</button>
    </div>
    
    <!-- Live Chat Tab -->
    <div id="cs-chat" class="cs-tab-content active">
        <div class="cs-messages">...</div>
        <div class="cs-quick-questions">...</div>
        <div class="chat-input-container">...</div>
    </div>
    
    <!-- FAQ Tab -->
    <div id="cs-faq" class="cs-tab-content">...</div>
    
    <!-- Quick Guide Tab -->
    <div id="cs-guide" class="cs-tab-content">...</div>
</section>
```

### CSS Styling

Custom styles in `neurodivergent-styles.css`:
- Tab navigation with active states
- Chat bubble styling (user vs bot messages)
- FAQ accordion with smooth transitions
- Quick question button styling
- Responsive design for mobile devices
- Accessibility support (reduced motion, keyboard navigation)

## Usage

### Accessing the Customer Service Bot

1. Click the "Help & Support" button (💬) in the main navigation
2. Choose from three tabs:
   - **Live Chat** - Interactive chatbot
   - **FAQ** - Browse or search questions
   - **Quick Guide** - Getting started guide

### Using Live Chat

1. Click on a quick question button for instant answers, or
2. Type your question in the input field
3. Press Enter or click Send
4. The bot will respond with relevant information

### Using FAQ

1. Browse questions organized by category
2. Click on any question to expand the answer
3. Use the search box to find specific topics
4. Click again to collapse the answer

### Using Quick Guide

1. Scroll through the guide sections
2. Follow step-by-step instructions
3. Reference as needed for app features

## FAQ Database Structure

Each FAQ item contains:

```javascript
{
    id: 1,
    category: 'Settings',
    question: 'How do I change the theme?',
    answer: 'Detailed step-by-step answer...',
    keywords: ['theme', 'color', 'dark mode', 'appearance', 'visual']
}
```

## Customization

### Adding New FAQs

Edit the `faqDatabase` array in `CustomerServiceBot` class:

```javascript
{
    id: 21,
    category: 'YourCategory',
    question: 'Your question here?',
    answer: 'Your detailed answer...',
    keywords: ['keyword1', 'keyword2', 'keyword3']
}
```

### Adding New Categories

Categories are automatically detected from FAQ items. Simply use a new category name in the FAQ object.

### Modifying Quick Responses

Edit the `quickResponses` object:

```javascript
this.quickResponses = {
    greeting: ['Response 1', 'Response 2'],
    thankyou: ['Response 1', 'Response 2'],
    unclear: ['Response 1', 'Response 2']
};
```

## Accessibility Features

- **Keyboard Navigation** - Full keyboard support for all interactions
- **ARIA Labels** - Proper labeling for screen readers
- **High Contrast** - Works with all theme options
- **Reduced Motion** - Respects motion preferences
- **Focus Indicators** - Clear focus states for all interactive elements

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Privacy & Data

- **No External Calls** - All processing happens locally
- **No Tracking** - Zero analytics or data collection
- **No Storage** - Chat history is not saved (by design)
- **Complete Privacy** - Conversations stay in your browser session

## Future Enhancements

Potential improvements:
- [ ] Chat history persistence (optional)
- [ ] More sophisticated NLP (natural language processing)
- [ ] Video tutorials integration
- [ ] Multi-language support
- [ ] Voice input option
- [ ] Chat export functionality
- [ ] More FAQ categories and questions
- [ ] Interactive troubleshooting wizards

## Support

The Customer Service Bot is designed to be self-service, but if you need additional help:
- Review the Quick Guide for comprehensive instructions
- Search the FAQ for specific topics
- Use the Live Chat to ask questions
- Check the main app documentation (README-NEURODIVERGENT.md)

## Credits

Created as part of the "You're OK" neurodivergent support app with a focus on accessibility, privacy, and user-friendliness.

---

**Remember:** The Customer Service Bot is here to help you get the most out of the app. Don't hesitate to ask questions! 💙
