// Inspirational quotes library
const quotes = [
    "You are not alone. Your feelings are valid.",
    "It's okay to take a break when you need it.",
    "Progress, not perfection.",
    "Your mental health is just as important as your physical health.",
    "Small steps are still steps forward.",
    "You are stronger than you think.",
    "It's okay to ask for help.",
    "You deserve compassion, especially from yourself.",
    "Every day is a new opportunity.",
    "Your journey is unique and valid.",
    "Rest is not laziness, it's necessary.",
    "You are worthy of love and care.",
    "Healing is not linear.",
    "Your feelings matter.",
    "You are doing better than you think."
];

// Meditation resources
const meditationResources = [
    { title: "5-Minute Breathing", duration: "5 min", type: "breathing" },
    { title: "Calm Meditation", duration: "10 min", type: "meditation" },
    { title: "Body Scan", duration: "15 min", type: "meditation" },
    { title: "Grounding Exercise", duration: "3 min", type: "grounding" }
];

// Local storage keys
const STORAGE_KEYS = {
    checkIns: 'digi_check_ins',
    streak: 'digi_streak',
    lastCheckIn: 'digi_last_check_in',
    theme: 'digi_theme',
    fontSize: 'digi_font_size'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeSettings();
    updateProgressStats();
    displayRandomQuote();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Emergency button
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    emergencyBtn.addEventListener('click', () => {
        emergencyModal.classList.add('active');
        emergencyModal.setAttribute('aria-hidden', 'false');
    });

    closeModalBtn.addEventListener('click', () => {
        emergencyModal.classList.remove('active');
        emergencyModal.setAttribute('aria-hidden', 'true');
    });

    emergencyModal.addEventListener('click', (e) => {
        if (e.target === emergencyModal) {
            emergencyModal.classList.remove('active');
            emergencyModal.setAttribute('aria-hidden', 'true');
        }
    });

    // New quote button
    document.getElementById('newQuoteBtn').addEventListener('click', displayRandomQuote);

    // Action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            handleAction(action);
        });
    });

    // Theme selector
    document.getElementById('themeSelect').addEventListener('change', (e) => {
        changeTheme(e.target.value);
    });

    // Font size selector
    document.getElementById('fontSizeSelect').addEventListener('change', (e) => {
        changeFontSize(e.target.value);
    });
}

// Display random quote
function displayRandomQuote() {
    const quoteText = document.querySelector('.quote-text');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteText.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = `"${randomQuote}"`;
        quoteText.style.opacity = '1';
    }, 300);
}

// Handle action clicks
function handleAction(action) {
    recordCheckIn();
    
    switch(action) {
        case 'meditation':
            showMeditationOptions();
            break;
        case 'breathing':
            startBreathingExercise();
            break;
        case 'journal':
            openJournal();
            break;
        case 'resources':
            showResources();
            break;
    }
}

// Meditation options
function showMeditationOptions() {
    alert('Meditation feature: Coming soon!\n\nIn the full version, you\'ll have access to:\n- Guided meditations\n- Nature sounds\n- Calming music\n- Progressive muscle relaxation');
}

// Breathing exercise
function startBreathingExercise() {
    alert('Breathing Exercise:\n\n1. Breathe in slowly for 4 seconds\n2. Hold for 4 seconds\n3. Breathe out slowly for 4 seconds\n4. Hold for 4 seconds\n5. Repeat 5 times\n\nYou\'re doing great! 💙');
}

// Journal
function openJournal() {
    const entry = prompt('How are you feeling today? (This is a safe space)');
    if (entry) {
        alert('Thank you for sharing. Your feelings are valid. 💙');
    }
}

// Resources
function showResources() {
    alert('Resources:\n\n🌐 Mental Health Resources:\n- NAMI: nami.org\n- MentalHealth.gov\n- Psychology Today\n\n📱 Apps:\n- Calm\n- Headspace\n- Sanvello\n\n📚 Books & Podcasts:\nComing soon!');
}

// Progress tracking
function recordCheckIn() {
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem(STORAGE_KEYS.lastCheckIn);
    const checkIns = parseInt(localStorage.getItem(STORAGE_KEYS.checkIns) || '0');
    
    if (lastCheckIn !== today) {
        updateStreak(lastCheckIn, today);
        localStorage.setItem(STORAGE_KEYS.checkIns, '1');
        localStorage.setItem(STORAGE_KEYS.lastCheckIn, today);
    } else {
        localStorage.setItem(STORAGE_KEYS.checkIns, (checkIns + 1).toString());
    }
    
    updateProgressStats();
}

function updateStreak(lastCheckIn, today) {
    const currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0');
    
    if (lastCheckIn) {
        const lastDate = new Date(lastCheckIn);
        const todayDate = new Date(today);
        const diffTime = todayDate - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            localStorage.setItem(STORAGE_KEYS.streak, (currentStreak + 1).toString());
        } else if (diffDays > 1) {
            localStorage.setItem(STORAGE_KEYS.streak, '1');
        }
    } else {
        localStorage.setItem(STORAGE_KEYS.streak, '1');
    }
}

function updateProgressStats() {
    const checkIns = localStorage.getItem(STORAGE_KEYS.checkIns) || '0';
    const streak = localStorage.getItem(STORAGE_KEYS.streak) || '0';
    
    document.getElementById('checkInsToday').textContent = checkIns;
    document.getElementById('currentStreak').textContent = streak;
}

// Theme management
function changeTheme(theme) {
    document.body.className = document.body.className.replace(/\s*(light|dark|calm)-theme/g, '');
    
    if (theme !== 'light') {
        document.body.classList.add(`${theme}-theme`);
    }
    
    localStorage.setItem(STORAGE_KEYS.theme, theme);
}

// Font size management
function changeFontSize(size) {
    document.body.className = document.body.className.replace(/\s*font-(small|medium|large)/g, '');
    document.body.classList.add(`font-${size}`);
    localStorage.setItem(STORAGE_KEYS.fontSize, size);
}

// Initialize settings from localStorage
function initializeSettings() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'light';
    const savedFontSize = localStorage.getItem(STORAGE_KEYS.fontSize) || 'medium';
    
    document.getElementById('themeSelect').value = savedTheme;
    document.getElementById('fontSizeSelect').value = savedFontSize;
    
    changeTheme(savedTheme);
    changeFontSize(savedFontSize);
}
