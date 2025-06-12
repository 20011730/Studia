// Enhanced quiz history tracking
const QuizHistory = {
    save: function(quizId, attempt) {
        const history = this.getAll();
        if (!history[quizId]) {
            history[quizId] = [];
        }
        
        attempt.timestamp = new Date().toISOString();
        history[quizId].push(attempt);
        
        localStorage.setItem('quizHistory', JSON.stringify(history));
    },
    
    getAll: function() {
        const saved = localStorage.getItem('quizHistory');
        return saved ? JSON.parse(saved) : {};
    },
    
    getForQuiz: function(quizId) {
        const history = this.getAll();
        return history[quizId] || [];
    },
    
    getBestScore: function(quizId) {
        const attempts = this.getForQuiz(quizId);
        if (attempts.length === 0) return null;
        
        return Math.max(...attempts.map(a => (a.score / a.totalQuestions) * 100));
    },
    
    getLastAttempt: function(quizId) {
        const attempts = this.getForQuiz(quizId);
        return attempts.length > 0 ? attempts[attempts.length - 1] : null;
    }
};

// Display quiz history in UI
function displayQuizHistory(quizId) {
    const attempts = QuizHistory.getForQuiz(quizId);
    if (attempts.length === 0) return '';
    
    const bestScore = QuizHistory.getBestScore(quizId);
    const lastAttempt = QuizHistory.getLastAttempt(quizId);
    
    return `
        <div class="quiz-history">
            <h4><i class="fas fa-history"></i> Previous Attempts</h4>
            <p>Best Score: <strong>${Math.round(bestScore)}%</strong></p>
            <p>Last Attempt: ${new Date(lastAttempt.timestamp).toLocaleDateString()}</p>
            <p>Total Attempts: ${attempts.length}</p>
        </div>
    `;
}
