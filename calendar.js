// FullCalendar initialization inside DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Check if FullCalendar is properly loaded
    if (typeof FullCalendar === 'undefined') {
        console.error('FullCalendar is not defined. Ensure FullCalendar JS is loaded before this script.');
        return;
    }

    // Initialize FullCalendar on the element
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
            alert('You clicked on date: ' + info.dateStr);
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
});

// Function to display reservations
function displayReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    if (reservations.length === 0) {
        document.getElementById('reservation-container').innerHTML = '<p>No items in your reservation basket.</p>';
        return;
    }

    const container = document.getElementById('reservation-container');
    container.innerHTML = '';

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
