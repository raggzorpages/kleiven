// calendar.js

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Initialize FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Specify the initial view of the calendar
        initialView: 'dayGridMonth',
        
        // Add navigation buttons and views to the header toolbar
        headerToolbar: {
            left: 'prev,next today',  // Left side buttons
            center: 'title',          // Center title showing the month and year
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Right side buttons for view selection
        },

        // Make the calendar selectable and editable
        selectable: true,
        editable: true,

        // When a date is clicked, alert the date string
        dateClick: function(info) {
            alert('Selected date: ' + info.dateStr); // Display selected date
        },

        // Optionally, define events (You can fetch these dynamically if needed)
        events: [
            {
                title: 'Sample Event',
                start: new Date(), // Current day event as an example
                description: 'A sample event for the current day.'
            }
        ]
    });

    // Render the calendar on the page
    calendar.render();

    // Call the function to display reservations (if necessary)
    displayReservations();
});

// Function to display reservations (you can replace this with actual functionality)
async function displayReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    if (reservations.length === 0) {
        document.getElementById('reservation-container').innerHTML = '<p>No items in your reservation basket.</p>';
        return;
    }

    const container = document.getElementById('reservation-container');
    container.innerHTML = '';

    // Example data rendering (replace this with actual data fetching if needed)
    reservations.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('nav-card');
        itemDiv.innerHTML = `
            <h3>Reserved Item: ${item}</h3>
            <button onclick="removeFromReservation(${item})">Remove</button>
        `;
        container.appendChild(itemDiv);
    });
}

// Function to remove items from reservation (you can replace this with actual functionality)
function removeFromReservation(item) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations = reservations.filter(reservedItem => reservedItem !== item);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    displayReservations();
}
