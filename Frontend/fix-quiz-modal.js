// Ensure quiz mode modal is properly removed
function confirmStartQuiz(quizId, modalId) {
    const mode = document.querySelector('input[name="quizMode"]:checked').value;
    timeLimitMode = mode === 'timed';
    timeLimit = timeLimitMode ? 120 : 0;
    
    // Remove modal more reliably
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
    // Also remove any stray modals
    document.querySelectorAll('[id^="quiz-mode-modal-"]').forEach(m => m.remove());
    
    // Continue with quiz start...
}
