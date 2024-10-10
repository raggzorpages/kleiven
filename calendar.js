const calendarDays = document.getElementById('calendar-days');
const monthYearDisplay = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

// Function to render the calendar
const renderCalendar = (bookings = {}) => {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  calendarDays.innerHTML = '';
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  monthYearDisplay.textContent = `${monthName} ${year}`;

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dayNames.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day-name');
    dayElement.textContent = day;
    calendarDays.appendChild(dayElement);
  });

  let adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day-number');
    calendarDays.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day-number');
    dayElement.textContent = day;

    const dateStr = `${year}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    // Loop through bookings and highlight if the date falls within the booking range
    for (let id in bookings) {
      const booking = bookings[id];
      if (dateStr >= booking.dateFrom && dateStr <= booking.dateTo) {
        dayElement.classList.add('booking-highlight');  // Highlight booked dates
      }
    }

    if (day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear()) {
      dayElement.classList.add('current-day');
    }

    calendarDays.appendChild(dayElement);
  }
};

// Add previous and next month functionality
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();  // Call initially to render the calendar
