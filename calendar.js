document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Shows a month grid by default
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,  // Users can select dates
        selectHelper: true, // Highlight the selected area
        select: function(info) {
            // Alert with selected date range
            alert('Selected date: ' + info.startStr + ' to ' + info.endStr);
        },
        events: [
            {
                title: 'Existing Reservation',
                start: '2024-10-12',
                end: '2024-10-14'
            },
            {
                title: 'Another Event',
                start: '2024-10-16'
            }
        ]
    });

    calendar.render();
});
