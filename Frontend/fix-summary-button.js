// Fix for summary button not working
document.addEventListener('DOMContentLoaded', function() {
    // Ensure API is loaded
    if (typeof window.API === 'undefined') {
        console.error('API not loaded');
        return;
    }
    
    // Re-bind summary button click events
    document.querySelectorAll('[onclick*="Summary"]').forEach(btn => {
        btn.onclick = null;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'summary.html';
        });
    });
});
