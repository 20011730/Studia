// Enhanced sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    
    // Set initial state based on screen size
    if (window.innerWidth <= 1280) {
        sidebar.classList.add('inactive');
        document.body.classList.add('sidebar-inactive');
        if (main) main.style.marginLeft = '0';
    } else {
        // Check saved state for larger screens
        const savedState = localStorage.getItem('sidebarState');
        if (savedState === 'closed') {
            sidebar.classList.add('inactive');
            document.body.classList.add('sidebar-inactive');
            if (main) main.style.marginLeft = '0';
        } else {
            sidebar.classList.remove('inactive');
            document.body.classList.remove('sidebar-inactive');
            if (main) main.style.marginLeft = '26em';
        }
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth <= 1280) {
                sidebar.classList.add('inactive');
                document.body.classList.add('sidebar-inactive');
                if (main) main.style.marginLeft = '0';
            } else if (!sidebar.classList.contains('inactive')) {
                document.body.classList.remove('sidebar-inactive');
                if (main) main.style.marginLeft = '26em';
            }
        }, 250);
    });
    
    // Prevent sidebar from closing on internal clicks
    sidebar.addEventListener('click', function(e) {
        if (window.innerWidth <= 1280) {
            e.stopPropagation();
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        const menuToggleBtn = document.querySelector('.menu-toggle-btn');
        if (window.innerWidth <= 1280 && !sidebar.classList.contains('inactive')) {
            if (!sidebar.contains(e.target) && e.target !== menuToggleBtn && !menuToggleBtn.contains(e.target)) {
                sidebar.classList.add('inactive');
                document.body.classList.add('sidebar-inactive');
                if (main) main.style.marginLeft = '0';
                
                // Save state
                localStorage.setItem('sidebarState', 'closed');
                localStorage.setItem('sidebarStateManuallySet', 'true');
            }
        }
    });
});

// Global toggleSidebar function that also saves state
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    
    if (!sidebar) return;
    
    sidebar.classList.toggle('inactive');
    
    if (sidebar.classList.contains('inactive')) {
        document.body.classList.add('sidebar-inactive');
        if (main) main.style.marginLeft = '0';
        
        // Save closed state
        localStorage.setItem('sidebarState', 'closed');
        localStorage.setItem('sidebarStateManuallySet', 'true');
    } else {
        document.body.classList.remove('sidebar-inactive');
        if (main && window.innerWidth > 1280) {
            main.style.marginLeft = '26em';
        }
        
        // Save open state
        localStorage.setItem('sidebarState', 'open');
        localStorage.setItem('sidebarStateManuallySet', 'true');
    }
};
