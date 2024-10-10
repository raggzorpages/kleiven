const calendarDays = document.getElementById('calendar-days');
const monthYearDisplay = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

// Function to render the calendar
const renderCalendar = () => {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  calendarDays.innerHTML = '';
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  monthYearDisplay.textContent = `${monthName} ${year}`;

  // Adjust day names to start with Monday
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dayNames.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day-name');
    dayElement.textContent = day;
    calendarDays.appendChild(dayElement);
  });

  // Calculate the first day of the month, adjusting for Monday start
  let adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust Sunday (0) to be last (6)

  // Fill in the empty spaces before the first day of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day-number');
    calendarDays.appendChild(emptyDay);
  }

  // Create the days in the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day-number');
    dayElement.textContent = day;

    const dateStr = `${year}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    // Highlight the current day
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

renderCalendar(); // Ensure this function is called to display the calendar
