<<<<<<< HEAD
# Digi - Neurodivergent Mental Health App

**It's okay to not be okay** 💙

Digi is a compassionate mental health web application designed specifically for neurodivergent individuals, providing a safe space for emotional support and wellness resources.

## Features

### 🆘 Emergency Support
- Quick access emergency button for crisis situations
- Direct links to crisis hotlines, text lines, and online chat support
- 24/7 accessible resources

### 💭 Inspirational Quotes
- Wide library of reassuring and validating quotes
- Randomized daily inspiration
- Gentle reminders that your feelings are valid

### 🧘 Wellness Resources
- Meditation guidance
- Breathing exercises
- Journaling prompts
- Mental health resource library

### 📊 Progress Tracking
- Daily check-in counter
- Streak tracking for consistency
- Visual progress statistics

### 🎨 Customization Options
- Multiple themes (Light, Dark, Calm Blue)
- Adjustable font sizes for accessibility
- Personalized user experience

### 📱 Accessibility
- Mobile and web responsive design
- Keyboard navigation support
- Screen reader friendly
- High contrast options

## Getting Started

Simply open `index.html` in your web browser. No installation or build process required!

```bash
# Open the app
open index.html
# or
python -m http.server 8080
```

Then navigate to `http://localhost:8080` in your browser.

## Usage

1. **Emergency Help**: Click the red emergency button for immediate crisis resources
2. **Daily Inspiration**: Refresh quotes anytime for encouragement
3. **Quick Actions**: Choose meditation, breathing, journal, or resources
4. **Track Progress**: See your daily check-ins and streak
5. **Customize**: Adjust theme and font size to your comfort

## Technology Stack

- Pure HTML5, CSS3, and JavaScript
- No external dependencies
- LocalStorage for progress persistence
- Fully client-side application

## Privacy

All data is stored locally in your browser. Nothing is sent to any server. Your privacy and safety are our top priorities.

## Crisis Resources

If you or someone you know is in crisis:
- **988 Suicide & Crisis Lifeline**: Call or text 988
- **Crisis Text Line**: Text HOME to 741741
- **Online Chat**: [988lifeline.org/chat](https://988lifeline.org/chat/)

## License

This project is created with care for the neurodivergent community. Feel free to use, modify, and share.
=======
# 🧠 Neuro Quest Starter Kit

An interactive brain training and neuroscience educational game framework. Test your knowledge, train your brain, and learn about neuroscience through engaging quests and challenges!

## 🌟 Features

- **Interactive Quests**: Multiple types of challenges including trivia, memory games, pattern recognition, and reaction time tests
- **Progressive Difficulty**: Questions and challenges that adapt as you progress
- **Educational Content**: Learn about neuroscience, brain anatomy, and cognitive functions
- **Score Tracking**: Monitor your performance and track your improvement
- **Brain-themed UI**: Beautiful, animated interface inspired by neural networks
- **Extensible Framework**: Easy to add new quests and challenge types

## 🎮 Quest Types

1. **Trivia Quests**: Test your neuroscience knowledge
2. **Memory Challenges**: Remember sequences and patterns
3. **Pattern Recognition**: Identify neural patterns and structures
4. **Reaction Time Tests**: Measure your cognitive speed
5. **Logic Puzzles**: Solve brain-related problems

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Optional: Node.js for local development server

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd digi
```

2. Open the game:
   - **Option 1**: Simply open `index.html` in your web browser
   - **Option 2**: Use a local server:
```bash
npx http-server
```
   Then navigate to `http://localhost:8080`

## 🎯 How to Play

1. Click "Start Quest" to begin
2. Answer questions or complete challenges
3. Earn points for correct answers
4. Track your progress with the score system
5. Unlock new quests as you advance

## 🛠️ Customization

### Adding New Quests

Edit `js/quests.js` to add your own questions and challenges:

```javascript
{
  id: 'your-quest-id',
  type: 'trivia', // or 'memory', 'pattern', 'reaction'
  category: 'Your Category',
  difficulty: 'medium',
  question: 'Your question here?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correct: 0, // index of correct answer
  explanation: 'Educational explanation',
  points: 10
}
```

### Styling

Modify `css/styles.css` to customize colors, animations, and layout.

### Game Logic

Update `js/game.js` to change game mechanics, scoring, or add new features.

## 📁 Project Structure

```
digi/
├── index.html          # Main game interface
├── css/
│   └── styles.css      # Styling and animations
├── js/
│   ├── game.js         # Core game engine
│   └── quests.js       # Quest data and content
├── README.md           # Documentation
└── package.json        # Project metadata
```

## 🧬 Educational Topics Covered

- Brain anatomy and structure
- Neurotransmitters and their functions
- Memory and learning processes
- Cognitive psychology
- Neural pathways and connections
- Brain plasticity
- Neuroscience history and discoveries

## 🎨 Technologies Used

- HTML5
- CSS3 (with animations)
- Vanilla JavaScript (ES6+)
- LocalStorage for progress tracking

## 📈 Future Enhancements

- [ ] Multiplayer mode
- [ ] Leaderboards
- [ ] More quest types
- [ ] Achievement system
- [ ] Sound effects and music
- [ ] Mobile app version
- [ ] Backend integration for global scores

## 🤝 Contributing

Feel free to fork this project and add your own quests, features, or improvements!

1. Fork the repository
2. Create a feature branch
3. Add your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this starter kit for your own projects!

## 🧠 Learn More About Neuroscience

- [Brain Facts](https://www.brainfacts.org/)
- [Neuroscience for Kids](https://faculty.washington.edu/chudler/neurok.html)
- [Khan Academy - Human Biology](https://www.khanacademy.org/science/biology/human-biology)

---

**Have fun exploring the fascinating world of neuroscience! 🧠✨**
>>>>>>> origin/main
