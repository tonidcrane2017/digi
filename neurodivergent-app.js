// ========================================
// Neurodivergent Support App - Main JavaScript
// ========================================

// ========================================
// Data Storage & State Management
// ========================================

class AppState {
    constructor() {
        this.currentSection = 'home';
        this.settings = this.loadSettings();
        this.userData = this.loadUserData();
        this.applySettings();
    }

    loadSettings() {
        const defaults = {
            theme: 'default',
            textSize: 'medium',
            font: 'sans',
            reduceMotion: false,
            reduceEmoji: false,
            volume: 70,
            autoplayAudio: false,
            userName: '',
            userPronouns: ''
        };
        const saved = localStorage.getItem('appSettings');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    }

    saveSettings() {
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
        this.applySettings();
    }

    applySettings() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        document.documentElement.setAttribute('data-text-size', this.settings.textSize);
        document.documentElement.setAttribute('data-font', this.settings.font);
        document.documentElement.setAttribute('data-reduce-motion', this.settings.reduceMotion);
        
        // Apply emoji settings
        if (this.settings.reduceEmoji) {
            document.body.classList.add('reduce-emoji');
        }
    }

    loadUserData() {
        const defaults = {
            firstVisit: new Date().toISOString(),
            journalEntries: [],
            moodHistory: [],
            breathingSessions: 0,
            favoriteQuotes: [],
            preferences: {}
        };
        const saved = localStorage.getItem('userData');
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    }

    saveUserData() {
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    trackMood(mood) {
        this.userData.moodHistory.push({
            mood: mood,
            date: new Date().toISOString()
        });
        this.saveUserData();
        updateProgressStats();
    }

    addJournalEntry(text) {
        this.userData.journalEntries.push({
            text: text,
            date: new Date().toISOString()
        });
        this.saveUserData();
        displayJournalEntries();
        updateProgressStats();
    }

    incrementBreathingSessions() {
        this.userData.breathingSessions++;
        this.saveUserData();
        updateProgressStats();
    }
}

const appState = new AppState();

// ========================================
// "It's OK" Library Data
// ========================================

const itsOkLibrary = [
    // Feelings
    { category: 'feelings', title: "It's OK to feel overwhelmed", description: "Feeling overwhelmed doesn't mean you're failing. It means you're human, and sometimes life is just a lot. Take it one moment at a time." },
    { category: 'feelings', title: "It's OK to not be OK", description: "You don't have to be positive all the time. Your difficult feelings are valid and deserve acknowledgment." },
    { category: 'feelings', title: "It's OK to cry", description: "Tears are a natural and healthy way to process emotions. Let them flow without judgment." },
    { category: 'feelings', title: "It's OK to feel anxious", description: "Anxiety is your brain trying to protect you. It's uncomfortable, but it doesn't define you." },
    { category: 'feelings', title: "It's OK to feel different", description: "Your neurodivergent brain is not broken. It's beautifully unique, and the world needs your perspective." },
    { category: 'feelings', title: "It's OK to be angry", description: "Anger is a valid emotion. What matters is how you process and express it, and that takes time to learn." },
    { category: 'feelings', title: "It's OK to feel nothing sometimes", description: "Emotional numbness can be a coping mechanism. It's temporary, and your feelings will return." },
    
    // Social
    { category: 'social', title: "It's OK to cancel plans", description: "Your energy and wellbeing come first. Real friends will understand when you need to take care of yourself." },
    { category: 'social', title: "It's OK to not want to socialize", description: "Needing alone time doesn't make you antisocial. It makes you someone who knows what you need." },
    { category: 'social', title: "It's OK to struggle with small talk", description: "Deep conversations are more meaningful to you. That's a strength, not a weakness." },
    { category: 'social', title: "It's OK to miss social cues", description: "Neurotypical communication isn't the only valid form. You're learning a second language every day." },
    { category: 'social', title: "It's OK to need time to respond", description: "Processing takes time. There's no shame in saying 'Let me think about that' or texting instead of calling." },
    { category: 'social', title: "It's OK to have few friends", description: "Quality over quantity. Deep connections matter more than a large social circle." },
    { category: 'social', title: "It's OK to leave early", description: "Knowing your limits and honoring them is self-awareness, not rudeness." },
    { category: 'social', title: "It's OK to communicate differently", description: "Whether you prefer texting, writing, or silence - your communication style is valid." },
    
    // Sensory
    { category: 'sensory', title: "It's OK to wear headphones", description: "Protecting yourself from sensory overload is self-care, not avoidance." },
    { category: 'sensory', title: "It's OK to wear the same clothes", description: "Comfort matters more than variety. If it feels right, wear it." },
    { category: 'sensory', title: "It's OK to avoid certain textures", description: "Your sensory preferences are real and valid. You don't need to force yourself to be uncomfortable." },
    { category: 'sensory', title: "It's OK to need darkness or quiet", description: "Sensory needs aren't preferences - they're necessities for your wellbeing." },
    { category: 'sensory', title: "It's OK to stim", description: "Stimming is natural self-regulation. Rock, fidget, move - whatever helps you feel centered." },
    { category: 'sensory', title: "It's OK to eat the same foods", description: "Safe foods are comforting and valid. You don't owe anyone dietary variety." },
    { category: 'sensory', title: "It's OK to need accommodations", description: "Asking for what you need isn't demanding special treatment - it's practicing self-advocacy." },
    
    // Productivity
    { category: 'productivity', title: "It's OK to have unproductive days", description: "Rest is productive. Your worth isn't measured by your output." },
    { category: 'productivity', title: "It's OK to do things differently", description: "If traditional methods don't work for your brain, create your own system." },
    { category: 'productivity', title: "It's OK to hyperfocus", description: "Your ability to deeply engage is a gift. Honor it while also setting gentle boundaries." },
    { category: 'productivity', title: "It's OK to struggle with executive function", description: "Starting tasks is genuinely harder for you. That's neurology, not laziness." },
    { category: 'productivity', title: "It's OK to need more time", description: "Your brain processes differently. Working at your own pace is not falling behind." },
    { category: 'productivity', title: "It's OK to forget things", description: "Memory challenges are real. Use reminders, notes, and systems without shame." },
    { category: 'productivity', title: "It's OK to need breaks", description: "Regular breaks aren't luxuries - they're necessary for sustained focus and wellbeing." },
    { category: 'productivity', title: "It's OK to work in bursts", description: "Not everyone works in steady streams. Burst-rest patterns are equally valid." },
    
    // Self-Care
    { category: 'self-care', title: "It's OK to prioritize yourself", description: "Self-care isn't selfish. You can't pour from an empty cup." },
    { category: 'self-care', title: "It's OK to say no", description: "Boundaries are healthy. 'No' is a complete sentence." },
    { category: 'self-care', title: "It's OK to rest", description: "Rest is not laziness. Your body and mind need time to recharge." },
    { category: 'self-care', title: "It's OK to ask for help", description: "Asking for support is strength, not weakness. We all need help sometimes." },
    { category: 'self-care', title: "It's OK to take medication", description: "Medical support is valid healthcare. There's no shame in using tools that help you thrive." },
    { category: 'self-care', title: "It's OK to go to therapy", description: "Mental health care is healthcare. Seeking support shows wisdom and self-awareness." },
    { category: 'self-care', title: "It's OK to have comfort items", description: "Whatever brings you comfort and security is valuable, regardless of your age." },
    { category: 'self-care', title: "It's OK to establish routines", description: "Routines aren't rigid - they're scaffolding that helps you navigate the world." },
    
    // Communication
    { category: 'communication', title: "It's OK to be direct", description: "Clear, honest communication is refreshing. You don't need to hide behind politeness." },
    { category: 'communication', title: "It's OK to script conversations", description: "Preparing what to say helps you communicate effectively. That's smart, not fake." },
    { category: 'communication', title: "It's OK to not make eye contact", description: "You can listen and engage without looking at someone's eyes." },
    { category: 'communication', title: "It's OK to need things in writing", description: "Written communication can be clearer and less overwhelming. It's a valid preference." },
    { category: 'communication', title: "It's OK to be literal", description: "Your direct interpretation isn't wrong. Ambiguity is the problem, not you." },
    { category: 'communication', title: "It's OK to need clarification", description: "Asking questions shows you care about understanding, not that you're not paying attention." },
    { category: 'communication', title: "It's OK to go non-verbal", description: "Sometimes words don't come. Alternative communication methods are completely valid." },
    
    // General Affirmations
    { category: 'feelings', title: "It's OK to be yourself", description: "Masking is exhausting. The right people will appreciate your authentic self." },
    { category: 'feelings', title: "It's OK to move at your own pace", description: "Life isn't a race. Your timeline is yours alone." },
    { category: 'self-care', title: "It's OK to have bad days", description: "Bad days don't erase your progress. Tomorrow is a new opportunity." },
    { category: 'feelings', title: "It's OK to be a work in progress", description: "You don't need to have everything figured out. Growth is ongoing." },
    { category: 'self-care', title: "It's OK to change your mind", description: "What worked before might not work now. Adapting is wisdom." },
    { category: 'feelings', title: "It's OK to celebrate small wins", description: "Every accomplishment matters. Getting out of bed counts. Eating counts. You're doing great." }
];

// ========================================
// Inspirational Quotes Data
// ========================================

const quotes = [
    { text: "Your neurodivergence is not a flaw in the code. It's a different operating system.", author: "Unknown" },
    { text: "I am not broken. I am beautifully different.", author: "Neurodiversity Affirmation" },
    { text: "Different, not less.", author: "Temple Grandin" },
    { text: "My brain works differently, and that's my superpower.", author: "Unknown" },
    { text: "Neurodiversity is a natural and valuable form of human diversity.", author: "Nick Walker" },
    { text: "I don't need to be fixed. I need to be understood.", author: "Unknown" },
    { text: "Autism is not a processing error. It's a different operating system.", author: "Unknown" },
    { text: "The opposite of depression is not happiness, it's vitality.", author: "Andrew Solomon" },
    { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
    { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
    { text: "Healing is not linear.", author: "Unknown" },
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person. It makes you human.", author: "Lori Deschene" },
    { text: "Sometimes the bravest thing you can do is rest.", author: "Unknown" },
    { text: "Be patient with yourself. Nothing in nature blooms all year.", author: "Unknown" },
    { text: "Your worth is not determined by your productivity.", author: "Unknown" },
    { text: "It's okay to not be okay, as long as you're not giving up.", author: "Unknown" },
    { text: "You are not required to set yourself on fire to keep other people warm.", author: "Unknown" },
    { text: "The only way out is through.", author: "Robert Frost" },
    { text: "You have been assigned this mountain to show others it can be moved.", author: "Mel Robbins" }
];

// ========================================
// AI Assistant - Simple Response System
// ========================================

class SimpleAIAssistant {
    constructor() {
        this.responses = {
            overwhelmed: [
                "I hear you. Feeling overwhelmed is really tough. Let's try to break things down together. Can you tell me what's feeling most overwhelming right now?",
                "It's completely valid to feel overwhelmed. Your feelings matter. Would you like to try a breathing exercise, or would you prefer to talk about what's on your mind?",
                "Overwhelm is your brain's way of saying 'this is a lot.' Let's make it smaller. What's one tiny thing we could focus on right now?"
            ],
            sensory: [
                "Sensory overload is so challenging. First, let's prioritize your comfort. Can you move to a quieter or dimmer space? Even small changes can help.",
                "Your sensory needs are completely valid. Would it help to put on headphones, reduce lighting, or find a quiet corner? What usually helps you feel more comfortable?",
                "Sensory issues are real and exhausting. Remember: it's okay to remove yourself from situations that are too much. What would make you feel safer right now?"
            ],
            social: [
                "Social situations can be draining, especially when you're neurodivergent. It's okay to need breaks or to communicate differently than others expect.",
                "Struggling socially doesn't mean anything is wrong with you. Different communication styles are equally valid. What aspect of social interaction feels hardest right now?",
                "Social energy is finite, and that's okay. You're not obligated to perform or mask. How can I support you with this social challenge?"
            ],
            focus: [
                "Executive dysfunction is real, and it's not laziness. Your brain works differently. Have you tried breaking the task into the smallest possible steps?",
                "Focus challenges are part of neurodivergence. Be gentle with yourself. Would it help to try a different time of day, location, or approach?",
                "Can't focus today? That's your brain, not your character. Sometimes the most productive thing is rest. What do you need right now?"
            ],
            default: [
                "I'm here to listen. Tell me more about what you're experiencing. Remember, all of your feelings are valid.",
                "Thank you for sharing with me. You're not alone in this. What would be most helpful for you right now?",
                "I hear you, and I want you to know that your experiences matter. How can I best support you in this moment?"
            ],
            greeting: [
                "Hello! I'm glad you're here. How are you doing today? Remember, honesty is welcome - good or difficult.",
                "Hi there! It's okay if you're not sure what to say. I'm here whenever you're ready to talk.",
                "Welcome! You're doing great by reaching out. What's on your mind?"
            ],
            affirmation: [
                "You are worthy exactly as you are. Your neurodivergent brain is not a problem to fix.",
                "I see your effort, and it matters. You're doing better than you think.",
                "Your existence has value beyond what you produce or achieve. You matter."
            ],
            coping: [
                "Here are some coping strategies that might help: deep breathing, grounding exercises (5-4-3-2-1), taking a walk, listening to calming music, or talking to someone you trust. What feels most accessible right now?",
                "Coping strategies are personal. Some options: physical movement, creative expression, sensory comfort (weighted blanket, favorite texture), or distraction with a special interest. What usually helps you?",
                "Remember HALT: Are you Hungry, Angry, Lonely, or Tired? Sometimes addressing basic needs first can make everything else more manageable."
            ]
        };

        this.keywords = {
            overwhelmed: ['overwhelm', 'too much', 'cant handle', 'drowning', 'stressed'],
            sensory: ['sensory', 'loud', 'bright', 'texture', 'noise', 'overstimulated'],
            social: ['social', 'people', 'friends', 'conversation', 'party', 'talking'],
            focus: ['focus', 'concentrate', 'distracted', 'executive', 'task', 'work', 'procrastinat'],
            greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
            affirmation: ['worthless', 'failure', 'bad', 'broken', 'wrong with me'],
            coping: ['help me', 'what do i do', 'coping', 'strategy', 'cope']
        };
    }

    getResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for keywords
        for (const [category, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                const responses = this.responses[category];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Default response
        const defaults = this.responses.default;
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    generateSupportiveResponse(context = 'general') {
        // Generate contextual supportive messages
        const supportiveMessages = {
            general: [
                "Remember: you're doing the best you can with the resources you have right now.",
                "Your neurodivergent perspective is valuable. The world needs minds like yours.",
                "Progress isn't linear. Some days are harder than others, and that's okay.",
                "You don't need to earn rest or kindness. You deserve both, always."
            ],
            encouragement: [
                "Every small step counts. You're making progress even when it doesn't feel like it.",
                "You've survived 100% of your difficult days so far. You're stronger than you know.",
                "Being kind to yourself isn't giving up. It's how you build resilience."
            ]
        };

        const messages = supportiveMessages[context] || supportiveMessages.general;
        return messages[Math.floor(Math.random() * messages.length)];
    }
}

const aiAssistant = new SimpleAIAssistant();

// ========================================
// Customer Service Bot - Help & Support System
// ========================================

class CustomerServiceBot {
    constructor() {
        this.faqDatabase = [
            {
                id: 1,
                category: 'Settings',
                question: 'How do I change the theme?',
                answer: 'Click the Settings icon (⚙️) in the top right corner. Under "Visual Settings", select your preferred theme from the dropdown menu. Choose from Default, Warm, Calm, Purple, Dark Mode, or High Contrast. Your choice will be saved automatically.',
                keywords: ['theme', 'color', 'dark mode', 'appearance', 'visual']
            },
            {
                id: 2,
                category: 'Settings',
                question: 'How do I adjust text size?',
                answer: 'Go to Settings (⚙️) → Visual Settings → Text Size. Select from Small, Medium, Large, or Extra Large. The change applies immediately to all text in the app.',
                keywords: ['text size', 'font size', 'larger text', 'bigger', 'readability']
            },
            {
                id: 3,
                category: 'Privacy',
                question: 'Where is my data stored?',
                answer: 'All your data is stored locally on your device using browser LocalStorage. Nothing is sent to external servers. Your data never leaves your device, ensuring complete privacy.',
                keywords: ['data', 'storage', 'privacy', 'local', 'save']
            },
            {
                id: 4,
                category: 'Privacy',
                question: 'How do I export my data?',
                answer: 'Go to Settings → Data & Privacy → Export My Data. This will download a JSON file containing all your journal entries, mood history, and settings. You can save this as a backup.',
                keywords: ['export', 'download', 'backup', 'save data']
            },
            {
                id: 5,
                category: 'Privacy',
                question: 'Is my information tracked or shared?',
                answer: 'No, absolutely not. This app has zero tracking, zero analytics, and zero external connections. All data stays on your device. We respect your privacy completely.',
                keywords: ['tracking', 'analytics', 'privacy', 'shared', 'safe']
            },
            {
                id: 6,
                category: 'Features',
                question: 'How do breathing exercises work?',
                answer: 'Navigate to the Breathe section and choose an exercise: Box Breathing (4-4-4-4), 4-7-8 Breathing, or Calm Breathing. Click Start, and follow the visual circle and text instructions. The circle expands when you inhale and contracts when you exhale.',
                keywords: ['breathing', 'breathe', 'meditation', 'relax', 'calm']
            },
            {
                id: 7,
                category: 'Features',
                question: 'Can I save my favorite quotes?',
                answer: 'Yes! In the Quotes section, after viewing a quote, you\'ll see a "Save Quote" button. Click it to add the quote to your favorites. View saved quotes at the bottom of the Quotes section.',
                keywords: ['quotes', 'save', 'favorite', 'bookmark']
            },
            {
                id: 8,
                category: 'Features',
                question: 'How does the mood tracker work?',
                answer: 'Go to the Progress section. Click on a mood button (Great, Good, Okay, Struggling, Very Difficult) to log how you\'re feeling. Your mood history is saved and can be viewed in the mood chart.',
                keywords: ['mood', 'tracker', 'feelings', 'log', 'progress']
            },
            {
                id: 9,
                category: 'Technical',
                question: 'Can I use this app offline?',
                answer: 'Yes! After your first visit, the app is cached and works completely offline. All features are available without an internet connection.',
                keywords: ['offline', 'internet', 'connection', 'cached']
            },
            {
                id: 10,
                category: 'Technical',
                question: 'How do I install this as an app?',
                answer: 'On iOS: Open in Safari, tap Share, then "Add to Home Screen". On Android: Open in Chrome, tap menu (three dots), select "Add to Home Screen". On Desktop: Look for the install icon in the browser address bar.',
                keywords: ['install', 'pwa', 'mobile app', 'home screen', 'desktop']
            },
            {
                id: 11,
                category: 'Features',
                question: 'What is the "It\'s OK Library"?',
                answer: 'The "It\'s OK Library" is a collection of 50+ reassuring, validating messages specifically for neurodivergent experiences. Browse by category (Feelings, Social, Sensory, etc.) or search for specific reassurance.',
                keywords: ['library', 'ok', 'reassurance', 'validation', 'messages']
            },
            {
                id: 12,
                category: 'Accessibility',
                question: 'What accessibility features are available?',
                answer: 'The app includes: multiple themes (including high contrast), adjustable text sizes, dyslexic-friendly fonts, reduced motion option, reduced emoji option, keyboard navigation, and screen reader support with ARIA labels.',
                keywords: ['accessibility', 'screen reader', 'keyboard', 'a11y', 'dyslexic']
            },
            {
                id: 13,
                category: 'Features',
                question: 'How do I use the journal?',
                answer: 'Go to the Progress section, scroll to "Quick Journal". Type your thoughts in the text area and click "Save Entry". Your entries are timestamped and saved locally. View past entries in the "Recent Entries" section below.',
                keywords: ['journal', 'write', 'diary', 'notes', 'entries']
            },
            {
                id: 14,
                category: 'Emergency',
                question: 'What should I do in a crisis?',
                answer: 'Click the red Emergency Help button (🆘) at the top of the page. You\'ll find crisis hotline numbers: Call/Text 988 (Suicide & Crisis Lifeline) or Text HOME to 741741 (Crisis Text Line). Immediate coping strategies are also available.',
                keywords: ['emergency', 'crisis', 'help', 'suicide', 'hotline']
            },
            {
                id: 15,
                category: 'Settings',
                question: 'Can I reduce motion effects?',
                answer: 'Yes! Go to Settings → Visual Settings → Check "Reduce Motion". This will minimize or disable animations that might be triggering or distracting for sensory sensitivities.',
                keywords: ['motion', 'animation', 'sensory', 'reduce', 'disable']
            },
            {
                id: 16,
                category: 'Features',
                question: 'What are the printable templates?',
                answer: 'In the Templates section, you\'ll find downloadable and printable tools: Sensory Checklist, Coping Strategies Card, Daily Routine Planner, Emotion Wheel, and Communication Cards. Click Download PDF or Print for each.',
                keywords: ['templates', 'print', 'download', 'pdf', 'worksheets']
            },
            {
                id: 17,
                category: 'Technical',
                question: 'What browsers are supported?',
                answer: 'The app works on all modern browsers: Chrome/Edge 90+, Firefox 88+, Safari 14+, and mobile browsers (iOS Safari, Chrome Android). No special plugins or extensions required.',
                keywords: ['browser', 'compatible', 'support', 'chrome', 'firefox', 'safari']
            },
            {
                id: 18,
                category: 'Privacy',
                question: 'How do I delete all my data?',
                answer: 'Go to Settings → Data & Privacy → Clear All Data. This will permanently delete all your journal entries, mood logs, saved quotes, and settings. This action cannot be undone, so export first if you want a backup.',
                keywords: ['delete', 'clear', 'remove', 'erase', 'data']
            },
            {
                id: 19,
                category: 'Features',
                question: 'How does the AI Helper work?',
                answer: 'The AI Helper uses keyword pattern matching to provide supportive responses. It recognizes feelings like overwhelm, sensory issues, social struggles, and focus challenges. Type your concerns and it will offer validation and coping strategies.',
                keywords: ['ai', 'helper', 'chatbot', 'support', 'assistant']
            },
            {
                id: 20,
                category: 'Settings',
                question: 'Can I personalize the app with my name?',
                answer: 'Yes! Go to Settings → Personalization. Enter your name and preferred pronouns. The app will use these in greetings and messages. This is optional and stored only on your device.',
                keywords: ['name', 'personalize', 'pronouns', 'customize']
            }
        ];

        this.quickResponses = {
            greeting: [
                "Hello! I'm your customer service assistant. How can I help you today?",
                "Hi there! What can I help you with?",
                "Welcome to support! Ask me anything about the app."
            ],
            thankyou: [
                "You're welcome! Is there anything else I can help you with?",
                "Happy to help! Feel free to ask if you have more questions.",
                "Glad I could assist! Let me know if you need anything else."
            ],
            unclear: [
                "I'm not sure I understand. Could you rephrase your question? Or try browsing the FAQ section.",
                "I didn't quite get that. Try asking about features, settings, privacy, or troubleshooting.",
                "Hmm, I'm not certain what you're asking. You can also check the Quick Guide tab for help."
            ]
        };
    }

    findAnswer(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for greetings
        if (/^(hi|hello|hey|good morning|good afternoon|greetings)/.test(message)) {
            return this.getRandomResponse(this.quickResponses.greeting);
        }

        // Check for thank you
        if (/thank|thanks|thx/.test(message)) {
            return this.getRandomResponse(this.quickResponses.thankyou);
        }

        // Search FAQ database by keywords
        let bestMatch = null;
        let maxScore = 0;
        const HIGH_CONFIDENCE_THRESHOLD = 10; // Early exit threshold

        for (const faq of this.faqDatabase) {
            let score = 0;
            
            // Check question match (highest priority)
            if (message.includes(faq.question.toLowerCase())) {
                score += 10;
            }

            // Check keyword matches
            for (const keyword of faq.keywords) {
                if (message.includes(keyword.toLowerCase())) {
                    score += 2;
                }
            }

            if (score > maxScore) {
                maxScore = score;
                bestMatch = faq;
                
                // Early termination: if we have a high-confidence match, stop searching
                if (score >= HIGH_CONFIDENCE_THRESHOLD) {
                    break;
                }
            }
        }

        // Return best match if score is high enough
        if (bestMatch && maxScore >= 2) {
            return `**${bestMatch.question}**\n\n${bestMatch.answer}\n\n*Category: ${bestMatch.category}*`;
        }

        // No good match found
        return this.getRandomResponse(this.quickResponses.unclear);
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    searchFAQ(searchTerm) {
        if (!searchTerm) return this.faqDatabase;

        const term = searchTerm.toLowerCase();
        return this.faqDatabase.filter(faq => 
            faq.question.toLowerCase().includes(term) ||
            faq.answer.toLowerCase().includes(term) ||
            faq.keywords.some(k => k.toLowerCase().includes(term)) ||
            faq.category.toLowerCase().includes(term)
        );
    }

    getFAQsByCategory(category) {
        if (!category || category === 'all') return this.faqDatabase;
        return this.faqDatabase.filter(faq => faq.category === category);
    }

    getAllCategories() {
        return [...new Set(this.faqDatabase.map(faq => faq.category))];
    }
}

const customerServiceBot = new CustomerServiceBot();

// ========================================
// Navigation & UI Management
// ========================================

function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = sectionId;
        
        // Initialize section-specific content
        if (sectionId === 'library') {
            displayLibrary();
        } else if (sectionId === 'quotes') {
            displayRandomQuote();
        } else if (sectionId === 'tracker') {
            updateProgressStats();
            displayJournalEntries();
        }
    }
}

// ========================================
// Home Section - Quick Actions
// ========================================

function initializeHomeSection() {
    // Display daily affirmation
    displayDailyAffirmation();
    
    // Quick action buttons
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const action = card.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
    
    // Mood tracking
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.getAttribute('data-mood');
            appState.trackMood(mood);
            showFeedback(`Mood logged: ${mood}. Thank you for checking in with yourself.`);
        });
    });
}

function displayDailyAffirmation() {
    const affirmationEl = document.getElementById('dailyAffirmation');
    const randomItem = itsOkLibrary[Math.floor(Math.random() * itsOkLibrary.length)];
    affirmationEl.textContent = `✨ ${randomItem.title} ✨`;
}

function handleQuickAction(action) {
    switch(action) {
        case 'breathe':
            showSection('breathe');
            document.querySelector('[data-section="breathe"]').click();
            break;
        case 'random-ok':
            displayRandomOk();
            break;
        case 'meditate':
            showSection('meditation');
            document.querySelector('[data-section="meditation"]').click();
            break;
        case 'journal':
            showSection('tracker');
            document.querySelector('[data-section="tracker"]').click();
            document.getElementById('journalInput').focus();
            break;
    }
}

function displayRandomOk() {
    const randomItem = itsOkLibrary[Math.floor(Math.random() * itsOkLibrary.length)];
    const modal = createCustomModal(randomItem.title, randomItem.description);
    document.body.appendChild(modal);
    modal.classList.remove('hidden');
}

function createCustomModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            <h2>${title}</h2>
            <p style="font-size: 1.1rem; line-height: 1.8; margin-top: 1rem;">${content}</p>
        </div>
    `;
    return modal;
}

// ========================================
// "It's OK" Library
// ========================================

function displayLibrary(category = 'all', searchTerm = '') {
    const container = document.getElementById('libraryContent');
    container.innerHTML = '';
    
    let filteredItems = itsOkLibrary;
    
    // Filter by category
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Display items
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'ok-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="ok-category">${item.category}</span>
        `;
        container.appendChild(card);
    });
    
    if (filteredItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No items found. Try a different search or category.</p>';
    }
}

function initializeLibrary() {
    // Category filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayLibrary(category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('librarySearch');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        displayLibrary(activeCategory, searchTerm);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// ========================================
// Breathing Exercises
// ========================================

let breathingInterval = null;

function initializeBreathing() {
    const exerciseCards = document.querySelectorAll('.exercise-card');
    exerciseCards.forEach(card => {
        const startBtn = card.querySelector('.start-btn');
        startBtn.addEventListener('click', () => {
            const exerciseType = card.getAttribute('data-exercise');
            startBreathingExercise(exerciseType);
        });
    });
    
    // Stop button
    const stopBtn = document.querySelector('.breathing-visual .stop-btn');
    if (stopBtn) {
        stopBtn.addEventListener('click', stopBreathingExercise);
    }
}

function startBreathingExercise(type) {
    const visual = document.getElementById('breathingVisual');
    const instruction = visual.querySelector('.breath-instruction');
    visual.classList.remove('hidden');
    
    // Hide exercise selection
    document.querySelector('.breathing-exercises').style.display = 'none';
    
    let steps = [];
    
    switch(type) {
        case 'box':
            steps = [
                { text: 'Breathe In', duration: 4000 },
                { text: 'Hold', duration: 4000 },
                { text: 'Breathe Out', duration: 4000 },
                { text: 'Hold', duration: 4000 }
            ];
            break;
        case '478':
            steps = [
                { text: 'Breathe In', duration: 4000 },
                { text: 'Hold', duration: 7000 },
                { text: 'Breathe Out Slowly', duration: 8000 }
            ];
            break;
        case 'calm':
            steps = [
                { text: 'Breathe In Gently', duration: 5000 },
                { text: 'Breathe Out Slowly', duration: 5000 }
            ];
            break;
    }
    
    let currentStep = 0;
    
    function nextStep() {
        instruction.textContent = steps[currentStep].text;
        currentStep = (currentStep + 1) % steps.length;
    }
    
    nextStep();
    breathingInterval = setInterval(nextStep, steps[currentStep].duration);
    
    appState.incrementBreathingSessions();
}

function stopBreathingExercise() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
    }
    
    document.getElementById('breathingVisual').classList.add('hidden');
    document.querySelector('.breathing-exercises').style.display = 'grid';
}

// ========================================
// Quotes Section
// ========================================

function displayRandomQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAuthor.textContent = `— ${randomQuote.author}`;
}

function initializeQuotes() {
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    newQuoteBtn.addEventListener('click', displayRandomQuote);
    
    // Display saved quotes
    displaySavedQuotes();
}

function displaySavedQuotes() {
    const container = document.getElementById('savedQuotes');
    const saved = appState.userData.favoriteQuotes;
    
    if (saved.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No saved quotes yet. Click the heart on a quote to save it!</p>';
        return;
    }
    
    container.innerHTML = saved.map(quote => `
        <div class="saved-quote">
            <blockquote>"${quote.text}"</blockquote>
            <cite>— ${quote.author}</cite>
        </div>
    `).join('');
}

// ========================================
// Progress Tracker & Journal
// ========================================

function updateProgressStats() {
    // Calculate days using app
    const firstVisit = new Date(appState.userData.firstVisit);
    const today = new Date();
    const daysUsed = Math.floor((today - firstVisit) / (1000 * 60 * 60 * 24)) + 1;
    
    document.getElementById('daysUsed').textContent = daysUsed;
    document.getElementById('breathingSessions').textContent = appState.userData.breathingSessions;
    document.getElementById('journalEntries').textContent = appState.userData.journalEntries.length;
}

function initializeTracker() {
    const saveJournalBtn = document.getElementById('saveJournalBtn');
    saveJournalBtn.addEventListener('click', () => {
        const input = document.getElementById('journalInput');
        const text = input.value.trim();
        
        if (text) {
            appState.addJournalEntry(text);
            input.value = '';
            showFeedback('Journal entry saved! 📝');
        }
    });
}

function displayJournalEntries() {
    const container = document.getElementById('journalList');
    const entries = appState.userData.journalEntries.slice(-5).reverse();
    
    if (entries.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No entries yet. Start journaling above!</p>';
        return;
    }
    
    container.innerHTML = entries.map(entry => {
        const date = new Date(entry.date);
        return `
            <div class="journal-entry">
                <div class="journal-date">${date.toLocaleDateString()} at ${date.toLocaleTimeString()}</div>
                <p>${entry.text}</p>
            </div>
        `;
    }).join('');
}

// ========================================
// AI Assistant Chat
// ========================================

function initializeAIChat() {
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    
    sendBtn.addEventListener('click', () => sendMessage());
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Suggestion buttons
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.textContent;
            sendMessage();
        });
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    // Get AI response
    setTimeout(() => {
        const response = aiAssistant.getResponse(message);
        addMessageToChat(response, 'ai');
    }, 500);
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ========================================
// Customer Service Bot
// ========================================

function initializeCustomerService() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.cs-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchCSTab(tab);
            
            // Update active state
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Chat functionality
    const sendBtn = document.getElementById('sendCsBtn');
    const csInput = document.getElementById('csInput');
    
    if (sendBtn && csInput) {
        sendBtn.addEventListener('click', () => sendCSMessage());
        
        csInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCSMessage();
            }
        });
    }

    // Quick question buttons
    const suggestionBtns = document.querySelectorAll('.cs-suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            csInput.value = btn.textContent;
            sendCSMessage();
        });
    });

    // FAQ search
    const faqSearchBtn = document.getElementById('faqSearchBtn');
    const faqSearch = document.getElementById('faqSearch');
    
    if (faqSearchBtn && faqSearch) {
        faqSearchBtn.addEventListener('click', () => searchFAQs());
        faqSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchFAQs();
            }
        });
    }

    // Initialize FAQ list
    displayFAQList();
}

function switchCSTab(tabName) {
    const tabContents = document.querySelectorAll('.cs-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`cs-${tabName}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

function sendCSMessage() {
    const csInput = document.getElementById('csInput');
    const message = csInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addCSMessageToChat(message, 'user');
    csInput.value = '';
    
    // Get bot response
    setTimeout(() => {
        const response = customerServiceBot.findAnswer(message);
        addCSMessageToChat(response, 'bot');
    }, 500);
}

function addCSMessageToChat(message, sender) {
    const csMessages = document.getElementById('csMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'cs-user-message' : 'cs-bot-message';
    
    const p = document.createElement('p');
    
    if (sender === 'user') {
        // User messages: use textContent for safety
        p.textContent = message;
    } else {
        // Bot messages: convert markdown-style bold to HTML (trusted content only)
        const formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        p.innerHTML = formattedMessage.replace(/\n/g, '<br>');
    }
    
    messageDiv.appendChild(p);
    csMessages.appendChild(messageDiv);
    csMessages.scrollTop = csMessages.scrollHeight;
}

function displayFAQList(faqs = null) {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;
    
    const items = faqs || customerServiceBot.faqDatabase;
    faqList.innerHTML = '';
    
    // Group by category
    const categories = {};
    items.forEach(faq => {
        if (!categories[faq.category]) {
            categories[faq.category] = [];
        }
        categories[faq.category].push(faq);
    });
    
    // Display grouped FAQs
    Object.keys(categories).sort().forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'faq-category';
        categorySection.innerHTML = `<h3>${category}</h3>`;
        
        categories[category].forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <div class="faq-question">
                    <span class="faq-icon">❓</span>
                    <span>${faq.question}</span>
                </div>
                <div class="faq-answer hidden">
                    <p>${faq.answer}</p>
                </div>
            `;
            
            // Toggle answer on click
            const questionEl = faqItem.querySelector('.faq-question');
            questionEl.addEventListener('click', () => {
                const answer = faqItem.querySelector('.faq-answer');
                answer.classList.toggle('hidden');
                faqItem.classList.toggle('active');
            });
            
            categorySection.appendChild(faqItem);
        });
        
        faqList.appendChild(categorySection);
    });
    
    if (items.length === 0) {
        faqList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No FAQs found matching your search.</p>';
    }
}

function searchFAQs() {
    const searchInput = document.getElementById('faqSearch');
    const searchTerm = searchInput.value.trim();
    
    const results = customerServiceBot.searchFAQ(searchTerm);
    displayFAQList(results);
}

// ========================================
// Templates & Printing
// ========================================

function initializeTemplates() {
    const printBtns = document.querySelectorAll('.print-btn');
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    printBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.getAttribute('data-template');
            printTemplate(template);
        });
    });
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.getAttribute('data-template');
            downloadTemplate(template);
        });
    });
}

function printTemplate(templateName) {
    // Create a printable version
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(getTemplateHTML(templateName));
    printWindow.document.close();
    printWindow.print();
}

function downloadTemplate(templateName) {
    // Create a download link
    const content = getTemplateHTML(templateName);
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName}-template.html`;
    a.click();
    URL.revokeObjectURL(url);
}

function getTemplateHTML(templateName) {
    const templates = {
        sensory: `
            <html><head><title>Sensory Checklist</title><style>body{font-family:sans-serif;padding:2rem;} h1{color:#6B7FD7;} .checklist{margin:1rem 0;} .item{margin:0.5rem 0;}</style></head>
            <body>
                <h1>My Sensory Checklist</h1>
                <p>Use this to track what helps and what hinders your sensory comfort.</p>
                <h2>What Helps Me:</h2>
                <div class="checklist">
                    <div class="item">☐ Headphones/Earplugs</div>
                    <div class="item">☐ Dim lighting</div>
                    <div class="item">☐ Soft textures</div>
                    <div class="item">☐ Quiet spaces</div>
                    <div class="item">☐ Favorite scents</div>
                    <div class="item">☐ Weighted blanket</div>
                    <div class="item">☐ Temperature control</div>
                    <div class="item">☐ Other: _________________</div>
                </div>
                <h2>What's Challenging:</h2>
                <div class="checklist">
                    <div class="item">☐ Loud noises</div>
                    <div class="item">☐ Bright lights</div>
                    <div class="item">☐ Certain textures</div>
                    <div class="item">☐ Strong smells</div>
                    <div class="item">☐ Crowded spaces</div>
                    <div class="item">☐ Temperature extremes</div>
                    <div class="item">☐ Other: _________________</div>
                </div>
            </body></html>
        `,
        coping: `
            <html><head><title>Coping Strategies Card</title><style>body{font-family:sans-serif;padding:1rem;border:2px solid #6B7FD7;max-width:500px;} h1{color:#6B7FD7;font-size:1.5rem;} .strategy{margin:0.5rem 0;padding:0.5rem;background:#f5f5f5;}</style></head>
            <body>
                <h1>My Coping Strategies</h1>
                <p><strong>When I'm overwhelmed, I can:</strong></p>
                <div class="strategy">1. Take 5 deep breaths</div>
                <div class="strategy">2. Find a quiet space</div>
                <div class="strategy">3. Use my fidget tool</div>
                <div class="strategy">4. Listen to calming music</div>
                <div class="strategy">5. Call/text a safe person</div>
                <div class="strategy">6. Use grounding (5-4-3-2-1)</div>
                <p><strong>Emergency Contacts:</strong></p>
                <div class="strategy">988 - Crisis Lifeline</div>
                <div class="strategy">Text HOME to 741741</div>
                <div class="strategy">Trusted Person: _________________</div>
            </body></html>
        `,
        routine: `
            <html><head><title>Daily Routine Planner</title><style>body{font-family:sans-serif;padding:2rem;} h1{color:#6B7FD7;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ccc;padding:0.5rem;text-align:left;} th{background:#6B7FD7;color:white;}</style></head>
            <body>
                <h1>My Daily Routine</h1>
                <table>
                    <tr><th>Time</th><th>Activity</th><th>Notes</th></tr>
                    <tr><td>Morning</td><td></td><td></td></tr>
                    <tr><td>Mid-Morning</td><td></td><td></td></tr>
                    <tr><td>Lunch</td><td></td><td></td></tr>
                    <tr><td>Afternoon</td><td></td><td></td></tr>
                    <tr><td>Evening</td><td></td><td></td></tr>
                    <tr><td>Night</td><td></td><td></td></tr>
                </table>
            </body></html>
        `,
        emotions: `
            <html><head><title>Emotion Wheel</title><style>body{font-family:sans-serif;padding:2rem;text-align:center;} h1{color:#6B7FD7;} .emotions{margin:2rem 0;} .emotion-group{margin:1rem;}</style></head>
            <body>
                <h1>Emotion Wheel</h1>
                <p>Use this to identify and name your feelings</p>
                <div class="emotions">
                    <div class="emotion-group"><strong>Happy:</strong> Joyful, Content, Proud, Excited, Peaceful</div>
                    <div class="emotion-group"><strong>Sad:</strong> Disappointed, Lonely, Hurt, Grief, Depressed</div>
                    <div class="emotion-group"><strong>Angry:</strong> Frustrated, Irritated, Furious, Resentful</div>
                    <div class="emotion-group"><strong>Anxious:</strong> Worried, Nervous, Scared, Overwhelmed, Tense</div>
                    <div class="emotion-group"><strong>Confused:</strong> Uncertain, Puzzled, Conflicted, Lost</div>
                    <div class="emotion-group"><strong>Calm:</strong> Relaxed, Centered, Balanced, Serene</div>
                </div>
                <p><strong>Right now I feel:</strong> _________________</p>
            </body></html>
        `,
        communication: `
            <html><head><title>Communication Cards</title><style>body{font-family:sans-serif;padding:1rem;} .card{border:2px solid #6B7FD7;padding:1rem;margin:1rem 0;page-break-after:always;} h2{color:#6B7FD7;text-align:center;}</style></head>
            <body>
                <div class="card"><h2>I need a break</h2><p>I'm feeling overwhelmed and need some quiet time.</p></div>
                <div class="card"><h2>I'm listening</h2><p>I'm paying attention, even if I'm not making eye contact.</p></div>
                <div class="card"><h2>I need help</h2><p>I'm struggling right now and could use support.</p></div>
                <div class="card"><h2>Please be patient</h2><p>I'm processing and need more time to respond.</p></div>
                <div class="card"><h2>I'm non-verbal right now</h2><p>I can hear you but can't speak at the moment.</p></div>
            </body></html>
        `
    };
    
    return templates[templateName] || '<html><body><h1>Template not found</h1></body></html>';
}

// ========================================
// Settings & Modals
// ========================================

function initializeSettings() {
    const settingsBtn = document.getElementById('settingsBtn');
    const modal = document.getElementById('settingsModal');
    const closeBtn = modal.querySelector('.close-btn');
    const saveBtn = document.getElementById('saveSettingsBtn');
    
    settingsBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        loadSettingsToForm();
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    saveBtn.addEventListener('click', () => {
        saveSettingsFromForm();
        modal.classList.add('hidden');
        showFeedback('Settings saved! ✅');
    });
    
    // Export data
    document.getElementById('exportDataBtn').addEventListener('click', exportUserData);
    
    // Clear data
    document.getElementById('clearDataBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
            localStorage.clear();
            location.reload();
        }
    });
    
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeDisplay = document.getElementById('volumeDisplay');
    volumeSlider.addEventListener('input', () => {
        volumeDisplay.textContent = `${volumeSlider.value}%`;
    });
}

function loadSettingsToForm() {
    document.getElementById('themeSelect').value = appState.settings.theme;
    document.getElementById('textSizeSelect').value = appState.settings.textSize;
    document.getElementById('fontSelect').value = appState.settings.font;
    document.getElementById('reduceMotion').checked = appState.settings.reduceMotion;
    document.getElementById('reduceEmoji').checked = appState.settings.reduceEmoji;
    document.getElementById('volumeSlider').value = appState.settings.volume;
    document.getElementById('volumeDisplay').textContent = `${appState.settings.volume}%`;
    document.getElementById('autoplayAudio').checked = appState.settings.autoplayAudio;
    document.getElementById('userName').value = appState.settings.userName;
    document.getElementById('userPronouns').value = appState.settings.userPronouns;
}

function saveSettingsFromForm() {
    appState.settings.theme = document.getElementById('themeSelect').value;
    appState.settings.textSize = document.getElementById('textSizeSelect').value;
    appState.settings.font = document.getElementById('fontSelect').value;
    appState.settings.reduceMotion = document.getElementById('reduceMotion').checked;
    appState.settings.reduceEmoji = document.getElementById('reduceEmoji').checked;
    appState.settings.volume = parseInt(document.getElementById('volumeSlider').value);
    appState.settings.autoplayAudio = document.getElementById('autoplayAudio').checked;
    appState.settings.userName = document.getElementById('userName').value;
    appState.settings.userPronouns = document.getElementById('userPronouns').value;
    
    appState.saveSettings();
}

function exportUserData() {
    const data = {
        settings: appState.settings,
        userData: appState.userData,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neurodivergent-app-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// ========================================
// Emergency Modal
// ========================================

function initializeEmergency() {
    const emergencyBtn = document.getElementById('emergencyBtn');
    const modal = document.getElementById('emergencyModal');
    const closeBtn = modal.querySelector('.close-btn');
    
    emergencyBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Coping strategy buttons
    const copingBtns = modal.querySelectorAll('.coping-btn');
    copingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const strategy = btn.getAttribute('data-coping');
            handleEmergencyCoping(strategy);
        });
    });
}

function handleEmergencyCoping(strategy) {
    const strategies = {
        breathe: () => {
            document.getElementById('emergencyModal').classList.add('hidden');
            showSection('breathe');
            document.querySelector('[data-exercise="box"]').querySelector('.start-btn').click();
        },
        ground: () => {
            showGroundingExercise();
        },
        ice: () => {
            showFeedback('Try holding an ice cube, splashing cold water on your face, or taking a cold shower. Cold sensations can help reset your nervous system.');
        },
        walk: () => {
            showFeedback('Take a short walk, even if just around your room. Movement can help process difficult emotions.');
        },
        music: () => {
            document.getElementById('emergencyModal').classList.add('hidden');
            showSection('meditation');
        },
        contact: () => {
            showFeedback('Reach out to someone you trust. You don\'t have to face this alone.');
        }
    };
    
    if (strategies[strategy]) {
        strategies[strategy]();
    }
}

function showGroundingExercise() {
    const modal = createCustomModal(
        '5-4-3-2-1 Grounding Exercise',
        `
        Take a moment to ground yourself:<br><br>
        <strong>5 things you can SEE</strong><br>
        <strong>4 things you can TOUCH</strong><br>
        <strong>3 things you can HEAR</strong><br>
        <strong>2 things you can SMELL</strong><br>
        <strong>1 thing you can TASTE</strong><br><br>
        Take your time with each one. You're safe.
        `
    );
    document.body.appendChild(modal);
    modal.classList.remove('hidden');
}

// ========================================
// Utility Functions
// ========================================

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeHomeSection();
    initializeLibrary();
    initializeBreathing();
    initializeQuotes();
    initializeTracker();
    initializeAIChat();
    initializeCustomerService();
    initializeTemplates();
    initializeSettings();
    initializeEmergency();
    
    console.log('💙 Neurodivergent Support App Loaded - You\'re doing great!');
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
