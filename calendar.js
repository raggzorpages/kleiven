// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the calendar element
    var calendarEl = document.getElementById('calendar');
    
    // Initialize the FullCalendar instance
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Full month grid view
        headerToolbar: {
            left: 'prev,next today',  // Navigation buttons
            center: 'title',          // Title of the current month
            right: 'dayGridMonth,timeGridWeek,timeGridDay'  // View options: month, week, day
        },
        selectable: true,  // Allow users to select dates
        selectHelper: true, // Visual aid for selecting dates
        events: [
            // You can add pre-existing events here
            {
                title: 'Reservation 1',
                start: '2024-10-15',
                end: '2024-10-17'
            },
            {
                title: 'Reservation 2',
                start: '2024-10-22'
            }
        ],
        select: function(info) {
            // Action when dates are selected
            alert('Selected dates: ' + info.startStr + ' to ' + info.endStr);
        }
    });

    // Render the calendar
    calendar.render();
});
