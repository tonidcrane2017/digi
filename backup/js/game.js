// ===========================
// Game State Management
// ===========================
class NeuroQuest {
    constructor() {
        this.score = 0;
        this.currentQuestIndex = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.level = 1;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.usedQuests = new Set();
        this.questsPerSession = 10;
        this.sessionQuests = [];
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadProgress();
    }

    initializeElements() {
        // Screens
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultsScreen = document.getElementById('results-screen');

        // Stats
        this.scoreElement = document.getElementById('score');
        this.questNumberElement = document.getElementById('quest-number');
        this.streakElement = document.getElementById('streak');
        this.levelElement = document.getElementById('level');

        // Quest elements
        this.questCategoryElement = document.getElementById('quest-category');
        this.questDifficultyElement = document.getElementById('quest-difficulty');
        this.questQuestionElement = document.getElementById('quest-question');
        this.optionsContainer = document.getElementById('options-container');

        // Feedback
        this.feedbackElement = document.getElementById('feedback');
        this.feedbackIconElement = document.getElementById('feedback-icon');
        this.feedbackMessageElement = document.getElementById('feedback-message');
        this.feedbackExplanationElement = document.getElementById('feedback-explanation');

        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.skipBtn = document.getElementById('skip-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.viewStatsBtn = document.getElementById('view-stats-btn');

        // Progress
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');

        // Results
        this.finalScoreElement = document.getElementById('final-score');
        this.correctCountElement = document.getElementById('correct-count');
        this.accuracyElement = document.getElementById('accuracy');
        this.bestStreakElement = document.getElementById('best-streak');
        this.performanceMessageElement = document.getElementById('performance-message');
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.skipBtn.addEventListener('click', () => this.skipQuest());
        this.nextBtn.addEventListener('click', () => this.nextQuest());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.viewStatsBtn.addEventListener('click', () => this.showDetailedStats());
    }

    startGame() {
        this.welcomeScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.sessionQuests = this.selectRandomQuests();
        this.currentQuestIndex = 0;
        this.loadQuest();
    }

    selectRandomQuests() {
        const availableQuests = [...allQuests];
        const selected = [];
        
        // Shuffle and select quests
        for (let i = 0; i < Math.min(this.questsPerSession, availableQuests.length); i++) {
            const randomIndex = Math.floor(Math.random() * availableQuests.length);
            selected.push(availableQuests[randomIndex]);
            availableQuests.splice(randomIndex, 1);
        }
        
        return selected;
    }

    loadQuest() {
        if (this.currentQuestIndex >= this.sessionQuests.length) {
            this.showResults();
            return;
        }

        const quest = this.sessionQuests[this.currentQuestIndex];
        this.currentQuest = quest;

        // Update quest info
        this.questCategoryElement.textContent = quest.category;
        this.questDifficultyElement.textContent = quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1);
        this.questDifficultyElement.className = `quest-difficulty ${quest.difficulty}`;
        this.questQuestionElement.textContent = quest.question;

        // Clear previous options and feedback
        this.optionsContainer.innerHTML = '';
        this.feedbackElement.classList.add('hidden');
        this.nextBtn.classList.add('hidden');
        this.skipBtn.classList.remove('hidden');

        // Load quest based on type
        if (quest.type === 'trivia') {
            this.loadTriviaQuest(quest);
        }

        // Update progress
        this.updateProgress();
        this.updateStats();
    }

    loadTriviaQuest(quest) {
        quest.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(optionElement);
        });
    }

    selectOption(selectedIndex) {
        const options = this.optionsContainer.querySelectorAll('.option');
        const isCorrect = selectedIndex === this.currentQuest.correct;

        // Disable all options
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === this.currentQuest.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Update score and stats
        this.totalQuestions++;
        if (isCorrect) {
            this.correctAnswers++;
            this.score += this.currentQuest.points;
            this.streak++;
            if (this.streak > this.bestStreak) {
                this.bestStreak = this.streak;
            }
        } else {
            this.streak = 0;
        }

        // Show feedback
        this.showFeedback(isCorrect);
        
        // Update level
        this.updateLevel();
        
        // Update stats
        this.updateStats();
        
        // Save progress
        this.saveProgress();
    }

    showFeedback(isCorrect) {
        this.feedbackElement.classList.remove('hidden', 'success', 'error');
        this.feedbackElement.classList.add(isCorrect ? 'success' : 'error');

        this.feedbackIconElement.textContent = isCorrect ? '🎉' : '🤔';
        this.feedbackMessageElement.textContent = isCorrect ? 
            'Excellent! Correct answer!' : 
            'Not quite right. Keep learning!';
        this.feedbackExplanationElement.textContent = this.currentQuest.explanation || '';

        this.skipBtn.classList.add('hidden');
        this.nextBtn.classList.remove('hidden');
    }

    skipQuest() {
        this.totalQuestions++;
        this.streak = 0;
        this.nextQuest();
    }

    nextQuest() {
        this.currentQuestIndex++;
        this.loadQuest();
    }

    updateStats() {
        this.scoreElement.textContent = this.score;
        this.questNumberElement.textContent = this.currentQuestIndex + 1;
        this.streakElement.textContent = this.streak;
        this.levelElement.textContent = this.level;
    }

    updateProgress() {
        const progress = ((this.currentQuestIndex + 1) / this.sessionQuests.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `Quest ${this.currentQuestIndex + 1} of ${this.sessionQuests.length}`;
    }

    updateLevel() {
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showLevelUp();
        }
    }

    showLevelUp() {
        // Could add a level-up animation here
        console.log(`Level up! Now at level ${this.level}`);
    }

    showResults() {
        this.gameScreen.classList.add('hidden');
        this.resultsScreen.classList.remove('hidden');

        const accuracy = this.totalQuestions > 0 ? 
            Math.round((this.correctAnswers / this.totalQuestions) * 100) : 0;

        this.finalScoreElement.textContent = this.score;
        this.correctCountElement.textContent = `${this.correctAnswers}/${this.totalQuestions}`;
        this.accuracyElement.textContent = `${accuracy}%`;
        this.bestStreakElement.textContent = this.bestStreak;

        // Performance message
        let message = '';
        if (accuracy >= 90) {
            message = '🌟 Outstanding! You have a brilliant mind for neuroscience!';
        } else if (accuracy >= 75) {
            message = '🎯 Great job! Your knowledge is impressive!';
        } else if (accuracy >= 60) {
            message = '👍 Good effort! Keep learning and improving!';
        } else if (accuracy >= 40) {
            message = '📚 Nice try! Study up and challenge yourself again!';
        } else {
            message = '💪 Keep practicing! Every quest makes you smarter!';
        }
        this.performanceMessageElement.textContent = message;
    }

    showDetailedStats() {
        alert(`Detailed Stats:\n\nTotal Score: ${this.score}\nQuestions Answered: ${this.totalQuestions}\nCorrect Answers: ${this.correctAnswers}\nBest Streak: ${this.bestStreak}\nCurrent Level: ${this.level}`);
    }

    resetGame() {
        this.score = 0;
        this.currentQuestIndex = 0;
        this.streak = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.usedQuests.clear();
        
        this.resultsScreen.classList.add('hidden');
        this.welcomeScreen.classList.remove('hidden');
        
        this.updateStats();
    }

    saveProgress() {
        const progress = {
            score: this.score,
            level: this.level,
            bestStreak: this.bestStreak,
            totalCorrect: this.correctAnswers,
            totalQuestions: this.totalQuestions
        };
        localStorage.setItem('neuroQuestProgress', JSON.stringify(progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('neuroQuestProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            // Only load persistent stats, not session-specific ones
            this.level = progress.level || 1;
            this.bestStreak = progress.bestStreak || 0;
        }
    }
}

// ===========================
// Initialize Game
// ===========================
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new NeuroQuest();
});
