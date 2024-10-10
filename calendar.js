// calendar.js

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    // Initialize FullCalendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        dateClick: function(info) {
            alert('Selected date: ' + info.dateStr); // Handle date click
        },
    });

    calendar.render();

    // Call the function to display reservations
    displayReservations();
});

// Function to display reservations
async function displayReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    if (reservations.length === 0) {
        document.getElementById('reservation-container').innerHTML = '<p>No items in your reservation basket.</p>';
        return;
    }

    const container = document.getElementById('reservation-container');
    container.innerHTML = '';

    // Mock data, replace with actual data retrieval
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
