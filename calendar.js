// calendar.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the calendar element from the DOM
    var calendarEl = document.getElementById('calendar');

    // Initialize FullCalendar on the element
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Define the initial view to be a grid month view
        initialView: 'dayGridMonth',

        // Add navigation buttons and multiple view options (month, week, day)
        headerToolbar: {
            left: 'prev,next today',  // Navigation buttons on the left
            center: 'title',          // Display the current month and year
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // View switcher on the right
        },

        // Enable date selection
        selectable: true,

        // Allow the calendar to be editable (for dragging/resizing events)
        editable: true,

        // Define how to handle date click events
        dateClick: function(info) {
            // Alert the clicked date as a simple interaction
            alert('You clicked on date: ' + info.dateStr);
        },

        // Example events to render on the calendar
        events: [
            {
                title: 'Conference Meeting',
                start: '2024-10-15', // Example fixed date
                end: '2024-10-17', // Example event end date
                description: 'A multi-day event to test the calendar rendering.',
                backgroundColor: '#ff5733',  // Event background color
                borderColor: '#ff5733',  // Event border color
            },
            {
                title: 'Sample Event',
                start: new Date(),  // Current day event
                description: 'This is a sample event for today.',
                backgroundColor: '#007bff',  // Custom color for event
                borderColor: '#007bff'  // Custom border color
            }
        ]
    });

    // Logging to help debug if the calendar is initialized and rendered
    console.log('Rendering calendar...');
    calendar.render();
    console.log('Calendar rendered successfully.');
    
    // Call the function to display reservations, if applicable
    displayReservations();
});

// Function to display reservations in a separate section
async function displayReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    if (reservations.length === 0) {
        document.getElementById('reservation-container').innerHTML = '<p>No items in your reservation basket.</p>';
        return;
    }

    const container = document.getElementById('reservation-container');
    container.innerHTML = '';

    // Mockup: replace this with actual data fetching
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

// Function to remove items from reservation
function removeFromReservation(item) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations = reservations.filter(reservedItem => reservedItem !== item);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    displayReservations();
}
// calendar.js (as a module)

export function initCalendar() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: true,
        dateClick: function(info) {
            alert('Selected date: ' + info.dateStr);
        },
        events: [
            {
                title: 'Conference Meeting',
                start: '2024-10-15',
                end: '2024-10-17',
                backgroundColor: '#ff5733',
                borderColor: '#ff5733',
            },
            {
                title: 'Sample Event',
                start: new Date(),
                backgroundColor: '#007bff',
                borderColor: '#007bff'
            }
        ]
    });

    console.log('Rendering calendar...');
    calendar.render();
    console.log('Calendar rendered successfully.');
}
