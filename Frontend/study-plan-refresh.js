// Enhanced Study Plan refresh after adding schedule
async function addScheduleWithRefresh(scheduleData) {
    try {
        // Show loading
        showNotification('Adding schedule...', 'info');
        
        // Add schedule
        const response = await API.studyPlans.create(scheduleData);
        
        // Success feedback
        showNotification('Schedule added successfully!', 'success');
        
        // Refresh schedules
        await loadSchedules();
        
        // Refresh calendar if exists
        if (window.calendar) {
            calendar.removeAllEvents();
            calendar.addEventSource(getCalendarEvents());
            
            // Navigate to the new event date
            if (response && response.date) {
                calendar.gotoDate(response.date);
            }
        }
        
        // Update class filter
        if (window.updateClassFilter) {
            await updateClassFilter();
        }
        
        return response;
    } catch (error) {
        showNotification('Failed to add schedule: ' + error.message, 'error');
        throw error;
    }
}

// Auto-sync with server every 30 seconds
setInterval(async () => {
    if (document.hidden) return; // Don't sync if tab is not visible
    
    try {
        await loadSchedules();
    } catch (error) {
        console.log('Auto-sync failed:', error);
    }
}, 30000);
