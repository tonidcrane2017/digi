# You're OK - Neurodivergent Support App 💙

A compassionate, accessible web application designed specifically to support neurodivergent individuals with reassurance, coping tools, and mental health resources.

## 🌟 Features

### Core Features

1. **"It's OK" Library** 📚
   - Extensive collection of 50+ reassuring messages
   - Categories: Feelings, Social, Sensory, Productivity, Self-Care, Communication
   - Searchable and filterable
   - Validating affirmations tailored to neurodivergent experiences

2. **Emergency Support** 🆘
   - Always-visible emergency button
   - Crisis hotlines (988, Crisis Text Line)
   - Immediate coping strategies
   - Grounding exercises (5-4-3-2-1)
   - Quick access to calming techniques

3. **Breathing Exercises** 🫁
   - Box Breathing (4-4-4-4)
   - 4-7-8 Breathing
   - Calm Breathing
   - Visual guided breathing with animations
   - Progress tracking

4. **Meditation & Audio** 🧘
   - Guided meditation sessions
   - Body scan exercises
   - Grounding meditations
   - Nature sounds and ambient audio
   - Video resources for mindfulness

5. **Inspirational Quotes** 💭
   - 20+ neurodivergent-affirming quotes
   - Random quote generator
   - Save favorite quotes
   - Share functionality

6. **Printable Templates** 📄
   - Sensory Checklist
   - Coping Strategies Card
   - Daily Routine Planner
   - Emotion Wheel
   - Communication Cards
   - Print or download as PDF/HTML

7. **Progress Tracker** 📊
   - Mood tracking and history
   - Journal entries with timestamps
   - Activity statistics
   - Days using app counter
   - Breathing session tracker

8. **AI Support Assistant** 🤖
   - Empathetic chatbot trained on neurodivergent experiences
   - Context-aware responses
   - Recognizes keywords: overwhelm, sensory issues, social struggles, focus challenges
   - Provides coping strategies and validation
   - Non-judgmental, always available

9. **Customer Service Bot** 💬
   - Intelligent help and support system
   - **Live Chat**: Interactive chatbot for instant answers
   - **FAQ Database**: 20+ searchable frequently asked questions
   - **Quick Guide**: Step-by-step tutorials for app features
   - Categories: Settings, Privacy, Features, Technical, Accessibility, Emergency
   - Keyword-based pattern matching for accurate responses
   - No data storage - complete privacy

### Accessibility & Customization

- **Visual Themes**: Default, Warm, Calm, Purple, Dark Mode, High Contrast
- **Text Size**: Small, Medium, Large, Extra Large
- **Font Options**: Sans-serif, Dyslexic-friendly, Monospace
- **Reduced Motion**: For sensory sensitivities
- **Reduced Emoji**: Cleaner interface option
- **Screen Reader Compatible**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard support

### Privacy & Data

- **100% Local Storage**: All data stored on your device
- **No External Servers**: Complete privacy
- **Export Your Data**: Download all your information
- **Clear Data Option**: Full control over your information
- **No Tracking**: No analytics or cookies

## 📱 Installation

### Web (All Devices)

1. Open `neurodivergent-app.html` in any modern browser
2. The app works immediately - no installation required!

### Mobile Installation (Progressive Web App)

#### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Name it "You're OK" and tap Add
5. App icon appears on your home screen!

#### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. Follow the prompts
5. App appears in your app drawer!

### Desktop Installation

#### Chrome/Edge
1. Open the app in browser
2. Look for the install icon in the address bar (⊕ or computer icon)
3. Click "Install"
4. App opens in its own window!

## 🚀 Usage Guide

### First Time Setup

1. **Explore Settings** (⚙️ icon)
   - Choose your preferred theme
   - Adjust text size for comfort
   - Set your name and pronouns (optional)
   - Configure audio preferences

2. **Try the "It's OK" Library**
   - Browse categories that resonate with you
   - Search for specific reassurances
   - Random affirmation on the home page

3. **Practice Breathing**
   - Start with Box Breathing
   - Use during overwhelming moments
   - Build a daily practice

4. **Chat with AI Helper**
   - Share what you're feeling
   - Ask for coping strategies
   - Get validation and support

5. **Get Help from Customer Service Bot**
   - Click "Help & Support" in navigation
   - Use Live Chat for instant answers
   - Browse FAQ for common questions
   - Check Quick Guide for tutorials

### Daily Use

- **Check In**: Log your mood daily
- **Journal**: Quick entries to track your thoughts
- **Breathe**: Use exercises when stressed
- **Read**: Browse "It's OK" messages for reassurance
- **Track**: Monitor your progress over time

### In Crisis

1. **Hit the Emergency Button** (🆘 top-right)
2. Call or text crisis support:
   - **988** - Suicide & Crisis Lifeline
   - **Text HOME to 741741** - Crisis Text Line
3. Use immediate coping strategies in the modal
4. Access grounding exercises

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic, accessible markup
- **CSS3**: Custom properties, flexbox, grid
- **Vanilla JavaScript**: No frameworks, fast and lightweight
- **Service Worker**: Offline functionality
- **LocalStorage API**: Data persistence
- **Web App Manifest**: PWA capabilities

### File Structure

```
neurodivergent-app.html       - Main HTML file
neurodivergent-styles.css     - All styling and themes
neurodivergent-app.js          - Core functionality
manifest.json                  - PWA configuration
service-worker.js              - Offline support
icon-192.svg                   - App icon (192x192)
icon-512.svg                   - App icon (512x512)
README-NEURODIVERGENT.md       - This file
```

### Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)
- ✅ Works offline after first visit

### Requirements

- Modern web browser
- JavaScript enabled
- ~2MB storage for app data
- No internet required after initial load

## 🎨 Customization

### Adding Your Own Audio Files

Create an `audio/` directory and add MP3 files:
- `5min-calm.mp3`
- `body-scan.mp3`
- `grounding.mp3`
- `nature.mp3`

The app will automatically use them in the Meditation section.

### Adding Video Content

Replace video placeholder links in the HTML with real YouTube/Vimeo embeds or local video files.

### Modifying the "It's OK" Library

Edit the `itsOkLibrary` array in `neurodivergent-app.js` to add your own reassuring messages:

```javascript
{
  category: 'feelings',
  title: "It's OK to...",
  description: "Your supportive message here."
}
```

### Creating New Themes

Add theme definitions in the CSS:

```css
[data-theme="yourtheme"] {
    --primary-color: #YourColor;
    --secondary-color: #YourColor;
    --accent: #YourColor;
}
```

## 🤝 Support & Resources

### Crisis Resources

- **988 Suicide & Crisis Lifeline**: Call or text 988 (US)
- **Crisis Text Line**: Text HOME to 741741 (US)
- **International**: Visit [findahelpline.com](https://findahelpline.com)

### Neurodivergent Communities

- ADHD: [CHADD.org](https://chadd.org)
- Autism: [Autistic Self Advocacy Network](https://autisticadvocacy.org)
- General: r/neurodiversity on Reddit

### Additional Learning

- "Neurodiversity: The Essential Guide" by Steve Silberman
- "Divergent Mind" by Jenara Nerenberg
- "Unmasking Autism" by Devon Price

## 📝 Development Notes

### Future Enhancements

- [ ] Habit tracking with streaks
- [ ] Customizable reminder notifications
- [ ] More AI personality options
- [ ] Community-submitted "It's OK" messages
- [ ] Sync across devices (optional, encrypted)
- [ ] Widget for quick access
- [ ] Voice input option
- [ ] More meditation audio tracks

### Known Limitations

- AI assistant uses pattern matching (not true AI/ML)
- Audio files need to be added manually
- Charts require manual implementation
- No cloud backup (intentional for privacy)

## 🔒 Privacy Policy

**You're OK** is committed to complete privacy:

1. **No Data Collection**: We don't collect any personal data
2. **Local Only**: All information stays on your device
3. **No Tracking**: No analytics, cookies, or tracking scripts
4. **No Accounts**: No login required, no server communication
5. **Your Control**: Export or delete your data anytime

## 📄 License

This project is released under the MIT License. Feel free to use, modify, and distribute as needed.

## ❤️ Acknowledgments

Created with love for the neurodivergent community. You are not broken. You are beautifully different.

**Remember**: It's OK to not be OK. You're doing great just by being here.

---

## 🚨 Quick Start

1. Open `neurodivergent-app.html` in your browser
2. Click Settings (⚙️) to customize
3. Explore the "It's OK" Library
4. Try a breathing exercise
5. Chat with the AI helper when needed
6. Remember: You're OK 💙

---

**Questions? Feedback?** This app is designed to help. If you need immediate support, please call 988 or text HOME to 741741.
