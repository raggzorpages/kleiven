// Import FullCalendar from the CDN
import { Calendar } from 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/index.global.min.js';

// Initialize the calendar
export function initCalendar() {
    var calendarEl = document.getElementById('calendar');

    // Initialize FullCalendar
    var calendar = new Calendar(calendarEl, {
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
}

// Function to display reservations (you can export this if needed)
export function displayReservations() {
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
export function removeFromReservation(item) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations = reservations.filter(reservedItem => reservedItem !== item);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    displayReservations();
}
